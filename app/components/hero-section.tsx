import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const trustChips = [
  "W-2 only",
  "Workers comp + GL",
  "Five-region coverage",
  "Energy infrastructure focus",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-cv-navy-dark via-cv-navy to-cv-navy-light">
      {/* Image — desktop only, behind copy on the right side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block"
      >
        <img
          src="/img/hero-offshore-wind.jpg"
          alt=""
          width={1800}
          height={1200}
          fetchPriority="high"
          decoding="async"
          className="cv-ken-burns h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cv-navy-dark via-cv-navy/85 to-cv-navy/40" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-cv-copper/15 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="lg:max-w-[58%]">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-cv-copper-light">
            Energy infrastructure staffing
          </p>
          <h1 className="mt-5 max-w-3xl font-headline text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.02] font-bold tracking-tight text-white">
            The right people on the right project.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
            CrewVolt places experienced inspectors, superintendents, and project
            managers on energy infrastructure projects. Substations. Wind. Solar.
            We know who is good and we know who is available.
          </p>

          <ul
            aria-label="What we do"
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-white/60"
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

          {/* Audience-split CTAs — two clearly separated paths */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Link
              to="/staff-my-project"
              className="group block rounded-lg border border-cv-copper/60 bg-cv-copper/10 p-5 transition-colors hover:border-cv-copper hover:bg-cv-copper hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-copper focus-visible:ring-offset-2 focus-visible:ring-offset-cv-navy"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[1.6px] text-cv-copper-light group-hover:text-white">
                For owners + EPC
              </p>
              <p className="mt-2 flex items-center gap-2 font-headline text-lg font-semibold leading-tight text-white">
                I need to staff a project
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </p>
              <p className="mt-1 text-xs leading-5 text-white/70 group-hover:text-white/90">
                Get matched to vetted W-2 field professionals.
              </p>
            </Link>

            <Link
              to="/join-our-network"
              className="group block rounded-lg border border-cv-field-green-light/60 bg-cv-field-green-light/10 p-5 transition-colors hover:border-cv-field-green-light hover:bg-cv-field-green-light hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-field-green-light focus-visible:ring-offset-2 focus-visible:ring-offset-cv-navy"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[1.6px] text-cv-field-green-light group-hover:text-white">
                For field professionals
              </p>
              <p className="mt-2 flex items-center gap-2 font-headline text-lg font-semibold leading-tight text-white">
                I am looking for work
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </p>
              <p className="mt-1 text-xs leading-5 text-white/70 group-hover:text-white/90">
                W-2 contract roles on energy infrastructure projects.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
