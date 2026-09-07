import { cn } from "@/lib/utils";

/**
 * Status pill for order/retailer/product/event lifecycle states across the
 * Retailer and Admin portals (approved, pending, rejected, processing, ...).
 */
const STATUS_STYLES: Record<string, string> = {
  approved: "bg-success-50 text-success-500",
  active: "bg-success-50 text-success-500",
  completed: "bg-success-50 text-success-500",
  delivered: "bg-success-50 text-success-500",
  verified: "bg-success-50 text-success-500",
  live: "bg-success-50 text-success-500",
  paid: "bg-success-50 text-success-500",
  "voting open": "bg-success-50 text-success-500",

  pending: "bg-warning-50 text-warning-500",
  "under review": "bg-warning-50 text-warning-500",
  processing: "bg-warning-50 text-warning-500",
  "cod pending": "bg-warning-50 text-warning-500",
  cod: "bg-warning-50 text-warning-500",
  "low stock": "bg-warning-50 text-warning-500",
  new: "bg-warning-50 text-warning-500",
  shipped: "bg-info-50 text-info-500",
  "in transit": "bg-info-50 text-info-500",
  confirmed: "bg-info-50 text-info-500",
  draft: "bg-cream-200 text-ink-700",

  rejected: "bg-danger-50 text-danger-500",
  cancelled: "bg-danger-50 text-danger-500",
  suspended: "bg-danger-50 text-danger-500",
  "out of stock": "bg-danger-50 text-danger-500",
  failed: "bg-danger-50 text-danger-500",
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  const key = status.toLowerCase();
  const style = STATUS_STYLES[key] ?? "bg-cream-200 text-ink-700";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-semibold capitalize",
        style,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
