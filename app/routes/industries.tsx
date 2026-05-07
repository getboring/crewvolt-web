import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { IndustryCard } from "~/components/industry-card";
import { SectionWrapper } from "~/components/section-wrapper";
import { industries } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/industries";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Industries We Serve | Substations, Wind, Solar, BESS, Transmission | CrewVolt",
    description:
      "CrewVolt staffs energy infrastructure projects across substations, wind farms, solar installations, battery storage, transmission, and grid modernization.",
    path: "/industries",
  });
}

export function links() {
  return canonicalLinks("/industries");
}

export default function IndustriesRoute() {
  return (
    <>
      <SectionWrapper tone="vellum" eyebrow="Site conditions — industries served" badge="Sheet E-005">
        <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
          Where we
          <em className="cv-display-italic"> work.</em>
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-cv-graphite">
          CrewVolt focuses on the Southeast and is expanding as our network grows. The{" "}
          <a
            href="https://www.bls.gov/ooh/construction-and-extraction/electricians.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            Bureau of Labor Statistics
          </a>{" "}
          projects 81,000 annual openings for electricians alone, with renewable energy and grid
          expansion driving demand across every energy construction sector.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Detail — site profiles" badge="SC-01–06">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry, i) => (
            <IndustryCard
              key={industry.id}
              code={`SC-${(i + 1).toString().padStart(2, "0")}`}
              title={industry.title}
              description={industry.description}
              status={industry.status}
              currentlySeeking={industry.currentlySeeking}
            />
          ))}
        </div>
        <p className="mt-8 cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          View{" "}
          <Link to="/services" className="text-cv-copper underline-offset-4 hover:underline">
            all roles we staff →
          </Link>
          {"  "}or see{" "}
          <Link to="/how-it-works" className="text-cv-copper underline-offset-4 hover:underline">
            sequence of operations →
          </Link>
        </p>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!pt-0">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
