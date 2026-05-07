import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { SectionEyebrow } from "~/components/section-eyebrow";
import { StepCard } from "~/components/step-card";
import { SectionWrapper } from "~/components/section-wrapper";
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
      <SectionWrapper tone="parchment">
        <SectionEyebrow label="How it works" />
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Simple process. Both sides.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          CrewVolt serves both audiences in energy construction staffing: clients who need proven
          leadership on site and workers who want consistent{" "}
          <a href="https://www.bls.gov/ooh/construction-and-extraction/" target="_blank" rel="noopener noreferrer" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">W-2 contract</a>{" "}
          opportunities in one of the fastest-growing employment sectors in the country.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="For clients" index="01" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {howItWorksClientSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="For workers" index="02" tone="field-green" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {howItWorksWorkerSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <p className="max-w-4xl text-base leading-7 text-cv-charcoal">
          Want to know <Link to="/why-crewvolt" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">why CrewVolt over other options</Link>? Or see the <Link to="/services" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">specific roles we staff</Link>.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
