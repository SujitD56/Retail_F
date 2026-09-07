import Link from "next/link";
import type { Order } from "@/types";
import { StatusPill } from "@/components/ui/status-pill";
import { EmptyState, EmptyStatePresets } from "@/components/ui/empty-state";
import { formatDate, formatINR } from "@/lib/utils";

export function OrdersPanel({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <EmptyState {...EmptyStatePresets.noOrders} />;
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <h1 className="font-display text-3xl text-primary-600">Order History</h1>
      <div className="overflow-hidden rounded-lg border border-cream-300 bg-white">
        {orders.map((order, i) => (
          <div key={order.id} className={`flex flex-wrap items-center justify-between gap-4 p-5 ${i > 0 ? "border-t border-cream-300" : ""}`}>
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-ink-900">#{order.id}</span>
                <span className="text-ink-400">•</span>
                <span className="text-ink-500">{formatDate(order.placedAt)}</span>
                <StatusPill status={order.status} />
              </div>
              <p className="mt-1 text-sm text-ink-700">
                {order.items.length} item(s) — {formatINR(order.total)}
              </p>
            </div>
            <Link href={`/orders/${order.id}`} className="text-sm font-semibold text-primary-600">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
