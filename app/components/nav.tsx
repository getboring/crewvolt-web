import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/industries", label: "Industries" },
  { to: "/why-crewvolt", label: "Why CrewVolt" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) =>
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 border-b border-cv-border bg-white/95 backdrop-blur cv-safe-pt cv-safe-px supports-[backdrop-filter]:bg-white/80"
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          to="/"
          viewTransition
          className="font-logo text-[20px] font-bold tracking-[1.5px] text-cv-navy transition-colors hover:text-cv-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-copper focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          CREWVOLT
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.to);

            return (
              <Link
                key={link.to}
                to={link.to}
                viewTransition
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-10 items-center px-1 text-[13px] font-medium transition-colors",
                  "after:absolute after:bottom-1 after:left-0 after:right-0 after:mx-auto after:h-[2px] after:w-0 after:bg-cv-copper after:transition-[width,opacity] after:duration-200",
                  active
                    ? "text-cv-navy after:w-6 after:opacity-100"
                    : "text-cv-steel hover:text-cv-navy hover:after:w-3 hover:after:opacity-60",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <span aria-hidden="true" className="ml-2 h-5 w-px bg-cv-border" />

          <a
            href="tel:+1-423-555-0100"
            className="hidden items-center gap-1.5 text-[13px] font-medium text-cv-steel transition-colors hover:text-cv-copper lg:inline-flex"
            aria-label="Call CrewVolt"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            (423) 555-0100
          </a>

          <Button asChild variant="secondary" size="sm">
            <Link to="/join-our-network">Join network</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/staff-my-project">Staff my project</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="size-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[92vw] border-cv-border bg-white px-6 py-6 sm:max-w-sm"
            >
              <SheetHeader className="mb-6 border-b border-cv-border pb-4">
                <SheetTitle className="text-left font-logo text-xl tracking-[1.5px] text-cv-navy">
                  CREWVOLT
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile primary" className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.to);
                  return (
                    <SheetClose asChild key={link.to}>
                      <Link
                        to={link.to}
                        viewTransition
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "inline-flex min-h-12 items-center rounded-md border-l-2 px-3 text-sm font-medium transition-colors",
                          active
                            ? "border-cv-copper bg-cv-cream text-cv-navy"
                            : "border-transparent text-cv-steel hover:border-cv-copper/50 hover:bg-cv-cream hover:text-cv-navy",
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="mt-6 grid gap-3">
                <SheetClose asChild>
                  <Button asChild size="lg">
                    <Link to="/staff-my-project">I need to staff a project</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="secondary" size="lg">
                    <Link to="/join-our-network">I am looking for work</Link>
                  </Button>
                </SheetClose>
              </div>

              <div className="mt-8 space-y-1.5 text-xs text-cv-steel">
                <a
                  href="tel:+1-423-555-0100"
                  className="flex items-center gap-2 text-cv-copper hover:text-cv-copper-dark"
                >
                  <Phone className="size-3.5" aria-hidden="true" />
                  +1 (423) 555-0100
                </a>
                <a
                  href="mailto:staffing@crewvolt.com"
                  className="block text-cv-copper hover:text-cv-copper-dark"
                >
                  staffing@crewvolt.com
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
