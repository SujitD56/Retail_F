import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { RetailerListingClient } from "@/components/customer/retailer-listing-client";
import { getRetailers } from "@/lib/data/retailers";
import { getProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Explore Ilkal Retailers",
  description: "Discover trusted, GI-verified handloom Ilkal saree retailers from across Karnataka.",
};

export default async function RetailerListingPage() {
  const [retailers, products] = await Promise.all([getRetailers(), getProducts()]);

  return (
    <div>
      <div className="px-5 pt-6 sm:px-10 lg:px-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Retailers" }]} />
      </div>
      <div className="flex flex-col gap-3 px-5 pb-8 pt-12 sm:px-10 lg:px-20">
        <h1 className="font-display text-4xl text-primary-600">Explore Ilkal Retailers</h1>
        <p className="max-w-2xl text-base text-ink-700">
          Discover trusted partners bringing authentic, GI-verified handloom Ilkal sarees straight to your doorstep.
          Supporting Karnataka&apos;s artisan legacy.
        </p>
        <p className="text-sm font-semibold text-gold-400">{retailers.length} Verified Storefronts</p>
      </div>
      <RetailerListingClient retailers={retailers} products={products} />
    </div>
  );
}
