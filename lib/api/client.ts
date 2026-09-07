"use client";

// Browser-side fetch helper — used by client components and the Zustand
// stores (cart, wishlist, auth, votes). Always calls the same-origin
// `/api/backend/*` path, which next.config.ts rewrites to the real API —
// this keeps the browser's session cookies same-site with zero CORS setup,
// in both dev (different ports) and prod (same domain, reverse-proxied).
import { ApiError } from "./errors";
import { hasActiveSessionMarker, markSessionCleared } from "./session-marker";

// Access tokens are short-lived (15m) by design; the refresh token (7d) is
// what's supposed to carry a session past that transparently. Without this,
// every authenticated call just starts 401ing ~15 minutes after login even
// though the user never signed out — which looks exactly like "the backend
// stopped working." A single in-flight refresh is shared across whatever
// requests hit the expired token at once, so a page with several
// simultaneous calls doesn't fire several concurrent refreshes.
let refreshPromise: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  // Skip the round-trip (and the guaranteed 400 it'd get, "no session to
  // refresh") when nothing suggests a session ever existed on this browser
  // — the overwhelming majority of 401s are just anonymous visitors hitting
  // an auth-gated endpoint, not an expired session to recover.
  if (!hasActiveSessionMarker()) return false;

  if (!refreshPromise) {
    refreshPromise = fetch("/api/backend/auth/refresh", { method: "POST", credentials: "include" })
      .then((res) => {
        if (!res.ok) markSessionCleared();
        return res.ok;
      })
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function rawRequest(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`/api/backend${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    credentials: "include",
  });
}

const AUTH_ENDPOINTS_EXEMPT_FROM_REFRESH = ["/auth/login", "/auth/retailer/login", "/auth/admin/login", "/auth/signup", "/auth/refresh", "/auth/logout"];

async function request<T>(path: string, init?: RequestInit, isRetry = false): Promise<T> {
  const res = await rawRequest(path, init);

  if (res.status === 401 && !isRetry && !AUTH_ENDPOINTS_EXEMPT_FROM_REFRESH.some((p) => path.startsWith(p))) {
    const refreshed = await refreshSession();
    if (refreshed) return request<T>(path, init, true);
  }

  if (res.status === 204) return undefined as T;

  const body = await res.json().catch(() => undefined);
  if (!res.ok) {
    throw new ApiError(res.status, body?.error?.message ?? res.statusText, body?.error?.code, body?.error?.details);
  }
  return body as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, data?: unknown) => request<T>(path, { method: "POST", body: data !== undefined ? JSON.stringify(data) : undefined }),
  put: <T>(path: string, data?: unknown) => request<T>(path, { method: "PUT", body: data !== undefined ? JSON.stringify(data) : undefined }),
  patch: <T>(path: string, data?: unknown) => request<T>(path, { method: "PATCH", body: data !== undefined ? JSON.stringify(data) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

export { ApiError };
