"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploadBox, type UploadedFile } from "@/components/retailer/file-upload-box";
import { useApiQuery } from "@/lib/hooks/use-api-query";
import { api, ApiError } from "@/lib/api/client";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { MarketplaceEvent, Product } from "@/types";

const STEPS = ["Upload Video", "Entry Details", "Tag Products", "Review & Submit"];
const TAGS = ["#kasuti", "#red-border", "#heritage"];

export default function RetailerSubmitEntryPage() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("Heritage Red Border Kasuti");
  const [description, setDescription] = useState(
    "The timeless art of Kasuti embroidery from Karnataka draped in our premium red cotton border Ilkal. Beautiful contrasting hues suitable for traditional wear.",
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [reelFiles, setReelFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { data: catalog } = useApiQuery<{ items: Product[] }>("/products/mine");
  const products = catalog?.items ?? [];
  const { data: events } = useApiQuery<{ items: MarketplaceEvent[] }>("/events");
  const liveEvent = events?.items.find((e) => e.status === "live") ?? events?.items[0];

  // Derived, not stored: defaults to the first product until the retailer
  // actually picks one, with no effect needed to "sync" that default in.
  const taggedProduct = selectedProductId ?? products[0]?.id ?? null;
  const taggedProductData = products.find((p) => p.id === taggedProduct);

  const handleSubmit = async () => {
    if (!liveEvent) {
      toast({ title: "No active event to submit to", variant: "error" });
      return;
    }
    if (!taggedProductData) {
      toast({ title: "Select a product to tag first", variant: "error" });
      return;
    }
    setSubmitting(true);
    try {
      await api.post(`/events/${liveEvent.id}/entries`, {
        productId: taggedProductData.id,
        title,
        // The upload flow here only accepts a video reel, which has no
        // still-frame extraction pipeline yet — fall back to the tagged
        // product's own photo as the entry thumbnail rather than leaving
        // imageUrl (required by the API) empty.
        imageUrl: reelFiles[0]?.url ?? taggedProductData.images[0]?.url,
        videoUrl: reelFiles[0]?.url,
      });
      toast({ title: "Entry submitted!", description: "Your reel is now live in the challenge.", variant: "success" });
      router.push("/retailer/events");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Couldn't submit your entry — try again.";
      toast({ title: message, variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RetailerShell title="Events & Competitions">
      <Breadcrumbs items={[{ label: "Events", href: "/retailer/events" }, { label: "Submit Entry" }]} />

      <div className="mt-6 rounded-lg border border-cream-300 bg-white p-8">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className={cn("flex size-6 items-center justify-center rounded-full text-xs font-semibold", step === i + 1 ? "bg-primary-600 text-white" : step > i + 1 ? "bg-success-500 text-white" : "bg-cream-200 text-ink-700")}>
                  {i + 1}
                </span>
                <span className={cn("text-sm font-medium", step === i + 1 ? "text-primary-600" : "text-ink-700")}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <span className="text-ink-300">→</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">
          <div className="flex flex-col gap-6">
            {step === 1 && (
              <div>
                <p className="font-display text-xl text-ink-900">Upload Your Reel</p>
                <p className="mt-1 text-sm text-ink-700">9:16 vertical video format, up to 60 seconds.</p>
                <div className="mt-4">
                  <FileUploadBox label="Drop your video reel here" hint="MP4, MOV — max 200MB" purpose="EVENT_ENTRY" onUploaded={setReelFiles} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div>
                  <Label htmlFor="entryTitle" required>Entry Title</Label>
                  <Input id="entryTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="entryDescription" required>Description</Label>
                  <Textarea id="entryDescription" className="min-h-[100px]" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <Label required>Category</Label>
                  <Select defaultValue="Traditional Draping">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Traditional Draping">Traditional Draping</SelectItem>
                      <SelectItem value="Modern Fusion">Modern Fusion</SelectItem>
                      <SelectItem value="Bridal Style">Bridal Style</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                      <span key={t} className="rounded-pill bg-cream-100 px-3 py-1.5 text-xs font-medium text-ink-700">{t}</span>
                    ))}
                    <button type="button" className="rounded-pill border border-dashed border-cream-300 px-3 py-1.5 text-xs font-medium text-ink-500">+ Add Tag</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="creator">Featured Creator</Label>
                    <Input id="creator" defaultValue="@ananya_style" />
                  </div>
                  <div>
                    <Label htmlFor="music">Music / Sound</Label>
                    <Input id="music" defaultValue="Original Heritage Sitar Mix" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="font-display text-xl text-ink-900">Tag a Catalog Product</p>
                <p className="mt-1 text-sm text-ink-700">Buyers can check out directly from your entry.</p>
                <div className="mt-4 flex flex-col gap-2">
                  {products.length === 0 && <p className="text-sm text-ink-500">Add a product to your catalog first.</p>}
                  {products.slice(0, 5).map((p) => (
                    <label key={p.id} className={cn("flex items-center gap-3 rounded-md border p-3", taggedProduct === p.id ? "border-primary-600 bg-primary-50" : "border-cream-300")}>
                      <input type="radio" checked={taggedProduct === p.id} onChange={() => setSelectedProductId(p.id)} className="size-4 accent-primary-600" />
                      <span className="text-sm text-ink-900">{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <p className="font-display text-xl text-ink-900">Review &amp; Submit</p>
                <div className="mt-4 flex flex-col gap-3 rounded-md border border-cream-300 p-5 text-sm">
                  <Row label="Entry Title" value={title} />
                  <Row label="Event" value={liveEvent?.title ?? "No active event"} />
                  <Row label="Tagged Product" value={taggedProductData?.name ?? "—"} />
                </div>
                <p className="mt-4 text-xs text-ink-500">
                  By submitting, you confirm this entry meets the Event Terms &amp; Conditions and Weaver Co-op guidelines.
                </p>
              </div>
            )}

            <div className="flex justify-between border-t border-cream-300 pt-6">
              <Button variant="secondary" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
                ← Back
              </Button>
              {step < 4 ? (
                <Button onClick={() => setStep((s) => s + 1)}>Next: {STEPS[step]} →</Button>
              ) : (
                <Button disabled={submitting} onClick={handleSubmit}>
                  {submitting ? "Submitting…" : "Submit Entry"}
                </Button>
              )}
            </div>
          </div>

          <div>
            <p className="mb-2 text-center text-sm font-medium text-ink-700">Video Preview</p>
            <div className="relative flex aspect-[9/16] w-full items-center justify-center rounded-lg bg-cream-200">
              <button type="button" className="flex size-12 items-center justify-center rounded-full bg-white shadow-card">
                <Play className="size-5 text-primary-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </RetailerShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-500">{label}</span>
      <span className="font-medium text-ink-900">{value}</span>
    </div>
  );
}
