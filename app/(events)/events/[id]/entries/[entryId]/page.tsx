"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Heart, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { api, ApiError } from "@/lib/api/client";
import { useToast } from "@/components/ui/toast";
import { formatDate, cn } from "@/lib/utils";
import type { EventEntry, MarketplaceEvent, Product, Retailer } from "@/types";

export default function EntryDetailPage() {
  const params = useParams<{ id: string; entryId: string }>();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState<EventEntry | null>(null);
  const [event, setEvent] = useState<MarketplaceEvent | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [retailer, setRetailer] = useState<Retailer | null>(null);
  const [voted, setVoted] = useState(false);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ entry: e, hasVoted }, { event: ev }] = await Promise.all([
          api.get<{ entry: EventEntry; hasVoted: boolean }>(`/events/entries/${params.entryId}`),
          api.get<{ event: MarketplaceEvent }>(`/events/slug/${params.id}`),
        ]);
        if (cancelled) return;
        setEntry(e);
        setEvent(ev);
        setVoted(hasVoted);

        const [{ product: p }, { retailer: r }] = await Promise.all([
          api.get<{ product: Product }>(`/products/${e.productId}`),
          api.get<{ retailer: Retailer }>(`/retailers/${e.retailerId}`),
        ]);
        if (cancelled) return;
        setProduct(p);
        setRetailer(r);
      } catch {
        if (!cancelled) setEntry(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.id, params.entryId]);

  const handleVote = async () => {
    if (!entry) return;
    setVoting(true);
    try {
      await api.post(`/events/entries/${entry.id}/vote`);
      setVoted(true);
      setEntry({ ...entry, votes: entry.votes + 1 });
      toast({ title: "Vote cast!", description: `You voted for "${entry.title}"`, variant: "success" });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        toast({ title: "Please sign in to vote", variant: "error" });
        router.push(`/login?from=/events/${params.id}/entries/${params.entryId}`);
      } else if (err instanceof ApiError && err.status === 409) {
        setVoted(true);
        toast({ title: "You've already voted for this entry" });
      } else {
        toast({ title: "Couldn't cast your vote — try again", variant: "error" });
      }
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8 px-16 py-10">
        <Skeleton className="h-6 w-64" />
        <div className="flex gap-12">
          <Skeleton className="aspect-[4/5] w-full max-w-[560px]" />
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!entry || !event) {
    return (
      <div className="px-16 py-20">
        <EmptyState
          icon={Trophy}
          title="Entry not found"
          description="This challenge entry doesn't exist or may have been removed."
          actionLabel="Back to Events"
          actionHref="/events"
          className="mx-auto max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="px-16 py-10">
      <Breadcrumbs
        items={[
          { label: "Events", href: "/events" },
          { label: event.title, href: `/events/${event.slug}` },
          { label: "Leaderboard", href: `/events/${event.slug}/leaderboard` },
          { label: entry.title },
        ]}
      />

      <div className="mt-8 flex flex-col gap-12 lg:flex-row">
        <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden rounded-lg lg:max-w-[560px]">
          <Image src={entry.imageUrl} alt={entry.title} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          {entry.rank && entry.rank <= 3 && (
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-sm bg-gold-400 px-3 py-1.5 text-sm font-bold uppercase text-primary-600">
              <Trophy className="size-4" /> Rank #{entry.rank}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-400">{event.title}</p>
            <h1 className="mt-2 font-display text-4xl text-primary-600">{entry.title}</h1>
            <p className="mt-2 text-sm text-ink-700">Submitted {formatDate(entry.submittedAt)}</p>
          </div>

          {retailer && (
            <Link href={`/retailers/${retailer.slug}`} className="flex items-center gap-4 rounded-lg border border-cream-300 bg-white p-5">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                <Image src={retailer.logoUrl} alt={retailer.name} fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <p className="font-display text-lg text-ink-900">{retailer.name}</p>
                <p className="text-[13px] text-ink-500">{retailer.location}</p>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-4 rounded-lg border border-cream-300 bg-cream-100 p-6">
            <div className="flex-1">
              <p className="text-sm text-ink-700">Community Votes</p>
              <p className="font-display text-3xl text-primary-600">{entry.votes.toLocaleString("en-IN")}</p>
            </div>
            <Button
              size="lg"
              disabled={voted || voting}
              onClick={handleVote}
              className={cn(voted && "bg-cream-300 text-ink-500 hover:bg-cream-300")}
            >
              <Heart className={cn("size-4", voted && "fill-current")} /> {voted ? "Voted" : voting ? "Casting…" : "Cast Your Vote"}
            </Button>
          </div>

          {product && (
            <Button asChild variant="outline" size="lg" className="w-fit">
              <Link href={`/product/${product.slug}`}>Shop This Look →</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
