import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CollectionHero } from "@/components/customer/collection-hero";
import { SareeListingClient } from "@/components/customer/plp/saree-listing-client";
import { RelatedCollections } from "@/components/customer/related-collections";
import { getCollectionBySlug, getCollections } from "@/lib/data/collections";
import { getProducts } from "@/lib/data/products";
import { getRetailers } from "@/lib/data/retailers";

// No generateStaticParams — collections are admin-managed and should
// reflect edits immediately, so this renders per-request.

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};
  return { title: collection.title, description: collection.description };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [collection, allCollections, allProducts, retailers] = await Promise.all([
    getCollectionBySlug(slug),
    getCollections(),
    getProducts(),
    getRetailers(),
  ]);
  if (!collection) notFound();

  const collectionProducts = allProducts.filter((p) => collection.productIds.includes(p.id));
  const retailerCount = new Set(collectionProducts.map((p) => p.retailerId)).size;
  const otherCollections = allCollections.filter((c) => c.id !== collection.id).slice(0, 3);

  return (
    <div>
      <div className="px-5 pt-6 sm:px-10 lg:px-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections", href: "/sarees" }, { label: collection.title }]} />
      </div>
      <CollectionHero collection={collection} retailerCount={retailerCount || 1} />
      <SareeListingClient
        products={collectionProducts}
        retailers={retailers}
        hideCategoryFilter
        header={
          <div className="flex items-baseline gap-3">
            <p className="text-base text-ink-700">Showing {collectionProducts.length} exquisite sarees</p>
          </div>
        }
      />
      <RelatedCollections collections={otherCollections} />
    </div>
  );
}
