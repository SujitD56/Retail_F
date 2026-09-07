import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PriceTag({
  price,
  compareAt,
  size = "md",
  className,
}: {
  price: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const priceSize = { sm: "text-sm", md: "text-lg", lg: "text-2xl" }[size];
  const compareSize = { sm: "text-[11px]", md: "text-xs", lg: "text-sm" }[size];
  const discount = compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : null;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn(priceSize, "font-bold text-ink-900")}>{formatINR(price)}</span>
      {compareAt && compareAt > price && (
        <span className={cn(compareSize, "text-ink-500 line-through")}>{formatINR(compareAt)}</span>
      )}
      {discount && (
        <span className={cn(compareSize, "font-semibold text-success-500")}>
          You save {discount}%
        </span>
      )}
    </div>
  );
}
