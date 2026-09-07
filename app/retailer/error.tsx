"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RetailerError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-cream-100 px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-danger-50 text-danger-500">
        <AlertTriangle className="size-7" strokeWidth={1.75} />
      </span>
      <div>
        <p className="font-display text-3xl text-ink-900">Something went wrong</p>
        <p className="mt-1.5 max-w-sm text-sm text-ink-700">We hit an unexpected error loading this page.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button asChild variant="secondary">
          <Link href="/retailer/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
