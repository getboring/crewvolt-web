import { useEffect, useState } from "react";

/**
 * Render children only after hydration completes. Useful to bypass
 * SSR/hydration mismatches for components whose initial render depends
 * on client-only state (location, media queries, mounted portals, etc.).
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
