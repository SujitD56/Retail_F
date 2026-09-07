import { apiGet, apiGetOrNull } from "@/lib/api/server";
import type { Collection } from "@/types";

export async function getCollections() {
  const { items } = await apiGet<{ items: Collection[] }>("/collections");
  return items;
}

export async function getCollectionBySlug(slug: string) {
  const data = await apiGetOrNull<{ collection: Collection }>(`/collections/${encodeURIComponent(slug)}`);
  return data?.collection ?? null;
}
