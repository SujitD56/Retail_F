"use client";

import { create } from "zustand";
import type { Address, Order } from "@/types";
import { api, ApiError } from "@/lib/api/client";

interface PlaceOrderInput {
  items: { productId: string; quantity: number }[];
  shippingAddress: Address;
  deliveryMethod?: "standard" | "express";
  paymentMethod: "upi" | "card" | "netbanking" | "cod";
  /** Required when checking out signed out. */
  guestEmail?: string;
}

interface OrdersState {
  placeOrder: (input: PlaceOrderInput) => Promise<Order>;
  getOrder: (orderNumber: string) => Promise<Order | null>;
  getAllOrders: () => Promise<Order[]>;
}

/**
 * Orders are server-truth now (no more client-generated order objects held
 * in localStorage) — this store is just a thin async wrapper so components
 * keep a single, familiar `useOrdersStore()` call site. Pricing (subtotal/
 * shipping/tax/total) is intentionally NOT part of the input: the API
 * always recomputes it from live product prices, never trusts a client-sent
 * total.
 */
export const useOrdersStore = create<OrdersState>()(() => ({
  placeOrder: async (input) => {
    const { order } = await api.post<{ order: Order }>("/orders/checkout", input);
    return order;
  },

  getOrder: async (orderNumber) => {
    try {
      const { order } = await api.get<{ order: Order }>(`/orders/${orderNumber}`);
      return order;
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  },

  getAllOrders: async () => {
    const { items } = await api.get<{ items: Order[] }>("/orders/mine");
    return items;
  },
}));
