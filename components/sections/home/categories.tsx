import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/data/categories";
import { SectionHeading } from "./section-heading";

export function Categories({ categories }: { categories: Category[] }) {
  return (
    <section className="flex flex-col gap-14 px-5 py-24 sm:px-10 lg:px-20">
      <SectionHeading
        eyebrow="The Craftsmanship"
        title="Shop by Category"
        description="Explore distinct material blends and classic handloom designs curated for modern tastes."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/sarees?category=${cat.slug}`}
            className="group flex flex-col overflow-hidden rounded-md border border-cream-300 bg-white"
          >
            <div className="relative h-[200px] w-full overflow-hidden">
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-3 p-6">
              <p className="font-display text-[22px] text-primary-600">{cat.name}</p>
              <p className="text-sm leading-relaxed text-ink-700">{cat.description}</p>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase text-primary-600">
                Explore <ArrowRight className="size-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
