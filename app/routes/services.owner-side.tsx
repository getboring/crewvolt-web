import { Link } from "react-router";

import { RoleCard } from "~/components/role-card";
import { SectionEyebrow } from "~/components/section-eyebrow";
import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { ownerSideRoles } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/services.owner-side";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Owner Side Inspection Staffing | CrewVolt",
    description:
      "CrewVolt provides owner-side inspection and project leadership staffing for utilities, developers, and owners across energy infrastructure projects.",
    path: "/services/owner-side",
  });
}

export function links() {
  return canonicalLinks("/services/owner-side");
}

export default function OwnerSideServicesRoute() {
  return (
    <>
      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Owner-side staffing" />
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Owner-side staffing
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          When you are the owner, developer, or utility, inspection and oversight roles protect
          your schedule, quality, and budget. A strong inspector catches issues during
          construction. A weak one turns them into turnover problems. Learn more about <Link to="/how-it-works" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">how our staffing process works</Link>.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="Roles we staff" />
        <div className="grid gap-4 md:grid-cols-2">
          {ownerSideRoles.map((role) => (
            <RoleCard key={role.title} title={role.title} description={role.description} audience="owner" />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/staff-my-project">Staff my project</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/services/contractor-side">See contractor-side roles</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
