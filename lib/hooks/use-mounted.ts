import { useEffect, useState } from "react";

/**
 * Returns true only after the client has mounted. Used to gate rendering of
 * persisted Zustand store values (cart/wishlist counts, auth state, vote
 * state) whose server-rendered value (always empty) would otherwise mismatch
 * the client's rehydrated value and trigger a hydration warning.
 *
 * This is the one standard, intentional exception to the
 * react-hooks/set-state-in-effect rule: the effect exists specifically to
 * defer to a second client-only render, which is the rule's own recommended
 * pattern for this exact SSR/hydration-guard case.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration guard, see doc comment above
  useEffect(() => setMounted(true), []);
  return mounted;
}
