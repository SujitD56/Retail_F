"use client";

import { useMemo, useState } from "react";
import type { Product, Retailer } from "@/types";
import { RetailerCard } from "@/components/customer/retailer-card";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

type SortOption = "top-rated" | "most-products" | "newest";

export function RetailerListingClient({ retailers, products }: { retailers: Retailer[]; products: Product[] }) {
  const locations = useMemo(() => {
    const unique = Array.from(new Set(retailers.map((r) => r.location.split(",")[0]!.trim())));
    return ["All Locations", ...unique];
  }, [retailers]);

  const [location, setLocation] = useState("All Locations");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("top-rated");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = retailers.filter((r) => {
      if (location !== "All Locations" && !r.location.startsWith(location)) return false;
      if (verifiedOnly && !r.verified) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "most-products") return b.productCount - a.productCount;
      if (sort === "newest") return new Date(b.memberSince).getTime() - new Date(a.memberSince).getTime();
      return b.rating - a.rating;
    });
    return list;
  }, [retailers, location, verifiedOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="px-5 pb-24 sm:px-10 lg:px-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {locations.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setLocation(loc);
                setPage(1);
              }}
              className={cn(
                "rounded-sm border px-4 py-2 text-[13px] font-medium",
                location === loc ? "border-cream-300 bg-primary-600 text-white" : "border-cream-300 bg-white text-ink-900",
              )}
            >
              {loc}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setVerifiedOnly((v) => !v);
              setPage(1);
            }}
            className="flex items-center gap-2 rounded-sm border border-cream-300 bg-white px-4 py-2 text-[13px] text-ink-900"
          >
            Verified Only
            <span className={cn("relative h-4 w-7 rounded-pill transition-colors", verifiedOnly ? "bg-primary-600" : "bg-cream-300")}>
              <span
                className={cn(
                  "absolute top-0.5 size-3 rounded-full bg-white transition-transform",
                  verifiedOnly ? "translate-x-3.5" : "translate-x-0.5",
                )}
              />
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-ink-700">Sort by:</span>
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[190px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-rated">Top Rated storefronts</SelectItem>
              <SelectItem value="most-products">Most Products</SelectItem>
              <SelectItem value="newest">Newest Partners</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((r) => (
          <RetailerCard key={r.id} retailer={r} previewProducts={products.filter((p) => p.retailerId === r.id)} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} className="mt-16" />
    </div>
  );
}
