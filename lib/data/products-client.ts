"use client";

// Client-safe counterpart to a couple of `lib/data/products.ts` reads —
// that file imports the server-only API client, so any Client Component
// needing the same data (cart, wishlist, checkout resolving productIds to
// full Product objects) goes through here instead, which calls the API via
// the same-origin browser client (`lib/api/client.ts`).
import { api } from "@/lib/api/client";
import type { Product } from "@/types";

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const { items } = await api.get<{ items: Product[] }>(`/products/by-ids?ids=${ids.map(encodeURIComponent).join(",")}`);
  return items;
}
