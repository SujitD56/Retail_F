"use client";

import { useState } from "react";
import Image from "next/image";
import { Folder, Plus, Search } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { StatusPill } from "@/components/ui/status-pill";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUploadBox } from "@/components/retailer/file-upload-box";
import { useToast } from "@/components/ui/toast";
import { useApiQuery } from "@/lib/hooks/use-api-query";
import { api } from "@/lib/api/client";
import { formatINR } from "@/lib/utils";

interface RetailerCatalogRow { id: string; imageUrl: string; name: string; price: number }

interface RetailerCollection {
  id: string;
  name: string;
  description: string;
  status: "draft" | "active";
  coverImageUrl?: string;
  productIds: string[];
  productCount: number;
  priceRange: { min: number; max: number } | null;
}

export default function RetailerCollectionsPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>();
  const [publishing, setPublishing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  const { data: catalogData } = useApiQuery<{ items: RetailerCatalogRow[] }>("/products/mine");
  const retailerCatalog = catalogData?.items ?? [];

  const { data: collectionsData, loading: collectionsLoading } = useApiQuery<{ items: RetailerCollection[] }>(
    `/retailers/collections/mine?_r=${refreshKey}`,
  );
  const collections = collectionsData?.items ?? [];

  const resetEditor = () => {
    setName("");
    setDescription("");
    setCoverImageUrl(undefined);
    setSelected([]);
    setShowEditor(false);
  };

  const publish = async (status: "draft" | "active") => {
    if (!name.trim() || !description.trim()) {
      toast({ title: "Name and description are required", variant: "error" });
      return;
    }
    setPublishing(true);
    try {
      await api.post("/retailers/collections/mine", {
        name: name.trim(),
        description: description.trim(),
        status,
        coverImageUrl,
        productIds: selected,
      });
      toast({ title: status === "active" ? "Collection published" : "Draft saved", variant: "success" });
      setRefreshKey((k) => k + 1);
      resetEditor();
    } catch {
      toast({ title: "Couldn't save the collection — try again", variant: "error" });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <RetailerShell title="Collections Builder" subtitle="Organize your loom masterworks into themed curated collections.">
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setShowEditor((v) => !v)}>
          <Plus className="size-4" /> {showEditor ? "Close Editor" : "Create Collection"}
        </Button>
      </div>

      <div className="rounded-lg border border-cream-300 bg-white p-4 sm:p-6">
        <p className="font-display text-2xl text-ink-900">Your Collections</p>
        {collectionsLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-md" />
            ))}
          </div>
        ) : collections.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-md border border-dashed border-cream-300 py-12 text-center">
            <Folder className="size-6 text-ink-500" />
            <p className="text-sm text-ink-700">No collections yet — create one to group your products for buyers.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {collections.map((c) => (
              <div key={c.id} className="flex gap-4 rounded-md border border-cream-300 p-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-cream-100">
                  {c.coverImageUrl ? (
                    <Image src={c.coverImageUrl} alt={c.name} fill sizes="80px" className="object-cover" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-ink-300">
                      <Folder className="size-6" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-display text-lg text-ink-900">{c.name}</p>
                    <StatusPill status={c.status} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-700">{c.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-500">
                    <span>{c.productCount} Product{c.productCount === 1 ? "" : "s"}</span>
                    {c.priceRange && (
                      <span>
                        {formatINR(c.priceRange.min)}
                        {c.priceRange.max !== c.priceRange.min ? ` - ${formatINR(c.priceRange.max)}` : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEditor && (
        <div className="mt-6 rounded-lg border border-cream-300 bg-white p-5 sm:p-8">
          <p className="font-display text-2xl text-ink-900">Drafting New Collection</p>
          <p className="mt-1 text-sm text-ink-700">Create a thematic set to help customers discover matching pallus and body weaves.</p>

          <div className="mt-6">
            <Label htmlFor="collectionName">Collection Name</Label>
            <Input
              id="collectionName"
              placeholder="Festive Zari Border Silk Cottons"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
            <div>
              <Label htmlFor="collectionDesc">Collection Description</Label>
              <Textarea
                id="collectionDesc"
                className="min-h-[100px]"
                placeholder="Elite blends featuring genuine pure silver zari woven pallus combined with comfortable Mercerized cotton bodies. Specifically selected for monsoon festivals and marriages."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label>Collection Cover Photo</Label>
              <FileUploadBox
                label="Select Cover Banner"
                hint="JPEG, PNG (Max 2MB)"
                purpose="PRODUCT_IMAGE"
                onUploaded={(files) => setCoverImageUrl(files[0]?.url)}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-lg text-ink-900">Add Products ({selected.length} Selected)</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-ink-500" />
                <input placeholder="Search and add more" className="h-9 w-full rounded-sm border border-cream-300 bg-cream-100 pl-8 pr-3 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none sm:w-56" />
              </div>
            </div>
            <div className="overflow-x-auto rounded-md border border-cream-300">
              <table className="w-full min-w-[480px] text-sm">
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

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button variant="secondary" onClick={resetEditor} disabled={publishing}>Cancel</Button>
            <Button variant="secondary" onClick={() => publish("draft")} disabled={publishing}>Save as Draft</Button>
            <Button onClick={() => publish("active")} disabled={publishing}>
              {publishing ? "Publishing…" : "Publish Collection"}
            </Button>
          </div>
        </div>
      )}
    </RetailerShell>
  );
}
