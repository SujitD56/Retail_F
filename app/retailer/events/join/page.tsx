"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { eventOverview } from "@/lib/data/retailer-events";

export default function RetailerJoinEventPage() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const e = eventOverview;

  return (
    <RetailerShell title="Events & Competitions">
      <Breadcrumbs items={[{ label: "Events", href: "/retailer/events" }, { label: e.title }]} />

      <div className="mt-6 overflow-hidden rounded-lg border border-cream-300 bg-white">
        <div className="relative h-[240px] w-full">
          <Image src="/images/customer/events-landing-hero.png" alt="" fill sizes="1100px" className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="p-8">
          <div>
            <p className="font-display text-3xl text-primary-600">{e.title}</p>
            <p className="mt-1 text-sm text-ink-500">{e.dateRange}</p>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-700">{e.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="font-display text-lg text-ink-900">Requirements</p>
              <ul className="mt-3 flex flex-col gap-2.5 text-sm text-ink-700">
                {e.requirements.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-lg text-ink-900">Rewards Summary</p>
              <ul className="mt-3 flex flex-col gap-2.5 text-sm text-ink-700">
                {e.rewards.map((r) => (
                  <li key={r.label}>
                    {r.medal} {r.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-cream-300 pt-6">
            <div className="flex items-center gap-2 rounded-md bg-success-50 p-4 text-sm text-success-500">
              <Check className="size-4 shrink-0" />
              You joined on {e.joinedOn}. You have {e.entriesSubmitted} entries submitted, {e.entriesRemaining} remaining.
            </div>

            <label className="mt-5 flex items-start gap-2.5 text-sm text-ink-700">
              <Checkbox className="mt-0.5" checked={agreed} onCheckedChange={() => setAgreed((v) => !v)} />
              I agree to the Event Terms &amp; Conditions and Weaver Co-op guidelines.
            </label>

            <Button size="lg" className="mt-5" onClick={() => router.push("/retailer/events/submit")}>
              Submit New Entry
            </Button>
          </div>
        </div>
      </div>
    </RetailerShell>
  );
}
