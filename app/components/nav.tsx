import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

import { NorthArrow } from "~/components/north-arrow";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { sheetForPath } from "~/lib/sheets";
import { cn } from "~/lib/utils";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "Process" },
  { to: "/industries", label: "Industries" },
  { to: "/why-crewvolt", label: "Spec" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const sheet = sheetForPath(location.pathname);

  // Subtle rotation per route (gimmick, but memorable). Uses sheet number hash.
  const rotation = (sheet.number.charCodeAt(sheet.number.length - 1) % 9) * 5;

  return (
    <nav className="sticky top-0 z-50 border-b border-cv-rule-soft bg-cv-vellum/92 backdrop-blur-sm">
      <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 text-cv-pencil transition-colors hover:text-cv-copper"
        >
          <span className="font-logo text-[20px] font-bold tracking-[0.18em]">CREWVOLT</span>
          <span
            className="hidden h-4 w-px bg-cv-rule-soft md:block"
            aria-hidden="true"
          />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light md:block">
            {sheet.number} / {sheet.title}
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => {
            const active =
              location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group inline-flex h-10 items-center font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                  active ? "text-cv-pencil" : "text-cv-graphite hover:text-cv-pencil"
                )}
              >
                <span className="relative">
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-cv-copper transition-all duration-200",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </span>
              </Link>
            );
          })}

          <Link
            to="/join-our-network"
            className="ml-2 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cv-graphite transition-colors hover:text-cv-pencil"
          >
            <span
              className="cv-pulse-dot inline-block size-1.5 rounded-full bg-cv-copper"
              aria-hidden="true"
            />
            Hiring
          </Link>

          <Button asChild size="sm" variant="default">
            <Link to="/staff-my-project">Staff project →</Link>
          </Button>

          <NorthArrow rotation={rotation} className="ml-1 hidden lg:block" />
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[92vw] border-cv-rule-soft bg-cv-vellum-light px-6 py-6 sm:max-w-sm"
            >
              <SheetHeader className="mb-6 text-left">
                <SheetTitle className="font-logo text-xl tracking-[0.18em] text-cv-pencil">
                  CREWVOLT
                </SheetTitle>
                <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
                  {sheet.number} · {sheet.title}
                </p>
              </SheetHeader>

              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex min-h-12 items-center border-b border-cv-rule-soft font-mono text-xs font-medium uppercase tracking-[0.2em] text-cv-graphite transition-colors hover:text-cv-pencil"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <SheetClose asChild>
                  <Button asChild>
                    <Link to="/staff-my-project">Staff project →</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="secondary">
                    <Link to="/join-our-network">Join network →</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
