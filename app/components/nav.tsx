import { Menu } from "lucide-react";
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

  return (
    <nav className="sticky top-0 z-50 border-b border-cv-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          to="/"
          className="font-logo text-[20px] font-bold tracking-[1.5px] text-cv-navy transition-colors hover:text-cv-copper"
        >
          CREWVOLT
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => {
            const active =
              location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);

            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "inline-flex min-h-10 items-center px-1 text-[13px] font-medium text-cv-steel transition-colors",
                  active ? "text-cv-navy" : "hover:text-cv-copper"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Button asChild variant="secondary" className="ml-2" size="sm">
            <Link to="/join-our-network">Join network</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/staff-my-project">Staff my project</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[90vw] border-cv-border bg-white px-6 py-6 sm:max-w-sm">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left font-logo text-xl tracking-[1.5px] text-cv-navy">
                  CREWVOLT
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-cv-steel transition-colors hover:bg-cv-cream hover:text-cv-navy"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <SheetClose asChild>
                  <Button asChild>
                    <Link to="/staff-my-project">I need to staff a project</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="secondary">
                    <Link to="/join-our-network">I am looking for work</Link>
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
