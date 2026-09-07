"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { FileUploadBox, type UploadedFile } from "@/components/retailer/file-upload-box";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { api } from "@/lib/api/client";
import { cn } from "@/lib/utils";

const TABS = ["Basic Info", "Images", "Specifications", "Pricing"] as const;
const CATEGORIES = ["Traditional Ilkal", "Contemporary Ilkal", "Wedding Saree", "Festive Saree", "Cotton Ilkal", "Silk Cotton"];
const COLLECTIONS = ["Handpicked Ilkal", "Festive Edit", "Heritage Collection", "Contemporary Ilkal"];

export default function AddProductPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic Info");
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("Handloom Chikki Paras Pure Cotton Saree");
  const [description, setDescription] = useState(
    "Painstakingly hand-woven by local weaver communities in Ilkal, this masterpiece features the world-renowned Chikki Paras (star-dot) border weave and a gorgeous solid maroon pallu. Ideal for festive family events or comfortable elegant everyday wear.",
  );
  const [category, setCategory] = useState(CATEGORIES[0]!);
  const [collection, setCollection] = useState(COLLECTIONS[0]!);
  const [tags, setTags] = useState("Handloom, Pure Cotton, Traditional Border");
  const [material, setMaterial] = useState("");
  const [lengthWidth, setLengthWidth] = useState("");
  const [borderType, setBorderType] = useState("");
  const [color, setColor] = useState("");
  const [images, setImages] = useState<UploadedFile[]>([]);
  const [price, setPrice] = useState(2850);
  const [compareAtPrice, setCompareAtPrice] = useState(3500);
  const [stockQty, setStockQty] = useState(25);
  const [live, setLive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const publish = async (asDraft: boolean) => {
    if (images.length === 0) {
      toast({ title: "Add at least one product photo", variant: "error" });
      setTab("Images");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/products/mine", {
        name: title,
        description,
        weaveType: category,
        collectionLabel: collection,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        color: color || "As pictured",
        borderType: borderType || "Classic",
        material: material || "Handloom blend",
        lengthWidth: lengthWidth || "5.5 Meters Saree + 0.8 Meters Blouse Piece",
        price,
        compareAtPrice: compareAtPrice || undefined,
        stockCount: stockQty,
        images: images.map((f) => ({ url: f.url, alt: title })),
        status: asDraft || !live ? "DRAFT" : "ACTIVE",
      });
      toast({
        title: asDraft ? "Saved as draft" : "Product published",
        description: asDraft ? "You can continue editing later." : "Now live on the Ilkal Threads marketplace.",
        variant: "success",
      });
      router.push("/retailer/products");
    } catch {
      toast({ title: "Couldn't save this product — try again", variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RetailerShell title="Add New Product" subtitle="Introduce a new handcrafted masterwork to the Ilkal Threads marketplace.">
      <div className="mb-6 flex justify-end gap-3">
        <Button variant="secondary" disabled={submitting} onClick={() => publish(true)} className="uppercase">
          Save Draft
        </Button>
        <Button disabled={submitting} onClick={() => publish(false)} className="uppercase">
          {submitting ? "Publishing…" : "Publish Live"}
        </Button>
      </div>

      <div className="mb-8 flex gap-8 border-b border-cream-300">
        {TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold",
              tab === t ? "border-primary-600 text-primary-600" : "border-transparent text-ink-500",
            )}
          >
            <span className={cn("flex size-6 items-center justify-center rounded-full text-xs", tab === t ? "bg-primary-600 text-white" : "bg-cream-200 text-ink-700")}>
              {i + 1}
            </span>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          {tab === "Basic Info" && (
            <div className="rounded-lg border border-cream-300 bg-white p-6">
              <p className="font-display text-xl text-ink-900">Basic Details</p>
              <div className="mt-5 flex flex-col gap-5">
                <div>
                  <Label htmlFor="productTitle" required>Product Title</Label>
                  <Input id="productTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="productDescription" required>Description</Label>
                  <Textarea id="productDescription" className="min-h-[140px]" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>

              <p className="mt-8 font-display text-xl text-ink-900">Category &amp; Weaving Specs</p>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>Saree Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Collection Target</Label>
                  <Select value={collection} onValueChange={setCollection}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{COLLECTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tags">Artisan Tags (Comma separated)</Label>
                  <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {tab === "Images" && (
            <div className="rounded-lg border border-cream-300 bg-white p-6">
              <p className="font-display text-xl text-ink-900">Product Images</p>
              <p className="mt-1 text-sm text-ink-700">Upload a hero shot plus 3-4 detail angles. First image becomes the primary listing photo.</p>
              <div className="mt-5">
                <FileUploadBox
                  label="Upload product photos"
                  hint="JPEG/PNG — first image is the primary listing photo"
                  purpose="PRODUCT_IMAGE"
                  multiple
                  onUploaded={setImages}
                />
              </div>
            </div>
          )}

          {tab === "Specifications" && (
            <div className="rounded-lg border border-cream-300 bg-white p-6">
              <p className="font-display text-xl text-ink-900">Weave Specifications</p>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input id="material" placeholder="Fine cotton body, Pure Mulberry Silk pallu" value={material} onChange={(e) => setMaterial(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="lengthWidth">Length &amp; Width</Label>
                  <Input id="lengthWidth" placeholder="5.5 Meters Saree + 0.8 Meters Blouse Piece" value={lengthWidth} onChange={(e) => setLengthWidth(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="borderType">Border Type</Label>
                  <Input id="borderType" placeholder="Chikki Paras (Golden zari motifs)" value={borderType} onChange={(e) => setBorderType(e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="Heirloom Crimson Body & Dark Indigo Weft blend" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {tab === "Pricing" && (
            <div className="rounded-lg border border-cream-300 bg-white p-6">
              <p className="font-display text-xl text-ink-900">Pricing &amp; Inventory</p>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <Label htmlFor="sellingPrice" required>Selling Price (₹)</Label>
                  <Input id="sellingPrice" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="compareAtPrice">Compare-at Price (₹)</Label>
                  <Input id="compareAtPrice" type="number" value={compareAtPrice} onChange={(e) => setCompareAtPrice(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="stockQty" required>Stock Quantity</Label>
                  <Input id="stockQty" type="number" value={stockQty} onChange={(e) => setStockQty(Number(e.target.value))} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-cream-300 bg-white p-6">
            <p className="font-display text-lg text-ink-900">Publishing Settings</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-ink-900">Live Product Status</span>
              <button
                type="button"
                onClick={() => setLive((v) => !v)}
                className={cn("relative h-6 w-12 rounded-pill transition-colors", live ? "bg-primary-600" : "bg-cream-300")}
              >
                <span className={cn("absolute top-1 size-4 rounded-full bg-white transition-transform", live ? "translate-x-7" : "translate-x-1")} />
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-500">
              Enabling live status publishes this handloom piece to the global Ilkal marketplace immediately.
            </p>
          </div>

          <div className="rounded-lg border border-cream-300 bg-white p-6">
            <p className="font-display text-lg text-ink-900">SEO / Search Preview</p>
            <div className="mt-4 rounded-md border border-cream-300 bg-cream-100 p-4">
              <p className="truncate text-sm font-medium text-info-500">{title || "Product title"}</p>
              <p className="mt-1 truncate text-xs text-success-500">ilkalthreads.com/product/{title.toLowerCase().replace(/\s+/g, "-")}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-700 line-clamp-2">
                Buy authentic {title} — 100% verified pure handloom products…
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-success-500/30 bg-success-50 p-4 text-xs text-success-500">
            <Check className="mt-0.5 size-4 shrink-0" />
            {images.length > 0 ? `${images.length} image(s) uploaded to S3.` : "Upload at least one image before publishing."}
          </div>
        </div>
      </div>
    </RetailerShell>
  );
}
