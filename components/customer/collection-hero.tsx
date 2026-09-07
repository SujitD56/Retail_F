import Image from "next/image";
import type { Collection } from "@/types";

export function CollectionHero({ collection, retailerCount }: { collection: Collection; retailerCount: number }) {
  return (
    <section className="relative flex flex-col gap-5 px-5 pb-12 pt-28 sm:px-10 lg:px-20">
      <Image src={collection.heroImageUrl ?? collection.coverUrl} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[rgba(30,21,19,0.65)]" />
      <div className="relative z-10 flex max-w-[720px] flex-col gap-3">
        {collection.eyebrow && <p className="text-[13px] font-semibold uppercase text-gold-400">{collection.eyebrow}</p>}
        <h1 className="font-display text-5xl leading-[1.1] text-white sm:text-[56px]">{collection.title}</h1>
        <p className="text-lg leading-relaxed text-[#f0ece6]">{collection.description}</p>
      </div>
      <span className="relative z-10 w-fit rounded-sm bg-gold-400 px-4 py-2 text-[13px] font-semibold uppercase text-primary-600">
        {collection.productIds.length} Sarees from {retailerCount} Retailers
      </span>
    </section>
  );
}
