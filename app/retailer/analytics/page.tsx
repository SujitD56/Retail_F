"use client";

import { Calendar, DollarSign, Percent, ShoppingBag, TrendingUp } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { StatCard } from "@/components/retailer/stat-card";
import { StarRating } from "@/components/ui/star-rating";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiQuery } from "@/lib/hooks/use-api-query";
import { formatDate, formatINR } from "@/lib/utils";

interface DashboardStats { totalSales: number; orders: number; activeProducts: number; customers: number; avgRating: number }
interface TopProduct { name: string; revenue: number }
interface BestCollection { name: string; itemsSold: number; revenue: number }
interface RecentReview { author: string; date: string; rating: number; title: string; body: string }

export default function RetailerAnalyticsPage() {
  const { data: stats } = useApiQuery<DashboardStats>("/retailers/stats/dashboard");
  const { data: topProducts } = useApiQuery<{ items: TopProduct[] }>("/retailers/stats/top-products");
  const { data: bestCollections } = useApiQuery<{ items: BestCollection[] }>("/retailers/stats/best-collections");
  const { data: reviews } = useApiQuery<{ items: RecentReview[] }>("/retailers/stats/recent-reviews");

  const maxRevenue = Math.max(1, ...(topProducts?.items ?? []).map((p) => p.revenue));
  const avgOrderValue = stats && stats.orders > 0 ? Math.round(stats.totalSales / stats.orders) : 0;

  return (
    <RetailerShell title="Store Analytics" subtitle="Evaluate sales growth, best collections, and customer love.">
      <div className="mb-8 flex justify-end">
        <span className="flex items-center gap-2 rounded-sm border border-cream-300 bg-white px-4 py-2 text-sm text-ink-900">
          <Calendar className="size-3.5" /> All-time, computed live from your orders
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats ? (
          <>
            <StatCard label="Revenue" value={formatINR(stats.totalSales)} icon={TrendingUp} />
            <StatCard label="Orders" value={String(stats.orders)} icon={ShoppingBag} />
            <StatCard label="Active Products" value={String(stats.activeProducts)} icon={Percent} />
            <StatCard label="Avg Order Value" value={formatINR(avgOrderValue)} icon={DollarSign} />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Top Performing Sarees</p>
          <div className="mt-6 flex flex-col gap-5">
            {!topProducts ? (
              <Skeleton className="h-48 w-full" />
            ) : topProducts.items.length === 0 ? (
              <p className="text-sm text-ink-500">No sales yet.</p>
            ) : (
              topProducts.items.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-900">{p.name}</span>
                    <span className="font-semibold text-ink-900">{formatINR(p.revenue)}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cream-200">
                    <div className="h-full rounded-full bg-primary-600" style={{ width: `${(p.revenue / maxRevenue) * 100}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Best Collections Edit</p>
          <div className="mt-6 flex flex-col divide-y divide-cream-300">
            {!bestCollections ? (
              <Skeleton className="h-48 w-full" />
            ) : bestCollections.items.length === 0 ? (
              <p className="text-sm text-ink-500">No sales yet.</p>
            ) : (
              bestCollections.items.map((c) => (
                <div key={c.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-ink-900">{c.name}</p>
                    <p className="text-xs text-ink-500">{c.itemsSold} items sold</p>
                  </div>
                  <span className="text-sm font-semibold text-ink-900">{formatINR(c.revenue)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-cream-300 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="font-display text-xl text-ink-900">Recent Verified Buyer Reviews</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {!reviews ? (
            <Skeleton className="h-32 w-full" />
          ) : reviews.items.length === 0 ? (
            <p className="text-sm text-ink-500">No verified reviews yet.</p>
          ) : (
            reviews.items.map((r) => (
              <div key={r.author} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink-900">{r.author}</span>
                  <span className="text-xs text-ink-500">{formatDate(r.date)}</span>
                </div>
                <StarRating value={r.rating} size="xs" />
                {r.title && <p className="text-sm font-medium text-ink-900">{r.title}</p>}
                <p className="text-sm leading-relaxed text-ink-700">&ldquo;{r.body}&rdquo;</p>
              </div>
            ))
          )}
        </div>
      </div>
    </RetailerShell>
  );
}
