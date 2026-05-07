import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { MatchLine } from "~/components/match-line";
import { SectionWrapper } from "~/components/section-wrapper";
import { StepCard } from "~/components/step-card";
import { howItWorksClientSteps, howItWorksWorkerSteps } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/how-it-works";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "How It Works | W-2 Contract Staffing | CrewVolt",
    description:
      "CrewVolt makes staffing energy projects simple. Tell us the roles, we match experienced people, they show up ready as W-2 CrewVolt employees. One invoice.",
    path: "/how-it-works",
  });
}

export function links() {
  return canonicalLinks("/how-it-works");
}

export default function HowItWorksRoute() {
  return (
    <>
      <SectionWrapper tone="vellum" eyebrow="Sequence of operations" badge="Sheet E-004">
        <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
          Simple process.
          <em className="cv-display-italic"> Both sides.</em>
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-cv-graphite">
          CrewVolt serves both audiences in energy construction staffing: clients who need
          proven leadership on site and workers who want consistent{" "}
          <a
            href="https://www.bls.gov/ooh/construction-and-extraction/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            W-2 contract
          </a>{" "}
          opportunities in one of the fastest-growing employment sectors in the country.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Owner / EPC sequence" badge="Detail 01–05">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {howItWorksClientSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!py-10">
        <MatchLine label="Match line — see crew sequence" />
      </SectionWrapper>

      <SectionWrapper tone="vellum" eyebrow="Field professional sequence" badge="Detail 01–06">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {howItWorksWorkerSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
        <p className="mt-8 cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          See{" "}
          <Link to="/why-crewvolt" className="text-cv-copper underline-offset-4 hover:underline">
            full specification on Sheet E-006 →
          </Link>{" "}
          or{" "}
          <Link to="/services" className="text-cv-copper underline-offset-4 hover:underline">
            scope of work on Sheet E-003 →
          </Link>
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white" className="!pt-0">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
