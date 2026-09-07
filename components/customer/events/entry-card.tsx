"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Trophy } from "lucide-react";
import type { EventEntry, Retailer } from "@/types";
import { api, ApiError } from "@/lib/api/client";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function EntryCard({ entry, retailer, eventSlug }: { entry: EventEntry; retailer?: Retailer; eventSlug: string }) {
  const [votes, setVotes] = useState(entry.votes);
  const [voted, setVoted] = useState(false);
  const [voting, setVoting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const castVote = async () => {
    setVoting(true);
    try {
      await api.post(`/events/entries/${entry.id}/vote`);
      setVoted(true);
      setVotes((v) => v + 1);
      toast({ title: "Vote cast!", description: `You voted for "${entry.title}"`, variant: "success" });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        toast({ title: "Please sign in to vote", variant: "error" });
        router.push(`/login?from=/events/${eventSlug}`);
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

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-cream-300 bg-white">
      <Link href={`/events/${eventSlug}/entries/${entry.id}`} className="relative block aspect-[4/5] w-full overflow-hidden bg-cream-100">
        <Image src={entry.imageUrl} alt={entry.title} fill sizes="25vw" className="object-cover" />
        {entry.rank && entry.rank <= 3 && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-sm bg-gold-400 px-2 py-1 text-[11px] font-bold uppercase text-primary-600">
            <Trophy className="size-3" /> #{entry.rank}
          </span>
        )}
      </Link>
      <div className="flex flex-col gap-2 p-4">
        <Link href={`/events/${eventSlug}/entries/${entry.id}`} className="font-display text-lg text-ink-900 hover:text-primary-600">
          {entry.title}
        </Link>
        {retailer && <p className="text-[13px] text-ink-700">By {retailer.name}</p>}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-primary-600">{votes.toLocaleString("en-IN")} votes</span>
          <button
            type="button"
            disabled={voted || voting}
            onClick={castVote}
            className={cn(
              "flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-semibold uppercase",
              voted ? "bg-cream-200 text-ink-500" : "bg-primary-600 text-white hover:bg-primary-700",
            )}
          >
            <Heart className={cn("size-3", voted && "fill-current")} /> {voted ? "Voted" : voting ? "…" : "Vote"}
          </button>
        </div>
      </div>
    </div>
  );
}
