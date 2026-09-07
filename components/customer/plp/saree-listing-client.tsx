"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import type { Product, Retailer, WeaveType } from "@/types";
import { FiltersSidebar } from "./filters-sidebar";
import { DEFAULT_PLP_FILTERS, SORT_LABELS, type PlpFilters, type SortOption } from "./types";
import { ProductCard } from "@/components/customer/product-card";
import { ProductListRow } from "@/components/customer/product-list-row";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState, EmptyStatePresets } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

export function SareeListingClient({
  products,
  retailers,
  initialCategory,
  header,
  hideCategoryFilter = false,
}: {
  products: Product[];
  retailers: Retailer[];
  initialCategory?: WeaveType;
  /** Overrides the default "Ilkal Sarees" heading — used by the Search Results page. */
  header?: React.ReactNode;
  /** Used by the Collection page, where the collection itself is the category. */
  hideCategoryFilter?: boolean;
}) {
  const [filters, setFilters] = useState<PlpFilters>({
    ...DEFAULT_PLP_FILTERS,
    categories: initialCategory ? [initialCategory] : [],
  });
  const [sort, setSort] = useState<SortOption>("best-selling");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const retailerName = (id: string) => retailers.find((r) => r.id === id)?.name;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) counts[p.weaveType] = (counts[p.weaveType] ?? 0) + 1;
    return counts;
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.weaveType)) return false;
      if (p.price > filters.priceMax) return false;
      if (filters.retailerIds.length && !filters.retailerIds.includes(p.retailerId)) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (filters.materials.length && !filters.materials.some((m) => p.material.toLowerCase().includes(m.split(" ")[0]!.toLowerCase()))) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return list;
  }, [products, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateFilters = (next: PlpFilters) => {
    setFilters(next);
    setPage(1);
  };

  return (
    <div className="flex gap-10 px-5 pb-24 sm:px-10 lg:px-20">
      <FiltersSidebar
        filters={filters}
        onChange={updateFilters}
        retailers={retailers}
        categoryCounts={categoryCounts}
        hideCategory={hideCategoryFilter}
      />

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          {header ?? (
            <div className="flex items-baseline gap-4">
              <h1 className="font-display text-4xl text-primary-600">Ilkal Sarees</h1>
              <p className="text-base text-ink-700">{filtered.length.toLocaleString("en-IN")} Masterpieces Found</p>
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-700">Sort By:</span>
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SORT_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex overflow-hidden rounded-sm border border-cream-300">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setView("grid")}
                className={cn("p-2", view === "grid" ? "bg-primary-600 text-white" : "bg-white text-ink-700")}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                onClick={() => setView("list")}
                className={cn("p-2", view === "list" ? "bg-primary-600 text-white" : "bg-white text-ink-700")}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {pageItems.length === 0 ? (
          <EmptyState {...EmptyStatePresets.noSareesFound} onAction={() => updateFilters(DEFAULT_PLP_FILTERS)} actionHref={undefined} />
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} retailerName={retailerName(p.retailerId)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pageItems.map((p) => (
              <ProductListRow key={p.id} product={p} retailerName={retailerName(p.retailerId)} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} className="mt-10" />
      </div>
    </div>
  );
}
