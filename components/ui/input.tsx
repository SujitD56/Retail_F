import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, trailing, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 flex size-4 items-center justify-center text-ink-500">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "h-[42px] w-full rounded-sm border border-cream-300 bg-cream-100 px-4 text-sm text-ink-900 placeholder:text-ink-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-600/30 focus:border-primary-500",
              icon && "pl-10",
              trailing && "pr-10",
              error && "border-danger-500 focus:ring-danger-500/30",
              className,
            )}
            {...props}
          />
          {trailing && (
            <span className="absolute right-3.5 flex items-center text-ink-500">{trailing}</span>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-danger-500">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }
>(({ className, error, ...props }, ref) => (
  <div className="w-full">
    <textarea
      ref={ref}
      className={cn(
        "min-h-[100px] w-full rounded-sm border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500",
        "focus:outline-none focus:ring-2 focus:ring-primary-600/30 focus:border-primary-500",
        error && "border-danger-500 focus:ring-danger-500/30",
        className,
      )}
      {...props}
    />
    {error && <p className="mt-1.5 text-xs text-danger-500">{error}</p>}
  </div>
));
Textarea.displayName = "Textarea";

export function Label({ className, required, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn("mb-2 block text-[13px] font-semibold text-ink-900", className)} {...props}>
      {props.children}
      {required && <span className="ml-0.5 text-primary-600">*</span>}
    </label>
  );
}
