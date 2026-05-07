import { Phone } from "lucide-react";
import { Link, useLocation } from "react-router";

const HIDE_ON = new Set([
  "/staff-my-project",
  "/join-our-network",
  "/contact",
]);

export function StickyMobileCta() {
  const location = useLocation();
  if (HIDE_ON.has(location.pathname)) return null;

  return (
    <div className="md:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-[68px]"
      />
      <div className="pointer-events-auto fixed bottom-0 left-0 right-0 z-40 grid grid-cols-[auto_1fr] border-t border-cv-pencil bg-cv-vellum-light shadow-[0_-12px_32px_-16px_rgba(26,26,26,0.18)]">
        <a
          href="tel:+1-423-555-0100"
          className="flex h-14 w-14 items-center justify-center border-r border-cv-pencil bg-cv-vellum-light text-cv-pencil"
          aria-label="Call CrewVolt"
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>
        <Link
          to="/staff-my-project"
          className="flex h-14 items-center justify-center gap-2 bg-cv-pencil cv-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cv-vellum"
        >
          <span
            className="cv-pulse-dot inline-block size-1.5 rounded-full bg-cv-copper"
            aria-hidden="true"
          />
          Staff a project →
        </Link>
      </div>
    </div>
  );
}
