import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { IndustryTile, type IndustryId } from "~/components/industry-tile";
import { SectionEyebrow } from "~/components/section-eyebrow";
import { SectionWrapper } from "~/components/section-wrapper";
import { industries } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/industries";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title:
      "Industries We Serve | Substations, Wind, Solar, BESS, Transmission | CrewVolt",
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
      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Industries" />
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Where we work.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-cv-charcoal">
          CrewVolt is focused on the Southeast and expanding as our network grows.
          The{" "}
          <a
            href="https://www.bls.gov/ooh/construction-and-extraction/electricians.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            Bureau of Labor Statistics
          </a>{" "}
          projects 81,000 annual openings for electricians alone, with renewable
          energy and grid expansion driving demand across every energy
          construction sector.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="Six sectors we serve" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <IndustryTile
              key={industry.id}
              id={industry.id as IndustryId}
              title={industry.title}
              description={industry.description}
              status={industry.status}
              currentlySeeking={industry.currentlySeeking}
            />
          ))}
        </div>
        <p className="mt-8 text-base leading-7 text-cv-charcoal">
          View{" "}
          <Link
            to="/services"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            all roles we staff
          </Link>{" "}
          or see{" "}
          <Link
            to="/how-it-works"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            how the process works
          </Link>
          .
        </p>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
