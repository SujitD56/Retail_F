import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/hero";
import { Categories } from "@/components/sections/home/categories";
import { Collections } from "@/components/sections/home/collections";
import { Trending } from "@/components/sections/home/trending";
import { RetailersShowcase } from "@/components/sections/home/retailers";
import { Trust } from "@/components/sections/home/trust";
import { Heritage } from "@/components/sections/home/heritage";
import { RetailerStory } from "@/components/sections/home/retailer-story";
import { getCategories } from "@/lib/data/categories";
import { getCollections } from "@/lib/data/collections";
import { getTrendingProducts, getProducts } from "@/lib/data/products";
import { getRetailers } from "@/lib/data/retailers";

export const metadata: Metadata = {
  title: "Handloom Saree Marketplace",
  description:
    "Discover the soul of Ilkal — authentic GI-verified handloom sarees from Karnataka's trusted weaver retailers.",
};

export default async function HomePage() {
  const [categories, collections, trending, retailers, allProducts] = await Promise.all([
    getCategories(),
    getCollections(),
    getTrendingProducts(4),
    getRetailers(),
    getProducts(),
  ]);

  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <Collections collections={collections} />
      <Trending products={trending} retailers={retailers} />
      <RetailersShowcase retailers={retailers} products={allProducts} />
      <Trust />
      <Heritage />
      <RetailerStory />
    </>
  );
}
