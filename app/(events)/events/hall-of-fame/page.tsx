import type { Metadata } from "next";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { EventHero } from "@/components/customer/events/event-hero";
import { getHallOfFame } from "@/lib/data/events";
import { getRetailerById } from "@/lib/data/retailers";

export const metadata: Metadata = { title: "Hall of Fame" };

export default async function HallOfFamePage() {
  const hallOfFame = await getHallOfFame();
  const withRetailer = await Promise.all(
    hallOfFame.map(async (entry) => ({ entry, retailer: await getRetailerById(entry.retailerId) })),
  );

  return (
    <div>
      <EventHero
        eyebrow="Legacy"
        title="Hall of Fame"
        description="Revisit the winning weaves that have defined the Ilkal Style Challenge since its founding."
        imageUrl="/images/customer/heritage-1.png"
        height="h-[348px]"
      />

      <section className="px-16 py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          {withRetailer.map(({ entry, retailer }) => (
            <div key={entry.year} className="flex items-center gap-8 rounded-lg border border-cream-300 bg-white p-6">
              <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded-md">
                <Image src={entry.imageUrl} alt={entry.entryTitle} fill sizes="128px" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Trophy className="size-4 text-gold-400" />
                  <p className="text-sm font-semibold uppercase text-gold-400">{entry.year} Champion</p>
                </div>
                <p className="mt-1 font-display text-2xl text-primary-600">{entry.entryTitle}</p>
                <p className="mt-1 text-sm text-ink-700">By {retailer?.name ?? "Unknown Retailer"}</p>
                <p className="mt-3 text-sm font-medium text-ink-900">{entry.votes.toLocaleString("en-IN")} community votes</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
