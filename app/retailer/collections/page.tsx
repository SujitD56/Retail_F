"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, UploadCloud } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { StatusPill } from "@/components/ui/status-pill";
import { useToast } from "@/components/ui/toast";
import { useApiQuery } from "@/lib/hooks/use-api-query";
import { formatINR } from "@/lib/utils";

interface RetailerCatalogRow { id: string; imageUrl: string; name: string; price: number }

const RETAILER_COLLECTIONS = [
  { name: "Sovereign Chikki Paras", status: "Active", description: "Elite geometric traditional border silk-cottons.", products: 18, priceRange: "₹2,800 - ₹5,400", image: "/images/customer/collection-heritage.png" },
  { name: "Vibrant Kasuti Embroidery", status: "Active", description: "Intricate hand-stitched traditional patterns.", products: 12, priceRange: "₹4,500 - ₹8,200", image: "/images/customer/collection-festive-edit.png" },
  { name: "Gayatri Pure Silk Raw Masterworks", status: "Active", description: "Pure mulberry silk sarees featuring heavy zari work.", products: 6, priceRange: "₹12,000 - ₹18,500", image: "/images/customer/collection-handpicked-ilkal.png" },
  { name: "Comfort Everyday Cottons", status: "Draft", description: "Lightweight, breathable sarees for elegant daily wear.", products: 24, priceRange: "₹1,800 - ₹3,200", image: "/images/customer/collection-contemporary.png" },
];

export default function RetailerCollectionsPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { toast } = useToast();
  const { data } = useApiQuery<{ items: RetailerCatalogRow[] }>("/products/mine");
  const retailerCatalog = data?.items ?? [];

  return (
    <RetailerShell title="Collections Builder" subtitle="Organize your loom masterworks into themed curated collections.">
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setShowEditor((v) => !v)}>
          <Plus className="size-4" /> {showEditor ? "Close Editor" : "Create Collection"}
        </Button>
      </div>

      <div className="rounded-lg border border-cream-300 bg-white p-6">
        <p className="font-display text-2xl text-ink-900">Your Active Collections</p>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {RETAILER_COLLECTIONS.map((c) => (
            <div key={c.name} className="flex gap-4 rounded-md border border-cream-300 p-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-md">
                <Image src={c.image} alt={c.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-display text-lg text-ink-900">{c.name}</p>
                  <StatusPill status={c.status} />
                </div>
                <p className="mt-1 text-sm text-ink-700">{c.description}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-ink-500">
                  <span>{c.products} Products</span>
                  <span>{c.priceRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEditor && (
        <div className="mt-6 rounded-lg border border-cream-300 bg-white p-8">
          <p className="font-display text-2xl text-ink-900">Drafting New Collection</p>
          <p className="mt-1 text-sm text-ink-700">Create a thematic set to help customers discover matching pallus and body weaves.</p>

          <div className="mt-6">
            <Label htmlFor="collectionName">Collection Name</Label>
            <Input id="collectionName" placeholder="Festive Zari Border Silk Cottons" />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
            <div>
              <Label htmlFor="collectionDesc">Collection Description</Label>
              <Textarea
                id="collectionDesc"
                className="min-h-[100px]"
                placeholder="Elite blends featuring genuine pure silver zari woven pallus combined with comfortable Mercerized cotton bodies. Specifically selected for monsoon festivals and marriages."
              />
            </div>
            <div>
              <Label>Collection Cover Photo</Label>
              <button type="button" className="flex h-[100px] w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-cream-300 bg-cream-100 text-ink-500 hover:border-primary-600/40">
                <UploadCloud className="size-5" />
                <span className="text-xs font-medium">Select Cover Banner</span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-lg text-ink-900">Add Products ({selected.length} Selected)</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-ink-500" />
                <input placeholder="Search and add more" className="h-9 w-56 rounded-sm border border-cream-300 bg-cream-100 pl-8 pr-3 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none" />
              </div>
            </div>
            <div className="overflow-hidden rounded-md border border-cream-300">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-300 bg-cream-100 text-left text-xs uppercase text-ink-500">
                    <th className="px-4 py-2.5 font-medium">Product Title &amp; Spec</th>
                    <th className="px-4 py-2.5 font-medium">Market Price</th>
                    <th className="px-4 py-2.5 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {retailerCatalog.map((p) => {
                    const isSelected = selected.includes(p.id);
                    return (
                      <tr key={p.id} className="border-b border-cream-300 last:border-0">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative size-9 shrink-0 overflow-hidden rounded-sm">
                              <Image src={p.imageUrl} alt="" fill sizes="36px" className="object-cover" />
                            </div>
                            <span className="text-ink-900">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ink-900">{formatINR(p.price)}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => setSelected((prev) => (isSelected ? prev.filter((id) => id !== p.id) : [...prev, p.id]))}
                            className={isSelected ? "font-semibold text-danger-500" : "font-semibold text-primary-600"}
                          >
                            {isSelected ? "Remove" : "Add"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowEditor(false)}>Cancel</Button>
            <Button
              onClick={() => {
                toast({ title: "Collection published", variant: "success" });
                setShowEditor(false);
              }}
            >
              Publish Collection
            </Button>
          </div>
        </div>
      )}
    </RetailerShell>
  );
}
