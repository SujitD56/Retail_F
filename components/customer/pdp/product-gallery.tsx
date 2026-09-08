"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0]!;

  return (
    <div className="flex max-w-[640px] flex-1 flex-col gap-6">
      <div className="relative aspect-[4/3.5] w-full overflow-hidden rounded-lg bg-cream-100">
        <Image src={current.url} alt={current.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" priority className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
          {images.map((img, i) => (
            <button
              key={img.url + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2",
                i === active ? "border-primary-600" : "border-transparent",
              )}
            >
              <Image src={img.url} alt={img.alt} fill sizes="140px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
