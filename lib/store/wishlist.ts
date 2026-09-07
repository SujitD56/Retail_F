"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";

interface WishlistState {
  productIds: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  syncToServer: () => Promise<void>;
}

function isAuthed() {
  return Boolean(useAuthStore.getState().user);
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      toggle: (productId) => {
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        }));
        if (isAuthed()) api.post("/wishlist/toggle", { productId }).catch(() => undefined);
      },

      has: (productId) => get().productIds.includes(productId),

      clear: () => {
        set({ productIds: [] });
        if (isAuthed()) api.delete("/wishlist").catch(() => undefined);
      },

      syncToServer: async () => {
        const local = get().productIds;
        try {
          const { productIds: serverIds } = await api.get<{ productIds: string[] }>("/wishlist");
          const merged = [...new Set([...serverIds, ...local])];
          // Push any locally-wishlisted (guest) items the server didn't have yet.
          await Promise.all(local.filter((id) => !serverIds.includes(id)).map((id) => api.post("/wishlist/toggle", { productId: id })));
          set({ productIds: merged });
        } catch {
          // Offline/API hiccup — keep the local wishlist as-is.
        }
      },
    }),
    { name: "ilkal-wishlist" },
  ),
);
