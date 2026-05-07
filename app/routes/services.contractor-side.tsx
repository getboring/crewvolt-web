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
      <SectionWrapper tone="vellum" eyebrow="Scope of work — contractor side" badge="Sheet E-003.2">
        <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
          Contractor-side
          <em className="cv-display-italic"> staffing.</em>
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-cv-graphite">
          When you are the contractor, your leadership team drives schedule, quality, and
          turnover performance. CrewVolt places superintendents and quality leaders who keep
          field work moving and documentation clean.{" "}
          <Link
            to="/why-crewvolt"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            See why teams choose CrewVolt →
          </Link>
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Contractor-side roles" badge="CR-01–05">
        <div className="grid gap-4 md:grid-cols-2">
          {contractorSideRoles.map((role, i) => (
            <RoleCard
              key={role.title}
              code={`CR-${(i + 1).toString().padStart(2, "0")}`}
              title={role.title}
              description={role.description}
              audience="contractor"
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/staff-my-project">Staff my project →</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/services/owner-side">Owner-side roles →</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
