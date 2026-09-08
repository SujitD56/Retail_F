"use client";

import { Search, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { StarRating } from "@/components/ui/star-rating";
import type { Retailer, WeaveType } from "@/types";
import { cn } from "@/lib/utils";
import type { PlpFilters } from "./types";

const CATEGORY_OPTIONS: WeaveType[] = [
  "Traditional Ilkal",
  "Contemporary Ilkal",
  "Wedding Saree",
  "Festive Saree",
  "Cotton Ilkal",
  "Silk Cotton",
];

const COLOR_SWATCHES = [
  { hex: "#6b1d2a", label: "Maroon" },
  { hex: "#1e5c49", label: "Green" },
  { hex: "#1d326b", label: "Navy" },
  { hex: "#c4a265", label: "Gold" },
  { hex: "#0f0f10", label: "Black" },
  { hex: "#ef9fa7", label: "Pink" },
  { hex: "#faf3e6", label: "Cream" },
  { hex: "#8f64f2", label: "Purple" },
];

const MATERIAL_OPTIONS = ["Cotton warp & weft", "Silk Cotton blend", "100% Pure Mulberry Silk"];

export function FiltersSidebar({
  filters,
  onChange,
  retailers,
  categoryCounts,
  hideCategory = false,
  mobileOpen = false,
  onMobileClose,
}: {
  filters: PlpFilters;
  onChange: (next: PlpFilters) => void;
  retailers: Retailer[];
  categoryCounts: Record<string, number>;
  /** Collection-scoped listings hide the category group — the collection itself is the category. */
  hideCategory?: boolean;
  /** Below lg, the sidebar renders as an off-canvas drawer controlled by the parent's "Filters" button. */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const body = (
    <>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-ink-900">Filters</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              onChange({ categories: [], priceMax: 10000, colors: [], materials: [], retailerIds: [], minRating: 0, inStockOnly: false })
            }
            className="text-[13px] font-medium text-primary-600"
          >
            Clear All
          </button>
          {onMobileClose && (
            <button type="button" aria-label="Close filters" onClick={onMobileClose} className="text-ink-700 lg:hidden">
              <X className="size-5" />
            </button>
          )}
        </div>
      </div>

      {!hideCategory && (
        <FilterGroup title="Category">
          <div className="flex flex-col gap-3">
            {CATEGORY_OPTIONS.map((cat) => (
              <label key={cat} className="flex items-center justify-between text-sm text-ink-900">
                <span className="flex items-center gap-2.5">
                  <Checkbox
                    checked={filters.categories.includes(cat)}
                    onCheckedChange={() => onChange({ ...filters, categories: toggle(filters.categories, cat) })}
                  />
                  {cat}
                </span>
                <span className="text-xs text-ink-500">({categoryCounts[cat] ?? 0})</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title="Price Range">
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={500}
            max={10000}
            step={100}
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
            className="w-full accent-primary-600"
          />
          <div className="flex justify-between text-[13px] text-ink-700">
            <span>₹500</span>
            <span>Up to ₹{filters.priceMax.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Color Swatches">
        <div className="flex flex-wrap gap-2">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c.hex}
              type="button"
              aria-label={c.label}
              onClick={() => onChange({ ...filters, colors: toggle(filters.colors, c.hex) })}
              className={cn(
                "size-7 rounded-full border",
                filters.colors.includes(c.hex) ? "border-[3px] border-gold-400" : "border-cream-300",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Material">
        <div className="flex flex-col gap-3">
          {MATERIAL_OPTIONS.map((mat) => (
            <label key={mat} className="flex items-center gap-2.5 text-sm text-ink-900">
              <Checkbox checked={filters.materials.includes(mat)} onCheckedChange={() => onChange({ ...filters, materials: toggle(filters.materials, mat) })} />
              {mat}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Retailer">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-3 -translate-y-1/2 text-ink-500" />
            <input
              placeholder="Search retailers..."
              className="h-8 w-full rounded-sm border border-cream-300 bg-cream-100 pl-8 pr-2 text-xs text-ink-900 placeholder:text-ink-500 focus:outline-none"
            />
          </div>
          {retailers.map((r) => (
            <label key={r.id} className="flex items-center gap-2.5 text-sm text-ink-900">
              <Checkbox checked={filters.retailerIds.includes(r.id)} onCheckedChange={() => onChange({ ...filters, retailerIds: toggle(filters.retailerIds, r.id) })} />
              {r.name}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div className="flex flex-col gap-3">
          {[4, 3].map((r) => (
            <label key={r} className="flex items-center gap-2.5">
              <Checkbox checked={filters.minRating === r} onCheckedChange={() => onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })} />
              <StarRating value={r} size="xs" />
              <span className="text-[13px] text-ink-700">&amp; above</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2.5 text-sm text-ink-900">
            <Checkbox checked={filters.inStockOnly} onCheckedChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })} />
            In Stock Only
          </label>
        </div>
      </FilterGroup>
    </>
  );

  return (
    <>
      {/* Desktop — always visible at lg+, matches the previous fixed layout. */}
      <aside className="hidden w-[280px] shrink-0 flex-col gap-6 lg:flex">{body}</aside>

      {/* Mobile — off-canvas drawer, toggled by the listing page's "Filters" button. */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={onMobileClose} />
          <aside className="relative flex h-full w-[280px] max-w-[85vw] flex-col gap-6 overflow-y-auto bg-white p-5 shadow-xl">
            {body}
          </aside>
        </div>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-cream-300 pb-6 last:border-0">
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      {children}
    </div>
  );
}
