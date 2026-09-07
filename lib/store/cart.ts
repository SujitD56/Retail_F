"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { api } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";

interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  /** Called right after login: merges whatever was in this (guest) cart into the server cart, then adopts the merged, canonical result. */
  syncToServer: () => Promise<void>;
}

function isAuthed() {
  return Boolean(useAuthStore.getState().user);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            return { items: state.items.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i)) };
          }
          return { items: [...state.items, { productId, quantity }] };
        });
        if (isAuthed()) api.post("/cart/items", { productId, quantity }).catch(() => undefined);
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
        if (isAuthed()) api.delete(`/cart/items/${productId}`).catch(() => undefined);
      },

      setQuantity: (productId, quantity) => {
        set((state) => ({
          items: quantity <= 0 ? state.items.filter((i) => i.productId !== productId) : state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        }));
        if (isAuthed()) api.put(`/cart/items/${productId}`, { quantity }).catch(() => undefined);
      },

      clear: () => {
        set({ items: [] });
        if (isAuthed()) api.delete("/cart").catch(() => undefined);
      },

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      syncToServer: async () => {
        const local = get().items;
        try {
          const { items } = local.length > 0
            ? await api.post<{ items: CartItem[] }>("/cart/merge", { items: local })
            : await api.get<{ items: CartItem[] }>("/cart");
          set({ items });
        } catch {
          // Offline/API hiccup — keep the local cart as-is rather than wiping it.
        }
      },
    }),
    { name: "ilkal-cart" },
  ),
);
