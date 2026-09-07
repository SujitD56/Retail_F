import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/types";

export function RelatedCollections({ collections }: { collections: Collection[] }) {
  if (collections.length === 0) return null;

  return (
    <section className="border-t border-cream-300 px-5 py-16 sm:px-10 lg:px-20">
      <h2 className="mb-8 font-display text-[32px] text-primary-600">Explore Other Curated Edits</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {collections.map((c) => (
          <Link key={c.id} href={`/collections/${c.slug}`} className="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-md p-6">
            <Image src={c.coverUrl} alt={c.title} fill sizes="33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40" />
            <p className="relative z-10 font-display text-2xl text-white">{c.title}</p>
            <p className="relative z-10 text-[13px] text-white/80">{c.productIds.length} Sarees</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
