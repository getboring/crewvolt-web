import { Link } from "react-router";

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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cv-navy-dark">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-logo text-lg font-bold tracking-[1.5px] text-white">CREWVOLT</p>
          <p className="mt-3 text-sm cv-dark-text-muted">Energy infrastructure staffing</p>
          <p className="mt-1 text-xs cv-dark-text-hint">Tennessee LLC</p>
          <a
            href="mailto:staffing@crewvolt.com"
            className="mt-3 block text-sm cv-dark-text-secondary transition-colors hover:text-white"
          >
            staffing@crewvolt.com
          </a>
          <a
            href="https://www.linkedin.com/company/crewvolt"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-sm cv-dark-text-secondary transition-colors hover:text-white"
          >
            LinkedIn
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[1px] uppercase cv-dark-text-muted">Company</p>
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
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-8">
          <p className="text-xs cv-dark-text-hint">&copy; {currentYear} CrewVolt. All rights reserved.</p>
          <p className="text-xs cv-dark-text-hint">East Tennessee</p>
        </div>
      </div>
    </footer>
  );
}
