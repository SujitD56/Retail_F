"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedRetailersState {
  retailerIds: string[];
  toggle: (retailerId: string) => void;
  has: (retailerId: string) => boolean;
}

export const useSavedRetailersStore = create<SavedRetailersState>()(
  persist(
    (set, get) => ({
      retailerIds: [],
      toggle: (retailerId) =>
        set((state) => ({
          retailerIds: state.retailerIds.includes(retailerId)
            ? state.retailerIds.filter((id) => id !== retailerId)
            : [...state.retailerIds, retailerId],
        })),
      has: (retailerId) => get().retailerIds.includes(retailerId),
    }),
    { name: "ilkal-saved-retailers" },
  ),
);
