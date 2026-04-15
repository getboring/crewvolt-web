import { Link } from "react-router";

const companyLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
] as const;

const workLinks = [
  { to: "/staff-my-project", label: "Staff my project" },
  { to: "/join-our-network", label: "Join our network" },
  { to: "/why-crewvolt", label: "Why CrewVolt" },
] as const;

export function Footer() {
  return (
    <footer className="bg-cv-navy-dark">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-logo text-lg font-bold tracking-[1.5px] text-white">CREWVOLT</p>
          <p className="mt-3 text-sm cv-dark-text-muted">Energy infrastructure staffing</p>
          <p className="mt-1 text-xs cv-dark-text-hint">Tennessee LLC</p>
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
    </footer>
  );
}
