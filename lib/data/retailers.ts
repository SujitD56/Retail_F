import { apiGet, apiGetOrNull } from "@/lib/api/server";
import type { Retailer } from "@/types";

export async function getRetailers() {
  const { items } = await apiGet<{ items: Retailer[] }>("/retailers");
  return items;
}

export async function getRetailerBySlug(slug: string) {
  const data = await apiGetOrNull<{ retailer: Retailer }>(`/retailers/slug/${encodeURIComponent(slug)}`);
  return data?.retailer ?? null;
}

export async function getRetailerById(id: string) {
  const data = await apiGetOrNull<{ retailer: Retailer }>(`/retailers/${encodeURIComponent(id)}`);
  return data?.retailer ?? null;
}
