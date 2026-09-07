import { apiGet } from "@/lib/api/server";
import type { Review } from "@/types";

export interface RatingBreakdown {
  average: number;
  total: number;
  distribution: { stars: 5 | 4 | 3 | 2 | 1; percent: number }[];
}

export async function getReviews(productId: string) {
  const { items } = await apiGet<{ items: Review[] }>(`/reviews/product/${encodeURIComponent(productId)}`);
  return items;
}

export async function getRatingBreakdown(productId: string): Promise<RatingBreakdown> {
  return apiGet<RatingBreakdown>(`/reviews/product/${encodeURIComponent(productId)}/rating-breakdown`);
}

// ---------- Retailer (storefront) reviews ----------

export interface RetailerReview {
  id: string;
  retailerId: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
}

export async function getRetailerReviews(retailerId: string) {
  const { items } = await apiGet<{ items: RetailerReview[] }>(`/reviews/retailer/${encodeURIComponent(retailerId)}`);
  return items;
}

export async function getRetailerRatingBreakdown(retailerId: string): Promise<RatingBreakdown> {
  return apiGet<RatingBreakdown>(`/reviews/retailer/${encodeURIComponent(retailerId)}/rating-breakdown`);
}
