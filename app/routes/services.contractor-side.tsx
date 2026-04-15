import { Link } from "react-router";

import { RoleCard } from "~/components/role-card";
import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { contractorSideRoles } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/services.contractor-side";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Contractor Staffing Energy | CrewVolt",
    description:
      "CrewVolt provides contractor-side construction leadership and QA/QC staffing for EPC and self-perform contractor teams building energy infrastructure.",
    path: "/services/contractor-side",
  });
}

export function links() {
  return canonicalLinks("/services/contractor-side");
}

export default function ContractorSideServicesRoute() {
  return (
    <>
      <SectionWrapper tone="parchment">
        <h1 className="font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">
          Contractor-side staffing
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          When you are the contractor, your leadership team drives schedule, quality, and turnover
          performance. CrewVolt places superintendents and quality leaders who keep field work
          moving and documentation clean.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <div className="grid gap-4 md:grid-cols-2">
          {contractorSideRoles.map((role) => (
            <RoleCard
              key={role.title}
              title={role.title}
              description={role.description}
              audience="contractor"
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/staff-my-project">Staff my project</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/services/owner-side">See owner-side roles</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
