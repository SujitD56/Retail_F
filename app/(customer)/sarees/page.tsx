import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SareeListingClient } from "@/components/customer/plp/saree-listing-client";
import { getProducts } from "@/lib/data/products";
import { getRetailers } from "@/lib/data/retailers";
import { getCategories } from "@/lib/data/categories";
import type { WeaveType } from "@/types";

export const metadata: Metadata = {
  title: "Ilkal Sarees",
  description: "Browse GI-verified handloom Ilkal sarees, filterable by category, price, retailer, and rating.",
};

export default async function SareeListingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const { category } = await searchParams;
  const [products, retailers, categories] = await Promise.all([getProducts(), getRetailers(), getCategories()]);

  const initialCategory = categories.find((c) => c.slug === category)?.name as WeaveType | undefined;

  return (
    <div className="pb-4">
      <div className="px-5 pt-6 sm:px-10 lg:px-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sarees" }]} />
      </div>
      <div className="h-8" />
      <SareeListingClient products={products} retailers={retailers} initialCategory={initialCategory} />
    </div>
  );
}
