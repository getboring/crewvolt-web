import { Link } from "react-router";

import { ISSUE_DATE, PROJECT_NUMBER } from "~/lib/sheets";

const sheets = [
  { to: "/", number: "E-001", label: "Cover" },
  { to: "/about", number: "E-002", label: "Project Brief" },
  { to: "/services", number: "E-003", label: "Scope of Work" },
  { to: "/how-it-works", number: "E-004", label: "Sequence" },
  { to: "/industries", number: "E-005", label: "Site Conditions" },
  { to: "/why-crewvolt", number: "E-006", label: "Specification" },
] as const;

const intake = [
  { to: "/staff-my-project", number: "E-007", label: "Staff a Project" },
  { to: "/join-our-network", number: "E-008", label: "Join Network" },
  { to: "/contact", number: "E-009", label: "Contact / RFI" },
  { to: "/vendor-readiness", number: "E-010", label: "Vendor Qualification" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cv-pencil text-cv-vellum">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div>
            <p className="font-logo text-[24px] font-bold tracking-[0.18em] cv-dark-text-primary">
              CREWVOLT
            </p>
            <p className="cv-mono mt-2 text-[10px] uppercase tracking-[0.22em] cv-dark-text-muted">
              W-2 contract staffing — energy infrastructure
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed cv-dark-text-secondary">
              The right people on the right project. Substations, wind, solar, BESS,
              transmission. Tennessee LLC, working nationally.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
              <div>
                <p className="cv-mono text-[10px] uppercase tracking-[0.22em] cv-dark-text-muted">
                  Email
                </p>
                <a
                  href="mailto:staffing@crewvolt.com"
                  className="mt-1 inline-block text-sm cv-dark-text-secondary hover:cv-dark-text-primary"
                >
                  staffing@crewvolt.com
                </a>
              </div>
              <div>
                <p className="cv-mono text-[10px] uppercase tracking-[0.22em] cv-dark-text-muted">
                  Phone
                </p>
                <a
                  href="tel:+1-423-555-0100"
                  className="mt-1 inline-block text-sm cv-dark-text-secondary hover:cv-dark-text-primary"
                >
                  +1 (423) 555-0100
                </a>
              </div>
              <div>
                <p className="cv-mono text-[10px] uppercase tracking-[0.22em] cv-dark-text-muted">
                  Region
                </p>
                <p className="mt-1 text-sm cv-dark-text-secondary">East Tennessee</p>
              </div>
              <div>
                <p className="cv-mono text-[10px] uppercase tracking-[0.22em] cv-dark-text-muted">
                  Linkedin
                </p>
                <a
                  href="https://www.linkedin.com/company/crewvolt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm cv-dark-text-secondary hover:cv-dark-text-primary"
                >
                  /company/crewvolt
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="cv-mono text-[10px] uppercase tracking-[0.22em] cv-dark-text-muted">
              Drawing Set
            </p>
            <ul className="mt-4 space-y-2">
              {sheets.map((s) => (
                <li key={s.to} className="flex gap-3 text-sm">
                  <span className="cv-mono w-[44px] uppercase tracking-[0.16em] cv-dark-text-hint">
                    {s.number}
                  </span>
                  <Link
                    to={s.to}
                    className="cv-dark-text-secondary transition-colors hover:cv-dark-text-primary"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="cv-mono text-[10px] uppercase tracking-[0.22em] cv-dark-text-muted">
              Intake
            </p>
            <ul className="mt-4 space-y-2">
              {intake.map((s) => (
                <li key={s.to} className="flex gap-3 text-sm">
                  <span className="cv-mono w-[44px] uppercase tracking-[0.16em] cv-dark-text-hint">
                    {s.number}
                  </span>
                  <Link
                    to={s.to}
                    className="cv-dark-text-secondary transition-colors hover:cv-dark-text-primary"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Title block strip */}
      <div className="border-t border-cv-dark-border">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-3 px-5 py-3 text-[10px] cv-mono uppercase tracking-[0.22em] cv-dark-text-muted md:grid-cols-5 md:px-8">
          <div>
            <p className="cv-dark-text-hint">Project</p>
            <p className="cv-dark-text-secondary">{PROJECT_NUMBER}</p>
          </div>
          <div>
            <p className="cv-dark-text-hint">Issue</p>
            <p className="cv-dark-text-secondary">{ISSUE_DATE}</p>
          </div>
          <div>
            <p className="cv-dark-text-hint">Status</p>
            <p className="cv-dark-text-secondary">
              <span
                className="cv-pulse-dot mr-2 inline-block size-1.5 rounded-full bg-cv-copper align-middle"
                aria-hidden="true"
              />
              Ops · Online
            </p>
          </div>
          <div>
            <p className="cv-dark-text-hint">Drawn by</p>
            <p className="cv-dark-text-secondary">CrewVolt LLC</p>
          </div>
          <div>
            <p className="cv-dark-text-hint">Copyright</p>
            <p className="cv-dark-text-secondary">© {currentYear}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
