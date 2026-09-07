"use client";

import { useEffect } from "react";
import { ErrorState, ErrorStatePresets } from "@/components/ui/empty-state";

export default function CustomerError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg px-5 py-24 sm:px-10">
      <ErrorState {...ErrorStatePresets.somethingWentWrong} onAction={reset} />
    </div>
  );
}
