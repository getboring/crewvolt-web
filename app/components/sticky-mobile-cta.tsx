import { Phone } from "lucide-react";
import { Link, useLocation } from "react-router";

const HIDE_ON = new Set([
  "/staff-my-project",
  "/join-our-network",
  "/contact",
]);

const PHONE_TEL = "+1-423-555-0100";

export function StickyMobileCta() {
  const location = useLocation();
  if (HIDE_ON.has(location.pathname)) return null;

  return (
    <div className="cv-safe-pb md:hidden">
      {/* Spacer prevents content from sitting behind the fixed bar */}
      <div aria-hidden="true" className="h-16" />
      <div className="cv-safe-pb pointer-events-auto fixed bottom-0 left-0 right-0 z-40 grid grid-cols-[auto_1fr] border-t border-cv-border bg-white shadow-[0_-12px_32px_-16px_rgba(15,34,64,0.18)]">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex h-14 w-14 items-center justify-center border-r border-cv-border bg-white text-cv-navy"
          aria-label="Call CrewVolt"
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>
        <Link
          to="/staff-my-project"
          className="flex h-14 items-center justify-center bg-cv-navy text-sm font-semibold text-white transition-colors hover:bg-cv-copper"
        >
          Staff my project →
        </Link>
      </div>
    </div>
  );
}
