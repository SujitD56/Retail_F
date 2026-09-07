"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, Film, Medal, Trophy, TrendingUp, Vote } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { StatCard } from "@/components/retailer/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { liveChallenge, pastPerformance, retailerEventStats, upcomingRetailerEvent } from "@/lib/data/retailer-events";

export default function RetailerEventsDashboardPage() {
  const s = retailerEventStats;

  return (
    <RetailerShell title="Events & Competitions">
      <div className="mb-6 flex justify-end">
        <Button asChild>
          <Link href="/retailer/events/join">Join an Event</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <StatCard label="Active Events" value={String(s.activeEvents)} icon={TrendingUp} />
        <StatCard label="Total Entries" value={String(s.totalEntries)} icon={Film} />
        <StatCard label="Total Votes" value={s.totalVotes.toLocaleString("en-IN")} change="+12%" icon={Vote} />
        <StatCard label="Best Rank" value={s.bestRank} icon={Medal} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-3 font-display text-2xl text-ink-900">Live Challenge</p>
            <div className="flex gap-6 rounded-lg border border-cream-300 bg-white p-6">
              <div className="relative h-[120px] w-[180px] shrink-0 overflow-hidden rounded-md">
                <Image src={liveChallenge.image} alt="" fill sizes="180px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Badge variant="success">Voting Open</Badge>
                  <span className="text-xs text-ink-500">{liveChallenge.endsIn}</span>
                </div>
                <p className="font-display text-xl text-ink-900">{liveChallenge.title}</p>
                <p className="text-sm text-ink-700">
                  Your entries: {liveChallenge.entries} • Best performing: {liveChallenge.bestPerforming}
                </p>
                <div className="mt-1 flex gap-5 text-sm font-semibold text-primary-600">
                  <Link href="/retailer/events/analytics">View Entries →</Link>
                  <Link href="/retailer/events/submit">Submit New Entry →</Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 font-display text-2xl text-ink-900">Upcoming Events</p>
            <div className="flex items-center justify-between rounded-lg border border-cream-300 bg-white p-5">
              <div>
                <p className="font-display text-lg text-ink-900">{upcomingRetailerEvent.title}</p>
                <p className="text-sm text-ink-500">{upcomingRetailerEvent.detail}</p>
              </div>
              <Button variant="secondary" size="sm">Set Reminder</Button>
            </div>
          </div>

          <div>
            <p className="mb-3 font-display text-2xl text-ink-900">Past Performance</p>
            <div className="overflow-hidden rounded-lg border border-cream-300 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-300 bg-cream-100 text-left text-xs uppercase text-ink-500">
                    <th className="px-4 py-3 font-medium">Event Name</th>
                    <th className="px-4 py-3 font-medium">Entries</th>
                    <th className="px-4 py-3 font-medium">Best Rank</th>
                    <th className="px-4 py-3 font-medium">Votes</th>
                    <th className="px-4 py-3 font-medium">Prize Won</th>
                  </tr>
                </thead>
                <tbody>
                  {pastPerformance.map((row) => (
                    <tr key={row.event} className="border-b border-cream-300 last:border-0">
                      <td className="px-4 py-3 font-medium text-ink-900">{row.event}</td>
                      <td className="px-4 py-3 text-ink-700">{row.entries}</td>
                      <td className="px-4 py-3 text-ink-700">{row.bestRank}</td>
                      <td className="px-4 py-3 text-ink-700">{row.votes}</td>
                      <td className="px-4 py-3 text-ink-700">{row.prize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-cream-300 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl text-ink-900">Recent Achievements</p>
            <Link href="/retailer/events/achievements" className="text-sm font-semibold text-primary-600">
              View All
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <AchievementRow icon={Trophy} title="1x Winner" subtitle="Bridal Edit 2025" />
            <AchievementRow icon={Award} title="Top 5 Finalist" subtitle="Style Challenge 2025" />
            <AchievementRow icon={Film} title="10+ Reels" subtitle="Prolific Content Creator" />
          </div>
        </div>
      </div>
    </RetailerShell>
  );
}

function AchievementRow({ icon: Icon, title, subtitle }: { icon: typeof Trophy; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        <p className="text-xs text-ink-500">{subtitle}</p>
      </div>
    </div>
  );
}
