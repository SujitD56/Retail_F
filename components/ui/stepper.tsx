import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({
  steps,
  current,
  className,
}: {
  steps: string[];
  current: number;
  className?: string;
}) {
  return (
    <ol className={cn("flex w-full items-center", className)}>
      {steps.map((step, i) => {
        const stepNumber = i + 1;
        const isDone = stepNumber < current;
        const isCurrent = stepNumber === current;
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 text-sm font-semibold",
                  isDone && "border-primary-600 bg-primary-600 text-white",
                  isCurrent && "border-primary-600 text-primary-600",
                  !isDone && !isCurrent && "border-cream-300 text-ink-500",
                )}
              >
                {isDone ? <Check className="size-4" /> : stepNumber}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide",
                  isCurrent || isDone ? "text-ink-900" : "text-ink-500",
                )}
              >
                {step}
              </span>
            </div>
            {stepNumber < steps.length && (
              <div className={cn("mx-3 h-0.5 flex-1", isDone ? "bg-primary-600" : "bg-cream-300")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
