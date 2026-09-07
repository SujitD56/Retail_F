"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth";

/**
 * Revalidates the persisted `user` against the real server session once per
 * app load. The httpOnly `ilkal_at`/`ilkal_rt` cookies are the actual source
 * of truth; localStorage is just a cache for instant UI on reload, which can
 * go stale (token expired, logged out elsewhere) — this reconciles it.
 */
export function AuthHydrator() {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
