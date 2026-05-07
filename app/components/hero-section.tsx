import { Link } from "react-router";

import { SingleLineDiagram } from "~/components/single-line-diagram";

const trustChips = [
  "W-2 only",
  "Workers comp + GL",
  "5-region coverage",
  "5-day match window",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-cv-pencil">
      {/* Drawing grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244, 239, 226, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 239, 226, 0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Coordinate margins */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 hidden w-6 flex-col items-center justify-around py-12 cv-mono text-[9px] tracking-[0.22em] text-cv-vellum/30 md:flex"
      >
        {["A", "B", "C", "D"].map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 hidden h-6 flex-row items-center justify-around px-12 cv-mono text-[9px] tracking-[0.22em] text-cv-vellum/30 md:flex"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <span key={n}>{n.toString().padStart(2, "0")}</span>
        ))}
      </div>

      {/* Sheet stamp */}
      <div className="cv-stamp absolute right-5 top-5 hidden border border-cv-vellum/30 px-3 py-1.5 md:block">
        <p className="cv-mono text-[9px] uppercase tracking-[0.22em] text-cv-vellum/50">
          Sheet · E-001
        </p>
        <p className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-vellum">
          Cover
        </p>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_minmax(0,1.05fr)] md:gap-12 md:px-8 md:py-28 lg:gap-16">
        <div className="flex flex-col justify-center">
          <p className="cv-reveal cv-reveal-d1 cv-mono text-[10px] font-medium uppercase tracking-[0.28em] text-cv-copper-light">
            <span
              className="cv-pulse-dot mr-2 inline-block size-1.5 rounded-full bg-cv-copper align-middle"
              aria-hidden="true"
            />
            CV-2026-001 · Energy infrastructure staffing
          </p>

          <h1 className="cv-reveal cv-reveal-d2 cv-display mt-6 cv-dark-text-primary">
            <span className="block">The right people</span>
            <span className="block">on the right</span>
            <span className="block">
              <em className="cv-display-italic" style={{ color: "var(--cv-copper-light)" }}>
                project.
              </em>
            </span>
          </h1>

          <p className="cv-reveal cv-reveal-d3 mt-7 max-w-md text-[17px] leading-relaxed cv-dark-text-secondary">
            CrewVolt places experienced inspectors, superintendents, and project managers on
            energy infrastructure projects. Substations. Wind. Solar. BESS. Transmission. We
            know who is good and we know who is available.
          </p>

          <div className="cv-reveal cv-reveal-d4 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/staff-my-project"
              className="cv-min-touch group inline-flex items-center justify-center gap-3 border border-cv-copper bg-cv-copper px-7 py-3.5 cv-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cv-vellum transition-colors hover:bg-cv-copper-dark"
            >
              Match my crew
              <span className="text-cv-vellum/70 transition-transform group-hover:translate-x-0.5">
                →
              </span>
              <span className="hidden border-l border-cv-vellum/30 pl-3 text-cv-vellum/70 sm:inline">
                5-day SLA
              </span>
            </Link>
            <Link
              to="/join-our-network"
              className="cv-min-touch group inline-flex items-center justify-center gap-3 border border-cv-vellum/40 bg-transparent px-7 py-3.5 cv-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cv-vellum transition-colors hover:border-cv-vellum hover:bg-cv-vellum hover:text-cv-pencil"
            >
              Get matched to W-2 work
              <span className="opacity-70 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <ul className="cv-reveal cv-reveal-d5 mt-10 flex flex-wrap gap-x-6 gap-y-2 cv-mono text-[10px] uppercase tracking-[0.2em] text-cv-vellum/70">
            {trustChips.map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <span
                  className="block size-1 rounded-full bg-cv-copper"
                  aria-hidden="true"
                />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="cv-reveal cv-reveal-d3 relative">
          <div className="relative border border-cv-vellum/20 bg-cv-vellum/[0.02] p-4 md:p-6">
            <SingleLineDiagram inverted className="h-auto w-full" />
            {/* Tag */}
            <div className="absolute -bottom-3 left-4 hidden border border-cv-vellum/30 bg-cv-pencil px-3 py-1.5 md:block">
              <p className="cv-mono text-[9px] uppercase tracking-[0.22em] text-cv-vellum/70">
                Detail · Substation single-line
              </p>
            </div>
            <div className="absolute -top-3 right-4 hidden border border-cv-copper/60 bg-cv-pencil px-3 py-1.5 md:block">
              <p className="cv-mono text-[9px] uppercase tracking-[0.22em] text-cv-copper-light">
                <span className="mr-2">▲</span>Rev 03
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hairline rule at bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,239,226,0.4) 0 6px, transparent 6px 12px)",
          backgroundSize: "12px 1px",
        }}
      />
    </section>
  );
}
