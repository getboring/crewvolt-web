import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

type Stat = {
  label: string;
  value: string;
  unit?: string;
  source: string;
  href: string;
};

const stats: Stat[] = [
  {
    label: "Capacity awaiting grid interconnection",
    value: "2,312",
    unit: "GW",
    source: "Lawrence Berkeley National Laboratory · 2026 Q1",
    href: "https://emp.lbl.gov/queues",
  },
  {
    label: "Annual electrician openings projected",
    value: "81,000",
    source: "Bureau of Labor Statistics · OOH",
    href: "https://www.bls.gov/ooh/construction-and-extraction/electricians.htm",
  },
  {
    label: "Energy workforce nearing retirement",
    value: "27",
    unit: "%",
    source: "U.S. Energy & Employment Report · DOE",
    href: "https://www.energy.gov/policy/us-energy-employment-jobs-report-useer",
  },
  {
    label: "Federal energy infrastructure spending FY26",
    value: "$66",
    unit: "B",
    source: "Department of Energy · FY26 Budget",
    href: "https://www.energy.gov/cfo/articles/fy-2026-budget-justification",
  },
];

const ROTATE_MS = 5500;

type IndustryPulseProps = {
  className?: string;
};

export function IndustryPulse({ className }: IndustryPulseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Respect prefers-reduced-motion
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % stats.length);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, [reduceMotion, paused]);

  const active = stats[activeIndex];

  return (
    <section
      aria-label="Energy industry pulse"
      className={cn(
        "rounded-xl border border-cv-border bg-cv-cream p-6 shadow-sm md:p-8",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-cv-copper">
          Industry pulse
        </p>
        <p className="text-[11px] uppercase tracking-[1.4px] text-cv-steel">
          Public data · refreshed monthly
        </p>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-[2fr_3fr] md:items-center">
        {/* Animated headline number */}
        <div
          aria-live="polite"
          className="min-h-[140px] md:min-h-[120px]"
          key={activeIndex}
          style={{ animation: reduceMotion ? "none" : "cv-pulse-fade 5500ms ease-out both" }}
        >
          <p
            className={cn(
              "font-data leading-none font-medium text-cv-navy",
              "text-[clamp(3rem,7vw,5rem)]",
            )}
          >
            {active.value}
            {active.unit ? (
              <span className="ml-1 text-[clamp(1.5rem,3vw,2.25rem)] text-cv-copper">
                {active.unit}
              </span>
            ) : null}
          </p>
          <p className="mt-2 text-sm leading-snug text-cv-charcoal md:text-base">
            {active.label}
          </p>
          <a
            href={active.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs uppercase tracking-[1.2px] text-cv-copper underline-offset-4 hover:text-cv-copper-dark hover:underline"
          >
            {active.source} →
          </a>
        </div>

        {/* Indicator dots */}
        <ul
          role="tablist"
          aria-label="Industry stats"
          className="flex flex-wrap gap-2 md:flex-col md:gap-3"
        >
          {stats.map((s, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={s.label}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-xs transition-colors",
                    isActive
                      ? "border-cv-copper bg-white text-cv-navy"
                      : "border-cv-border bg-transparent text-cv-steel hover:border-cv-copper hover:text-cv-navy",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block size-1.5 shrink-0 rounded-full transition-all",
                      isActive ? "bg-cv-copper" : "bg-cv-border",
                    )}
                  />
                  <span className="truncate">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
