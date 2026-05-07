import { Link } from "react-router";

import { Button } from "~/components/ui/button";

const trustChips = [
  "W-2 only",
  "Workers comp + GL",
  "Five-region coverage",
  "Energy infrastructure focus",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-cv-navy-dark via-cv-navy to-cv-navy-light py-20 md:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-gradient-to-r from-transparent to-cv-copper/10"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-cv-copper-light">
          Energy infrastructure staffing
        </p>
        <h1 className="mt-5 max-w-4xl font-headline text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.02] font-bold tracking-tight text-white">
          The right people on the right project.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
          CrewVolt places experienced inspectors, superintendents, and project
          managers on energy infrastructure projects. Substations. Wind. Solar.
          We know who is good and we know who is available.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg">
            <Link to="/staff-my-project">I need to staff a project</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-white text-white hover:border-cv-copper-light hover:bg-transparent hover:text-cv-copper-light"
          >
            <Link to="/join-our-network">I am looking for work</Link>
          </Button>
        </div>

        <ul
          aria-label="What we do"
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-white/60"
        >
          {trustChips.map((chip) => (
            <li key={chip} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="block size-1 rounded-full bg-cv-copper"
              />
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
