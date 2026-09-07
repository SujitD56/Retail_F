"use client";

// A plain, JS-readable localStorage flag tracking "as far as the client
// last knew, a session existed" — separate from the actual session, which
// lives in httpOnly cookies this code can't see. Its only job is to let
// lib/api/client.ts decide whether attempting a silent token refresh on a
// 401 is worth trying: for a visitor who never logged in, skipping it
// avoids firing a guaranteed, console-noisy 400 ("no session to refresh")
// on every single anonymous page load; for a visitor whose access token
// merely expired, the marker survives (it's set at login, cleared at
// logout/failed-refresh) so the refresh attempt still happens and recovers
// the session transparently.
const KEY = "ilkal_session_active";

export function markSessionActive() {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    // Private browsing / storage disabled — refresh attempts just always
    // fire in that case, which is correct if a bit less optimized.
  }
}

export function markSessionCleared() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Ignore — see markSessionActive.
  }
}

export function hasActiveSessionMarker(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
