"use client";

import Image from "next/image";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { Share2, TrendingUp } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { entryAnalytics } from "@/lib/data/retailer-events";

const ENGAGEMENT_COLORS = ["var(--color-primary-600)", "var(--color-gold-400)", "var(--color-info-500)"];

export default function RetailerEntryAnalyticsPage() {
  const a = entryAnalytics;
  const { toast } = useToast();

  return (
    <RetailerShell title="Entry Performance">
      <Breadcrumbs
        items={[
          { label: "Events", href: "/retailer/events" },
          { label: "Style Challenge 2026", href: "/retailer/events" },
          { label: a.entryTitle },
        ]}
      />

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-display text-3xl text-primary-600">{a.entryTitle}</p>
          <p className="text-sm text-ink-500">Performance Overview</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => toast({ title: "Link copied" })}>
            <Share2 className="size-4" /> Share Entry
          </Button>
          <Button onClick={() => toast({ title: "Entry boosted", description: "Your reel now has priority placement.", variant: "success" })}>
            <TrendingUp className="size-4" /> Boost Entry
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-5">
        {a.stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-cream-300 bg-white p-5">
            <p className="text-sm text-ink-700">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-ink-900">{s.value}</p>
            <p className="mt-2 text-xs text-ink-500">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Vote Trend (Last 7 Days)</p>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={a.voteTrend}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-ink-500)" }} axisLine={false} tickLine={false} />
                <Bar dataKey="value" fill="var(--color-primary-600)" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Engagement Ratio</p>
          <div className="mt-4 flex items-center gap-6">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={a.engagement} dataKey="percent" nameKey="label" innerRadius={30} outerRadius={55}>
                  {a.engagement.map((_, i) => (
                    <Cell key={i} fill={ENGAGEMENT_COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {a.engagement.map((e, i) => (
                <div key={e.label} className="flex items-center gap-2 text-sm">
                  <span className="size-2 rounded-full" style={{ backgroundColor: ENGAGEMENT_COLORS[i] }} />
                  <span className="text-ink-700">{e.label} ({e.percent}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-cream-300 bg-white p-6">
        <p className="font-display text-xl text-ink-900">Tagged Product Performance</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-6 rounded-md border border-cream-300 p-4">
          <div className="flex items-center gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
              <Image src={a.taggedProduct.image} alt={a.taggedProduct.name} fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-lg text-ink-900">{a.taggedProduct.name}</p>
              <p className="text-sm text-ink-500">{a.taggedProduct.price}</p>
            </div>
          </div>
          <div className="flex gap-8 text-sm">
            <Metric label="Views" value={a.taggedProduct.views} />
            <Metric label="Cart Adds" value={String(a.taggedProduct.cartAdds)} />
            <Metric label="Purchases" value={String(a.taggedProduct.purchases)} />
            <Metric label="Revenue" value={a.taggedProduct.revenue} />
          </div>
        </div>
      </div>
    </RetailerShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-ink-500">{label}</p>
      <p className="font-display text-lg text-ink-900">{value}</p>
    </div>
  );
}
