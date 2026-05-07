import { useEffect, useState } from "react";

import { Toaster } from "~/components/ui/sonner";

/**
 * Sonner's Toaster sometimes renders containers/IDs that differ between
 * SSR and client hydration. Mount it client-only to avoid React #418.
 */
export function ClientToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toaster
      position="bottom-center"
      richColors
      offset={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)" }}
      mobileOffset={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)" }}
    />
  );
}
