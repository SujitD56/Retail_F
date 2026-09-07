"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

/** Fetches `path` on mount (and whenever `path` changes) via the browser API client. Returns `data: null` while loading — callers render a skeleton/loading state for that. */
export function useApiQuery<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(Boolean(path));

  useEffect(() => {
    // No path to fetch — `loading` already starts `false` in this case (see
    // the initializer above), so there's nothing to synchronize here.
    if (!path) return;
    let cancelled = false;
    // Standard "kick off a fetch on dependency change" effect (the same
    // shape React's own docs use for this) — resetting loading/error state
    // synchronously here, before the async call, is the point of the
    // effect, not the cascading-render anti-pattern this rule usually catches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    api
      .get<T>(path)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, error, loading };
}
