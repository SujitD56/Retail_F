import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Store, Trophy, Users } from "lucide-react";
import { EventHero } from "@/components/customer/events/event-hero";
import { EntryCard } from "@/components/customer/events/entry-card";
import { Button } from "@/components/ui/button";
import { getEventBySlug, getEventEntries, entryRetailer } from "@/lib/data/events";
import { formatDate } from "@/lib/utils";

// No generateStaticParams — events/entries change constantly (new
// submissions, live vote counts, admin moderation), so this renders
// per-request rather than freezing content at build time.

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventBySlug(id);
  return event ? { title: event.title, description: event.description } : {};
}

const STATS = (event: NonNullable<Awaited<ReturnType<typeof getEventBySlug>>>) => [
  { icon: Store, label: "Participating Retailers", value: event.participatingRetailers },
  { icon: Users, label: "Total Entries", value: event.totalEntries },
  { icon: Trophy, label: "Prize Pool", value: event.prizePool },
  { icon: CalendarDays, label: "Closes", value: formatDate(event.endsAt) },
];

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventBySlug(id);
  if (!event) notFound();

  const entries = await getEventEntries(event.id);
  const entriesWithRetailer = await Promise.all(entries.slice(0, 8).map(async (e) => ({ entry: e, retailer: (await entryRetailer(e)) ?? undefined })));

  return (
    <div>
      <EventHero eyebrow={event.status === "live" ? "Live Now" : event.status} title={event.title} description={event.tagline} imageUrl={event.bannerUrl} />

      <section className="grid grid-cols-2 gap-6 border-b border-cream-300 bg-white px-16 py-10 sm:grid-cols-4">
        {STATS(event).map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon className="size-5 text-primary-600" />
            <p className="font-display text-2xl text-ink-900">{value}</p>
            <p className="text-xs text-ink-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="px-16 py-16">
        <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-ink-700">{event.description}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href={`/events/${event.slug}/leaderboard`}>View Leaderboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/events/${event.slug}/shop`}>Shop the Event</Link>
          </Button>
        </div>
      </section>

      <section className="bg-white px-16 py-16">
        <h2 className="mb-8 font-display text-3xl text-primary-600">Featured Entries</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {entriesWithRetailer.map(({ entry, retailer }) => (
            <EntryCard key={entry.id} entry={entry} retailer={retailer} eventSlug={event.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
