"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center rounded-sm border border-cream-300 bg-white", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex size-9 items-center justify-center text-ink-700 hover:bg-cream-100 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-ink-900">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex size-9 items-center justify-center text-ink-700 hover:bg-cream-100 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
