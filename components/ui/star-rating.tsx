import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  count,
  size = "sm",
  className,
}: {
  value: number;
  count?: number;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const dims = { xs: "size-3", sm: "size-3.5", md: "size-4" }[size];
  const textSize = { xs: "text-[11px]", sm: "text-xs", md: "text-sm" }[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              className={cn(dims, filled ? "fill-gold-400 text-gold-400" : "fill-cream-300 text-cream-300")}
            />
          );
        })}
      </div>
      <span className={cn(textSize, "font-semibold text-ink-900")}>{value.toFixed(1)}</span>
      {typeof count === "number" && (
        <span className={cn(textSize, "text-ink-500")}>({count.toLocaleString("en-IN")})</span>
      )}
    </div>
  );
}
