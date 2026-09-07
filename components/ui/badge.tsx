import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        primary: "bg-primary-50 text-primary-600",
        gold: "bg-gold-50 text-gold-600",
        success: "bg-success-50 text-success-500",
        warning: "bg-warning-50 text-warning-500",
        danger: "bg-danger-50 text-danger-500",
        info: "bg-info-50 text-info-500",
        neutral: "bg-cream-100 text-ink-700 border border-cream-300",
        solid: "bg-primary-600 text-white",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
