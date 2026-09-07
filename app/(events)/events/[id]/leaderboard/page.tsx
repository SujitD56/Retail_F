import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Trophy } from "lucide-react";
import { EventHero } from "@/components/customer/events/event-hero";
import { getEventBySlug, getEventEntries, entryRetailer } from "@/lib/data/events";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Leaderboard" };

export default async function EventLeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventBySlug(id);
  if (!event) notFound();

  const entries = await getEventEntries(event.id);
  const withRetailer = await Promise.all(entries.map(async (e) => ({ entry: e, retailer: await entryRetailer(e) })));

  return (
    <div>
      <EventHero eyebrow="Live Standings" title="Leaderboard" description={`Real-time rankings for ${event.title}. Vote for your favorite entries below.`} imageUrl={event.bannerUrl} height="h-[420px]" />

      <section className="px-16 py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {withRetailer.map(({ entry, retailer }, i) => (
            <Link
              key={entry.id}
              href={`/events/${event.slug}/entries/${entry.id}`}
              className={cn(
                "flex items-center gap-5 rounded-lg border bg-white p-4",
                i < 3 ? "border-gold-400" : "border-cream-300",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold",
                  i === 0 ? "bg-gold-400 text-primary-600" : i < 3 ? "bg-primary-50 text-primary-600" : "bg-cream-200 text-ink-700",
                )}
              >
                {i < 3 ? <Trophy className="size-4" /> : i + 1}
              </span>
              <div className="relative size-14 shrink-0 overflow-hidden rounded-md">
                <Image src={entry.imageUrl} alt={entry.title} fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg text-ink-900">{entry.title}</p>
                <p className="text-[13px] text-ink-700">By {retailer?.name}</p>
              </div>
              <span className="shrink-0 text-right font-semibold text-primary-600">{entry.votes.toLocaleString("en-IN")} votes</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
