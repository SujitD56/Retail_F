import type { Metadata } from "next";
import Link from "next/link";
import { Award, Camera, ThumbsUp, Trophy } from "lucide-react";
import { EventHero } from "@/components/customer/events/event-hero";
import { EntryCard } from "@/components/customer/events/entry-card";
import { Button } from "@/components/ui/button";
import { getEventEntries, getEvents, entryRetailer } from "@/lib/data/events";

export const metadata: Metadata = { title: "Events" };

const STEPS = [
  { icon: Camera, title: "Submit Your Look", description: "Retailers style and submit their finest Ilkal handloom creations to the challenge." },
  { icon: ThumbsUp, title: "Get Community Votes", description: "Customers browse every entry and cast votes for their favorite drapes." },
  { icon: Trophy, title: "Climb the Leaderboard", description: "Top entries rise in real time as votes roll in throughout the challenge." },
  { icon: Award, title: "Win & Get Featured", description: "Winners earn a spot in the Hall of Fame and featured placement storewide." },
];

export default async function EventsLandingPage() {
  const events = await getEvents();
  const flagship = events[0]!;
  const entries = (await getEventEntries(flagship.id)).slice(0, 4);
  const entriesWithRetailer = await Promise.all(entries.map(async (e) => ({ entry: e, retailer: (await entryRetailer(e)) ?? undefined })));

  return (
    <div>
      <EventHero eyebrow="Live Now" title="Where Ilkal Fashion Comes Alive" imageUrl={flagship.bannerUrl} description={flagship.description} height="h-[520px]">
        <div className="flex gap-4 pt-2">
          <Button asChild size="lg">
            <Link href={`/events/${flagship.slug}/leaderboard`}>Explore Live Events</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>
      </EventHero>

      <section id="how-it-works" className="px-16 py-20">
        <h2 className="mb-12 text-center font-display text-4xl text-primary-600">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="flex flex-col gap-3 rounded-lg border border-cream-300 bg-white p-6">
              <span className="flex size-10 items-center justify-center rounded-pill bg-primary-50 text-primary-600">
                <Icon className="size-5" />
              </span>
              <p className="text-xs font-semibold text-gold-400">STEP {i + 1}</p>
              <p className="font-display text-lg text-ink-900">{title}</p>
              <p className="text-sm leading-relaxed text-ink-700">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-16 py-20">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-4xl text-primary-600">{flagship.title}</h2>
          <Link href={`/events/${flagship.slug}/leaderboard`} className="text-sm font-semibold text-primary-600">
            View Full Leaderboard →
          </Link>
        </div>
        <p className="mb-10 max-w-2xl text-base text-ink-700">
          {flagship.participatingRetailers} retailers · {flagship.totalEntries} entries · Prize pool {flagship.prizePool}
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {entriesWithRetailer.map(({ entry, retailer }) => (
            <EntryCard key={entry.id} entry={entry} retailer={retailer} eventSlug={flagship.slug} />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-16 py-20 text-center">
        <Trophy className="size-10 text-gold-400" />
        <h2 className="font-display text-3xl text-primary-600">Celebrate Past Champions</h2>
        <p className="max-w-xl text-base text-ink-700">Revisit the winning weaves from previous years&apos; challenges in our Hall of Fame.</p>
        <Button asChild variant="outline">
          <Link href="/events/hall-of-fame">Visit Hall of Fame</Link>
        </Button>
      </section>
    </div>
  );
}
