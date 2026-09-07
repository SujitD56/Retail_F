"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { Calendar, Download } from "lucide-react";
import { AdminShell } from "@/components/admin/shell";
import { Button } from "@/components/ui/button";
import {
  commerceImpact,
  eventAnalyticsKpis,
  engagementFunnel,
  retailerParticipation,
  topPerformingEntries,
  votingTrend,
} from "@/lib/data/admin-events";

const MAX_ENTRY_VOTES = Math.max(...topPerformingEntries.map((e) => e.votes));

export default function AdminEventAnalyticsPage() {
  return (
    <AdminShell title="Event Analytics" subtitle="Ilkal Style Challenge 2026 Overview">
      <div className="mb-6 flex justify-end gap-3">
        <Button variant="secondary">
          <Calendar className="size-3.5" /> Aug 15 - Sep 12, 2026
        </Button>
        <Button variant="secondary">
          <Download className="size-3.5" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {eventAnalyticsKpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-cream-300 bg-white p-5">
            <p className="text-xs text-ink-500">{k.label}</p>
            <p className="mt-2 font-display text-2xl text-ink-900">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl text-ink-900">Voting Trends (Votes / Day)</p>
            <span className="text-xs text-ink-500">Event Duration (28 Days)</span>
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={votingTrend}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-ink-500)" }} axisLine={false} tickLine={false} />
                <Bar dataKey="votes" fill="var(--color-primary-600)" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Top Performing Entries</p>
          <div className="mt-5 flex flex-col gap-4">
            {topPerformingEntries.map((e) => (
              <div key={e.title}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-900">{e.title}</span>
                  <span className="text-ink-500">{e.votes.toLocaleString("en-IN")} votes</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-pill bg-cream-200">
                  <div className="h-full rounded-pill bg-gold-400" style={{ width: `${(e.votes / MAX_ENTRY_VOTES) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Style Challenge Engagement Funnel</p>
          <div className="mt-5 flex flex-col gap-3">
            {engagementFunnel.map((f) => (
              <div key={f.step} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-sm text-ink-700">{f.step}</span>
                <div className="flex h-6 flex-1 items-center rounded-sm bg-cream-100">
                  <div className="h-full rounded-sm bg-primary-600" style={{ width: `${Math.max(f.percent, 2)}%` }} />
                  <span className="ml-2.5 whitespace-nowrap text-[11px] font-semibold text-ink-900">{f.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Commerce Impact from Challenge</p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {commerceImpact.map((c) => (
              <div key={c.label} className="rounded-md border border-cream-300 p-4">
                <p className="text-sm text-ink-700">{c.label}</p>
                <p className="mt-2 font-display text-2xl text-ink-900">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-cream-300 bg-white p-6">
        <p className="font-display text-xl text-ink-900">Accredited Retailer Participation</p>
        <div className="mt-4 overflow-x-auto rounded-md border border-cream-300">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-cream-300 bg-cream-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-700">
                <th className="px-4 py-3">Retailer Name</th>
                <th className="px-4 py-3">Submitted Entries</th>
                <th className="px-4 py-3">Total Votes Secured</th>
                <th className="px-4 py-3">Accreditation ID</th>
                <th className="px-4 py-3">Region</th>
              </tr>
            </thead>
            <tbody>
              {retailerParticipation.map((r) => (
                <tr key={r.name} className="border-b border-cream-300 last:border-0">
                  <td className="px-4 py-3.5 font-medium text-ink-900">{r.name}</td>
                  <td className="px-4 py-3.5">{r.entries}</td>
                  <td className="px-4 py-3.5">{r.votes}</td>
                  <td className="px-4 py-3.5 text-ink-500">{r.accreditationId}</td>
                  <td className="px-4 py-3.5">{r.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
