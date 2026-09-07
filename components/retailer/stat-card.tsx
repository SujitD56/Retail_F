import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: string;
  icon: LucideIcon;
}) {
  const positive = change?.startsWith("+");
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-cream-300 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-700">{label}</p>
        <span className="flex size-8 items-center justify-center rounded-sm bg-primary-50 text-primary-600">
          <Icon className="size-4" />
        </span>
      </div>
      <div>
        <p className="font-display text-3xl text-ink-900">{value}</p>
        {change && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className={cn("rounded-sm px-1.5 py-0.5 font-semibold", positive ? "bg-success-50 text-success-500" : "bg-cream-200 text-ink-700")}>
              {change}
            </span>
            <span className="text-ink-500">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
