"use client";

import {
  Award,
  Crown,
  Film,
  Heart,
  Play,
  Share2,
  ShoppingBag,
  Star,
  ThumbsUp,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { achievementBadges } from "@/lib/data/retailer-events";

const ICONS: Record<string, LucideIcon> = {
  trophy: Trophy,
  star: Star,
  film: Film,
  heart: Heart,
  "trending-up": TrendingUp,
  play: Play,
  "thumbs-up": ThumbsUp,
  "shopping-bag": ShoppingBag,
  award: Award,
  crown: Crown,
};

export default function RetailerAchievementsPage() {
  const { toast } = useToast();

  return (
    <RetailerShell title="Your Achievements">
      <div className="mb-8">
        <p className="font-display text-2xl text-ink-900">Accredited Handloom Milestones</p>
        <p className="mt-1 text-sm text-ink-700">
          You&apos;ve earned {achievementBadges.length} badges across 4 historic Karnataka events. Outstanding weaver co-op advocacy.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {achievementBadges.map((b) => {
          const Icon = ICONS[b.icon] ?? Award;
          return (
            <div key={b.title} className="flex flex-col items-center gap-3 rounded-lg border border-cream-300 bg-white p-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                <Icon className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{b.title}</p>
                <p className="mt-1 text-xs text-ink-500">{b.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-cream-300 bg-white p-6">
        <div>
          <p className="font-display text-xl text-ink-900">Share Your Weaver Achievements</p>
          <p className="mt-1 text-sm text-ink-700">Showcase your handloom awards directly to your retail customers on Instagram &amp; Facebook.</p>
        </div>
        <Button onClick={() => toast({ title: "Share sheet opened" })}>
          <Share2 className="size-4" /> Share on Social Media
        </Button>
      </div>
    </RetailerShell>
  );
}
