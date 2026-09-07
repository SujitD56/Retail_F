import type { Product, Retailer } from "@/types";
import { RetailerCard } from "@/components/customer/retailer-card";
import { SectionHeading } from "./section-heading";

export function RetailersShowcase({ retailers, products }: { retailers: Retailer[]; products: Product[] }) {
  return (
    <section className="flex flex-col gap-14 bg-cream-200 px-5 py-24 sm:px-10 lg:px-20">
      <SectionHeading
        eyebrow="Verified Partners"
        title="Meet Our Retailers"
        description="Connecting you with the true custodians of handloom heritage, supporting authentic weavers from Ilkal town."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {retailers.slice(0, 3).map((r) => (
          <RetailerCard
            key={r.id}
            retailer={r}
            previewProducts={products.filter((p) => p.retailerId === r.id).length ? products.filter((p) => p.retailerId === r.id) : products}
          />
        ))}
      </div>
    </section>
  );
}
