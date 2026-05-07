import { Link } from "react-router";

import { SectionEyebrow } from "~/components/section-eyebrow";
import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/blog._index";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Energy Staffing Insights | CrewVolt Blog",
    description:
      "Industry updates, hiring trends, and field insights from CrewVolt. Covering substations, wind, solar, transmission, BESS, and energy workforce topics.",
    path: "/blog",
  });
}

export function links() {
  return canonicalLinks("/blog");
}

export default function BlogIndexRoute() {
  return (
    <>
      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Blog" />
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Field insights.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          Industry updates, workforce trends, and perspectives from the energy construction field.
          Content is coming soon.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <div className="rounded-xl border border-cv-border bg-cv-cream p-8 text-center">
          <p className="font-headline text-[20px] font-semibold text-cv-navy">
            We are building our content library.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-cv-charcoal">
            CrewVolt is focused on placing experienced professionals on energy infrastructure
            projects. Our blog will cover hiring trends, workforce data, and insights from the
            field. In the meantime, get in touch.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link to="/staff-my-project">Staff my project</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/join-our-network">Join our network</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
