import { apiGet, apiGetOrNull } from "@/lib/api/server";
import { getProductById } from "@/lib/data/products";
import { getRetailerById } from "@/lib/data/retailers";
import type { EventEntry, MarketplaceEvent } from "@/types";

export interface HallOfFameEntry {
  year: number;
  entryTitle: string;
  retailerId: string;
  imageUrl: string;
  votes: number;
}

export async function getEvents() {
  const { items } = await apiGet<{ items: MarketplaceEvent[] }>("/events");
  return items;
}

export async function getEventBySlug(slug: string) {
  const data = await apiGetOrNull<{ event: MarketplaceEvent }>(`/events/slug/${encodeURIComponent(slug)}`);
  return data?.event ?? null;
}

export async function getEventEntries(eventId: string) {
  // The API already returns entries sorted votes-desc with `rank` populated.
  const { items } = await apiGet<{ items: EventEntry[] }>(`/events/${encodeURIComponent(eventId)}/entries`);
  return items;
}

export async function getEventEntry(entryId: string) {
  const data = await apiGetOrNull<{ entry: EventEntry }>(`/events/entries/${encodeURIComponent(entryId)}`);
  return data?.entry ?? null;
}

export async function getHallOfFame() {
  const { items } = await apiGet<{ items: HallOfFameEntry[] }>("/events/hall-of-fame");
  return items;
}

// These were synchronous `.find()`s over in-memory mock arrays; now that
// products/retailers live behind the API, resolving an entry's product or
// retailer is necessarily async. Every call site already sits inside an
// `async (e) => ({ ... })` mapper — just `await` these where they're called.
export async function entryProduct(entry: EventEntry) {
  return getProductById(entry.productId);
}

export async function entryRetailer(entry: EventEntry) {
  return getRetailerById(entry.retailerId);
}
