import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function RetailerStory() {
  return (
    <section className="flex flex-col items-center gap-10 bg-[#faf3e6] px-5 py-24 sm:px-10 lg:flex-row lg:gap-20 lg:px-20">
      <div className="relative h-[400px] w-full flex-1 overflow-hidden rounded-xl">
        <Image src="/images/customer/retailer-story.png" alt="Weaver cooperative" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-7">
        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-semibold uppercase text-gold-400">Empowering Artisans</p>
          <h2 className="font-display text-[38px] text-primary-600">From Ilkal, With Tradition</h2>
          <p className="text-base leading-relaxed text-ink-700">
            We connect you directly with multi-generation retailers and weaving cooperatives. By bypassing heavy
            middlemen margins, we ensure that the weavers of Ilkal earn fair sustainable wages, preserving this
            magnificent heritage for posterity.
          </p>
        </div>
        <Button asChild size="lg" className="w-fit uppercase">
          <Link href="/retailers">Explore Retailers</Link>
        </Button>
      </div>
    </section>
  );
}
