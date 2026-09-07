import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/types";
import { SectionHeading } from "./section-heading";

export function Collections({ collections }: { collections: Collection[] }) {
  return (
    <section className="flex flex-col gap-14 bg-[#f4ece1] px-5 py-24 sm:px-10 lg:px-20">
      <SectionHeading
        eyebrow="Curated Edits"
        title="Curated Collections"
        description="Handpicked selections reflecting seasonal movements, heritage revivals, and timeless aesthetics."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="relative flex h-[420px] flex-col justify-end gap-4 overflow-hidden rounded-md p-6"
          >
            <Image src={col.coverUrl} alt={col.title} fill sizes="(min-width: 1024px) 24vw, 90vw" className="object-cover" />
            <div className="absolute inset-0 bg-[rgba(30,21,19,0.5)]" />
            <div className="relative z-10 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase text-gold-400">{col.productIds.length} Sarees</p>
              <p className="font-display text-[28px] text-white">{col.title}</p>
              <p className="text-[13px] leading-snug text-[#efece6]">{col.description}</p>
            </div>
            <span className="relative z-10 inline-flex w-fit items-center rounded-sm bg-white px-4 py-2 text-xs font-semibold uppercase text-primary-600">
              View Collection
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
