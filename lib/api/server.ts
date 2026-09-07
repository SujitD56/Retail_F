// Server-only fetch helper — used by `lib/data/*.ts` (Server Components,
// generateMetadata, generateStaticParams). Talks to the API directly (no
// same-origin rewrite needed; this never runs in the browser so there's no
// CORS/cookie-origin concern), forwarding whatever session cookie the
// incoming request carried so role-scoped/authenticated reads work.
import "server-only";
import { cookies } from "next/headers";
import { ApiError } from "./errors";

const API_BASE_URL = process.env.API_INTERNAL_URL ?? "http://localhost:4000/api/v1";

async function cookieHeader(): Promise<string> {
  try {
    const store = await cookies();
    return store.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  } catch {
    // No request context (e.g. called from generateStaticParams at build
    // time) — fall back to an anonymous request rather than failing the
    // build. Every generateStaticParams call in this app only reads public
    // data anyway.
    return "";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", Cookie: await cookieHeader(), ...init?.headers },
    // This is a dynamic marketplace — nothing here should be served from
    // Next's fetch cache by default. Individual callers can override with
    // their own `next: { revalidate }` via a raw fetch if a specific read
    // genuinely tolerates staleness.
    cache: "no-store",
  });

  if (res.status === 204) return undefined as T;

  const body = await res.json().catch(() => undefined);
  if (!res.ok) {
    throw new ApiError(res.status, body?.error?.message ?? res.statusText, body?.error?.code, body?.error?.details);
  }
  return body as T;
}

/** GET that resolves to `null` on 404 instead of throwing — matches the `getXBySlug(): Promise<X | null>` shape every lib/data/*.ts getter already uses. */
export async function apiGetOrNull<T>(path: string): Promise<T | null> {
  try {
    return await request<T>(path, { method: "GET" });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  return request<T>(path, { method: "GET" });
}
