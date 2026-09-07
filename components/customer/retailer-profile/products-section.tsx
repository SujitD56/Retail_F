"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/customer/product-card";
import { EmptyState, EmptyStatePresets } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

export function RetailerProductsSection({ products, retailerName }: { products: Product[]; retailerName: string }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.weaveType)))], [products]);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? products : products.filter((p) => p.weaveType === active);

  return (
    <section className="px-5 py-16 sm:px-10 lg:px-20">
      <h2 className="mb-6 font-display text-[32px] text-primary-600">
        All Products ({products.length.toLocaleString("en-IN")})
      </h2>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-sm border px-4 py-2 text-[13px] font-medium",
              active === cat ? "border-primary-600 bg-primary-600 text-white" : "border-cream-300 bg-white text-ink-900",
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState {...EmptyStatePresets.noProductsListed} />
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} retailerName={retailerName} />
          ))}
        </div>
      )}
    </section>
  );
}
