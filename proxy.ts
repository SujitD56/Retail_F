import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Next.js 16 renamed `middleware.ts` -> `proxy.ts` (nodejs-only runtime,
// exported fn renamed to `proxy`). See node_modules/next/dist/docs
// /01-app/02-guides/upgrading/version-16.md#middleware-to-proxy.
//
// Real role gating: verifies the same JWT access token the (separate,
// standalone) API repo issues as the httpOnly `ilkal_at` cookie — no
// network round-trip needed for the common case, just a signature check
// with the shared JWT_ACCESS_SECRET (must match that repo's .env
// byte-for-byte). This only decides whether to redirect; the API
// independently re-verifies and enforces the token on every request it
// receives, so a forged/expired token can't grant real access even if it
// slipped past this check.
//
// Access tokens are short-lived (15m) on purpose. Without the refresh step
// below, navigating to a protected page after being idle that long would
// bounce a still-validly-signed-in user (refresh tokens last 7 days) to the
// login screen for no real reason — so when the access token is missing or
// expired but a refresh token is present, this calls the API's own
// /auth/refresh once and forwards its Set-Cookie response, exactly what the
// browser would have gotten from an XHR-level 401 retry.

const ACCESS_TOKEN_COOKIE = "ilkal_at";
const REFRESH_TOKEN_COOKIE = "ilkal_rt";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const API_INTERNAL_URL = process.env.API_INTERNAL_URL ?? "http://localhost:4000/api/v1";

const RETAILER_PUBLIC_PATHS = ["/retailer/login", "/retailer/forgot-password", "/retailer/register", "/retailer/join"];
const ADMIN_PUBLIC_PATHS = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
  "/admin/mfa",
  "/admin/session-expired",
];

async function roleFromToken(token: string | undefined): Promise<string | null> {
  if (!token || !JWT_ACCESS_SECRET) return null;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_ACCESS_SECRET));
    const role = payload.role;
    return typeof role === "string" ? role.toLowerCase() : null;
  } catch {
    // Expired, malformed, or wrong-secret token — fall through to the
    // refresh attempt below rather than erroring.
    return null;
  }
}

/** Best-effort silent refresh using the httpOnly refresh cookie. Returns the resulting role (if any) and the Set-Cookie headers to relay to the browser. */
async function tryRefresh(request: NextRequest): Promise<{ role: string | null; setCookies: string[] }> {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) return { role: null, setCookies: [] };

  try {
    const res = await fetch(`${API_INTERNAL_URL}/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}` },
    });
    if (!res.ok) return { role: null, setCookies: [] };

    const setCookies = res.headers.getSetCookie?.() ?? [];
    const newAccessToken = setCookies
      .find((c) => c.startsWith(`${ACCESS_TOKEN_COOKIE}=`))
      ?.split(";")[0]
      ?.slice(ACCESS_TOKEN_COOKIE.length + 1);

    return { role: await roleFromToken(newAccessToken), setCookies };
  } catch {
    // API unreachable — fail open to "not authenticated" rather than 500ing
    // every protected navigation.
    return { role: null, setCookies: [] };
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsRetailerAuth = pathname.startsWith("/retailer") && !RETAILER_PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const needsAdminAuth = pathname.startsWith("/admin") && !ADMIN_PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  let role = await roleFromToken(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);
  let refreshedCookies: string[] = [];

  if (!role && (needsRetailerAuth || needsAdminAuth)) {
    const refreshed = await tryRefresh(request);
    role = refreshed.role;
    refreshedCookies = refreshed.setCookies;
  }

  if (needsRetailerAuth && role !== "retailer") {
    const url = request.nextUrl.clone();
    url.pathname = "/retailer/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (needsAdminAuth && role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  for (const cookie of refreshedCookies) response.headers.append("Set-Cookie", cookie);
  return response;
}

export const config = {
  matcher: ["/retailer/:path*", "/admin/:path*"],
};
