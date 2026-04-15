import { StepCard } from "~/components/step-card";
import { SectionWrapper } from "~/components/section-wrapper";
import { howItWorksClientSteps, howItWorksWorkerSteps } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/how-it-works";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "How Energy Construction Staffing Works | W-2 Contract Staffing Process | CrewVolt",
    description:
      "CrewVolt makes staffing energy projects simple. Tell us the roles. We match experienced people. They show up ready as CrewVolt employees.",
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
        <h1 className="font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">
          Simple process. Both sides.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          CrewVolt serves both audiences in energy construction staffing: clients who need proven
          leadership on site and workers who want consistent W-2 contract opportunities.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <p className="mb-4 text-[11px] font-semibold tracking-[1.5px] uppercase text-cv-copper">
          For clients
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {howItWorksClientSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <p className="mb-4 text-[11px] font-semibold tracking-[1.5px] uppercase text-cv-field-green">
          For workers
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {howItWorksWorkerSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
