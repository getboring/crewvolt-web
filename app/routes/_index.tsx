import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { ComparisonMatrix } from "~/components/comparison-matrix";
import { HeroSection } from "~/components/hero-section";
import { IndustryCard } from "~/components/industry-card";
import { MatchLine } from "~/components/match-line";
import { MetricCard } from "~/components/metric-card";
import { RolesBoard } from "~/components/roles-board";
import { SectionWrapper } from "~/components/section-wrapper";
import { SplitCards } from "~/components/split-cards";
import { StepCard } from "~/components/step-card";
import { Button } from "~/components/ui/button";
import { industries } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/_index";

const homeClientSteps = [
  {
    title: "Tell us the project.",
    body: "Location, roles, timeline. We already understand the scope and ask the right questions on the first call.",
  },
  {
    title: "We match the right people.",
    body: "From a network we have already vetted. Field references, not resume keywords.",
  },
  {
    title: "They show up ready.",
    body: "Employed by CrewVolt. Payroll, taxes, workers comp, insurance handled. You direct the work.",
  },
] as const;

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Energy Infrastructure Staffing | CrewVolt",
    description:
      "CrewVolt places experienced inspectors, superintendents, and project managers on substation, wind, and solar projects. W-2 staffing for energy construction.",
    path: "/",
  });
}

export function links() {
  return canonicalLinks("/");
}

export default function HomeRoute() {
  return (
    <>
      <HeroSection />

      {/* Proof bar */}
      <SectionWrapper tone="vellum-dark" className="!py-8">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <p className="cv-slug">Trusted across energy infrastructure</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-cv-graphite-light">
            {[
              "Investor-Owned Utility",
              "Tier-1 EPC",
              "IPP Developer",
              "Co-op Substation Program",
              "Renewables Owner",
            ].map((logo) => (
              <span
                key={logo}
                className="font-display text-[15px] font-medium tracking-tight"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Split CTA panel */}
      <SectionWrapper tone="vellum">
        <SplitCards />
      </SectionWrapper>

      {/* The Frame — combined pain + framing */}
      <SectionWrapper tone="white" eyebrow="Why this exists" badge="Sheet E-001 / Detail A">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div>
            <h2 className="cv-h2 text-[clamp(2rem,3.4vw,3rem)]">
              A $40 million substation does not wait for you to find an
              <em className="cv-display-italic"> electrical inspector.</em>
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cv-graphite">
              A wind project with a commissioning deadline does not care that your last QA/QC
              manager took a direct-hire offer two weeks before mobilization. An interconnection
              queue does not pause because you are still interviewing candidates.
            </p>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-cv-graphite">
              We built CrewVolt to fix both sides of that equation. Clients get experienced
              people fast. Workers get consistent, fair-paid W-2 work and a company that
              understands what they actually do.
            </p>
          </div>

          <aside className="cv-paper-flat self-start">
            <div className="border-b border-cv-pencil px-5 py-3">
              <p className="cv-slug-copper">General notes — Rev 02</p>
            </div>
            <ul className="divide-y divide-cv-rule-soft">
              {[
                {
                  k: "01",
                  v: "Founder is a former substation project manager. We staff what we have run.",
                },
                {
                  k: "02",
                  v: "Energy infrastructure only. No general staffing crossover.",
                },
                {
                  k: "03",
                  v: "Field-vetted references — people who actually worked alongside the candidate.",
                },
                {
                  k: "04",
                  v: "W-2 employment with workers comp, GL, and continuity to the next placement.",
                },
              ].map((n) => (
                <li key={n.k} className="grid grid-cols-[40px_1fr] gap-3 px-5 py-3 text-sm">
                  <span className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
                    {n.k}
                  </span>
                  <span className="leading-relaxed text-cv-graphite">{n.v}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!py-10">
        <MatchLine label="Match line — see sheet 003" />
      </SectionWrapper>

      {/* Drawing schedule (numbers) */}
      <SectionWrapper
        tone="vellum"
        eyebrow="Drawing schedule — by the numbers"
        badge="Item count: 04"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Match window"
            value="5"
            unit="days avg"
            note="Active network only"
            itemNumber={1}
          />
          <MetricCard
            label="Employment model"
            value="W-2"
            note="Workers comp + GL"
            itemNumber={2}
          />
          <MetricCard
            label="Project types"
            value="06"
            note="Substation · Wind · Solar · BESS · Tx · Grid mod"
            itemNumber={3}
          />
          <MetricCard
            label="Queue served"
            value="2,300"
            unit="GW"
            note="LBL interconnection backlog"
            itemNumber={4}
          />
        </div>
      </SectionWrapper>

      {/* How it works — 3 detail callouts */}
      <SectionWrapper tone="white" eyebrow="Sequence of operations — owner side" badge="Detail 01–03">
        <div className="grid gap-5 md:grid-cols-3">
          {homeClientSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
        <p className="mt-8 cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          See full sequence of operations on{" "}
          <Link
            to="/how-it-works"
            className="text-cv-copper underline-offset-4 hover:underline"
          >
            Sheet E-004 →
          </Link>
        </p>
      </SectionWrapper>

      {/* Industries with currently-seeking */}
      <SectionWrapper tone="vellum" eyebrow="Site conditions — industries served" badge="Sheet E-005">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 6).map((industry, i) => (
            <IndustryCard
              key={industry.id}
              code={`SC-${(i + 1).toString().padStart(2, "0")}`}
              title={industry.title}
              description={industry.description}
              status={industry.status}
              currentlySeeking={industry.currentlySeeking}
              href="/industries"
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Live roles board */}
      <SectionWrapper tone="white" eyebrow="Open positions — currently filling" badge="Rev 14 / Live">
        <RolesBoard />
        <p className="mt-6 cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          Submit to the network on{" "}
          <Link
            to="/join-our-network"
            className="text-cv-copper underline-offset-4 hover:underline"
          >
            Sheet E-008 →
          </Link>
        </p>
      </SectionWrapper>

      {/* Why CrewVolt comparison teaser */}
      <SectionWrapper tone="vellum" eyebrow="Specification — why CrewVolt" badge="See Sheet E-006">
        <ComparisonMatrix
          columns={["CrewVolt", "General agency", "Direct hire", "1099 contractor"]}
          rows={[
            {
              label: "Energy infrastructure specialization",
              note: "Only this category",
              values: ["yes", "no", "partial", "partial"],
            },
            {
              label: "W-2 employment with workers comp",
              values: ["yes", "partial", "yes", "no"],
            },
            {
              label: "Field-vetted references",
              note: "Worked-alongside, not resume",
              values: ["yes", "no", "partial", "partial"],
            },
            {
              label: "Project-timeline staffing without permanent headcount",
              values: ["yes", "yes", "no", "yes"],
            },
            {
              label: "Continuity between projects",
              values: ["yes", "no", "yes", "no"],
            },
          ]}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/why-crewvolt">View full specification →</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/services">See all roles →</Link>
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!pt-0">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
