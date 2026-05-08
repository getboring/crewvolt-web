import { Phone } from "lucide-react";
import { Link, useRouteLoaderData } from "react-router";

const companyLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/industries", label: "Industries" },
  { to: "/vendor-readiness", label: "Vendor readiness" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

const workLinks = [
  { to: "/staff-my-project", label: "Staff my project" },
  { to: "/join-our-network", label: "Join our network" },
  { to: "/why-crewvolt", label: "Why CrewVolt" },
] as const;

const PHONE_DISPLAY = "+1 (423) 555-0100";
const PHONE_TEL = "+1-423-555-0100";

type RootData = { serverDate?: string; serverDateLabel?: string };

export function Footer() {
  const rootData = useRouteLoaderData<RootData>("root");
  // Year computed from the server-formatted label (last 4 chars) so we
  // never hit a TZ-driven hydration mismatch around year boundaries.
  const lastRevised = rootData?.serverDateLabel ?? null;
  const currentYear = lastRevised
    ? lastRevised.slice(-4)
    : new Date().getUTCFullYear();

  return (
    <footer
      className="bg-cv-navy-dark"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-logo text-lg font-bold tracking-[1.5px] text-white">
            CREWVOLT
          </p>
          <p className="mt-3 text-sm cv-dark-text-muted">
            Energy infrastructure staffing
          </p>
          <p className="mt-1 text-xs cv-dark-text-hint">Tennessee LLC</p>

          <div className="mt-5 flex flex-col gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 text-sm cv-dark-text-secondary transition-colors hover:text-white"
            >
              <Phone className="size-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <a
              href="mailto:staffing@crewvolt.com"
              className="inline-block text-sm cv-dark-text-secondary transition-colors hover:text-white"
            >
              staffing@crewvolt.com
            </a>
            <a
              href="https://www.linkedin.com/company/crewvolt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm cv-dark-text-secondary transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[1px] uppercase cv-dark-text-muted">
            Company
          </p>
          <ul className="mt-4 space-y-2">
            {companyLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm cv-dark-text-secondary transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[1px] uppercase cv-dark-text-muted">
            Work with us
          </p>
          <ul className="mt-4 space-y-2">
            {workLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm cv-dark-text-secondary transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t cv-dark-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-y-2 px-6 py-4 md:px-8">
          <p className="text-xs cv-dark-text-hint">
            &copy; {currentYear} CrewVolt. All rights reserved.
          </p>
          <p className="text-xs cv-dark-text-hint">
            <span className="cv-dark-text-muted">East Tennessee</span>
            {lastRevised ? (
              <>
                <span aria-hidden="true" className="mx-2">
                  ·
                </span>
                <span>
                  Last revised{" "}
                  <time dateTime={rootData?.serverDate} className="tabular-nums">
                    {lastRevised}
                  </time>
                </span>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </footer>
  );
}
