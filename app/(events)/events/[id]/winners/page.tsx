import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Trophy } from "lucide-react";
import { EventHero } from "@/components/customer/events/event-hero";
import { Badge } from "@/components/ui/badge";
import { getEventBySlug, getEventEntries, entryRetailer } from "@/lib/data/events";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Winners" };

export default async function WinnerAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventBySlug(id);
  if (!event) notFound();

  const entries = await getEventEntries(event.id);
  const [first, second, third] = entries;
  const withRetailer = await Promise.all([first, second, third].map(async (e) => (e ? { entry: e, retailer: await entryRetailer(e) } : null)));
  const podium = withRetailer.filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div>
      <EventHero eyebrow="Announcement" title="Meet the Winners" description={`Congratulations to the top-voted weaves of ${event.title}!`} imageUrl={event.bannerUrl} height="h-[340px]" />

      <section className="px-16 py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-end justify-center gap-6 sm:flex-row">
          {[podium[1], podium[0], podium[2]].map((item, i) =>
            item ? (
              <div
                key={item.entry.id}
                className={cn(
                  "flex flex-col items-center gap-4 rounded-lg border bg-white p-6 text-center",
                  i === 1 ? "order-2 w-full border-gold-400 sm:w-[320px]" : "order-1 w-full border-cream-300 sm:order-none sm:w-[260px]",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full font-display text-xl font-bold",
                    i === 1 ? "bg-gold-400 text-primary-600" : "bg-primary-50 text-primary-600",
                  )}
                >
                  {i === 1 ? <Trophy className="size-5" /> : i === 0 ? "2" : "3"}
                </span>
                <div className={cn("relative w-full overflow-hidden rounded-md", i === 1 ? "aspect-square" : "aspect-[4/5]")}>
                  <Image src={item.entry.imageUrl} alt={item.entry.title} fill sizes="320px" className="object-cover" />
                </div>
                <div>
                  <p className="font-display text-xl text-ink-900">{item.entry.title}</p>
                  <p className="text-sm text-ink-700">By {item.retailer?.name}</p>
                </div>
                <Badge variant="primary">{item.entry.votes.toLocaleString("en-IN")} votes</Badge>
              </div>
            ) : null,
          )}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-cream-300 bg-white p-8 text-center">
          <p className="font-display text-2xl text-primary-600">Thank you to all {event.participatingRetailers} participating retailers</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            Every entry represents hours of handloom mastery. Winners receive featured storefront placement and a
            share of the {event.prizePool} prize pool.
          </p>
        </div>
      </section>
    </div>
  );
}
