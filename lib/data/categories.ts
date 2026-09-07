import { apiGet } from "@/lib/api/server";
import type { WeaveType } from "@/types";

export interface Category {
  slug: string;
  name: WeaveType;
  description: string;
  imageUrl: string;
}

export async function getCategories() {
  const { items } = await apiGet<{ items: Category[] }>("/categories");
  return items;
}
