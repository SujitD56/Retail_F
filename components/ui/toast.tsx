"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { CheckCircle2, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error";
type ToastItem = { id: string; title: string; description?: string; variant: ToastVariant };
type ToastInput = { title: string; description?: string; variant?: ToastVariant };

const ToastCtx = React.createContext<{
  toast: (t: ToastInput) => void;
} | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((t: ToastInput) => {
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, { variant: "default", ...t, id }]);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={3500}>
        {children}
        {items.map((item) => (
          <ToastPrimitive.Root
            key={item.id}
            className={cn(
              "flex items-start gap-3 rounded-md border bg-white p-4 shadow-popover data-[state=open]:animate-fade-in",
              "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
              item.variant === "success" && "border-success-500/30",
              item.variant === "error" && "border-danger-500/30",
              item.variant === "default" && "border-cream-300",
            )}
            onOpenChange={(open) => {
              if (!open) setItems((prev) => prev.filter((i) => i.id !== item.id));
            }}
          >
            {item.variant === "success" && <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success-500" />}
            {item.variant === "error" && <XCircle className="mt-0.5 size-4 shrink-0 text-danger-500" />}
            <div className="flex-1">
              <ToastPrimitive.Title className="text-sm font-semibold text-ink-900">{item.title}</ToastPrimitive.Title>
              {item.description && (
                <ToastPrimitive.Description className="mt-0.5 text-xs text-ink-700">
                  {item.description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close className="text-ink-500 hover:text-ink-900">
              <X className="size-3.5" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[100] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastCtx.Provider>
  );
}
