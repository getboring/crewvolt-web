import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { EngineerStamp } from "~/components/engineer-stamp";
import { MatchLine } from "~/components/match-line";
import { SectionWrapper } from "~/components/section-wrapper";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/about";

const values = [
  {
    code: "VAL-01",
    title: "Fair pay for good work.",
    body: "We pay competitive rates because that is how you keep experienced people on the bench when the next project mobilizes.",
  },
  {
    code: "VAL-02",
    title: "Relationships over transactions.",
    body: "This is a small industry. We build long-term trust because that is how the work actually gets done.",
  },
  {
    code: "VAL-03",
    title: "Do the work right.",
    body: "We vet people the way you would if you had the time. We do not send candidates we would not put on our own jobsite.",
  },
  {
    code: "VAL-04",
    title: "Take care of your people.",
    body: "Workers are CrewVolt employees with W-2 employment, taxes handled, workers comp, and continuity to the next project.",
  },
] as const;

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "About CrewVolt | Energy Construction Staffing",
    description:
      "CrewVolt was founded by energy construction professionals who know what it takes to staff substations, wind farms, and solar projects with the right people.",
    path: "/about",
  });
}

export function links() {
  return canonicalLinks("/about");
}

export default function AboutRoute() {
  return (
    <>
      <SectionWrapper tone="vellum" eyebrow="Project brief" badge="Sheet E-002">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <h1 className="cv-display text-[clamp(2.5rem,5.5vw,5rem)]">
              Built by people who have
              <em className="cv-display-italic"> done the work.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-cv-graphite">
              CrewVolt is a W-2 contract staffing company that places experienced leadership and
              inspection professionals on energy infrastructure projects. We work across
              substations, wind, solar, BESS, and transmission. We serve owners, utilities, EPC
              contractors, and the workers themselves.
            </p>
          </div>
          <div className="cv-paper-flat self-start">
            <div className="border-b border-cv-pencil px-5 py-3">
              <p className="cv-slug-copper">At a glance</p>
            </div>
            <dl className="divide-y divide-cv-rule-soft">
              {[
                ["Form", "Tennessee LLC"],
                ["Region", "East Tennessee · National field"],
                ["Founded", "2026"],
                ["Sector", "Energy infrastructure construction"],
                ["Model", "W-2 contract staffing"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3 text-sm">
                  <dt className="cv-mono uppercase tracking-[0.18em] text-cv-graphite-light">
                    {k}
                  </dt>
                  <dd className="text-cv-pencil">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Why this company exists" badge="Detail A">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="cv-h2 text-[clamp(1.75rem,3vw,2.5rem)]">
              The energy industry is building at a pace we have not seen in decades.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cv-graphite">
              Data centers are driving load growth. Renewable mandates are accelerating
              schedules. Grid modernization is expanding everywhere. The{" "}
              <a
                href="https://emp.lbl.gov/queues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
              >
                interconnection queue
              </a>{" "}
              holds nearly 2,300 GW of capacity waiting for grid connection — and every project
              in that queue needs people who can build, inspect, and lead.
            </p>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-cv-graphite">
              At the same time, the experienced workforce is shrinking. The{" "}
              <a
                href="https://www.energy.gov/policy/us-energy-employment-jobs-report-useer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
              >
                U.S. Energy &amp; Employment Report
              </a>{" "}
              documents the growing gap between project demand and available talent. That gap is
              where CrewVolt operates.
            </p>
          </div>
          <aside className="cv-paper-flat self-start">
            <div className="border-b border-cv-pencil px-5 py-3">
              <p className="cv-slug-copper">Reference data</p>
            </div>
            <ul className="divide-y divide-cv-rule-soft text-sm">
              {[
                { v: "2,300 GW", k: "Capacity in interconnection queue" },
                { v: "81,000", k: "Annual electrician openings (BLS)" },
                { v: "12–18 mo", k: "Typical project staffing horizon" },
              ].map((r) => (
                <li key={r.k} className="px-5 py-3">
                  <p
                    className="font-display text-[28px] font-medium leading-none tracking-tight"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    {r.v}
                  </p>
                  <p className="mt-1 cv-mono text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
                    {r.k}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!py-10">
        <MatchLine label="Match line — see founder stamp" />
      </SectionWrapper>

      <SectionWrapper tone="vellum" eyebrow="Founded from the field" badge="Stamp block">
        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          <EngineerStamp />
          <div>
            <blockquote className="cv-display-italic font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-tight tracking-tight text-cv-pencil">
              &ldquo;I spent years managing substation projects and watching the same problems
              repeat. Clients scrambling to fill critical seats weeks before mobilization.
              Experienced workers getting lowballed and ghosted by agencies that did not
              understand what they do. CrewVolt exists to fix both sides of that
              equation.&rdquo;
            </blockquote>
            <div className="mt-6 border-t border-cv-pencil pt-4">
              <p className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
                Drawn by
              </p>
              <p className="mt-1 font-display text-[18px] font-medium tracking-tight text-cv-pencil">
                Founder, CrewVolt
              </p>
              <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-graphite">
                Former substation project manager · East Tennessee
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="What we stand for" badge="Value notes 01–04">
        <ul role="list" className="grid gap-4 md:grid-cols-2">
          {values.map((v) => (
            <li key={v.code} className="cv-paper-flat p-6">
              <p className="cv-slug-copper">{v.code}</p>
              <h3 className="mt-3 font-display text-[22px] font-medium leading-tight tracking-tight text-cv-pencil">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cv-graphite">{v.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          See how we{" "}
          <Link to="/services" className="text-cv-copper underline-offset-4 hover:underline">
            staff both sides of the project →
          </Link>
        </p>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!pt-0">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
