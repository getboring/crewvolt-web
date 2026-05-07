import { Link } from "react-router";

import { RoleCard } from "~/components/role-card";
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
      <SectionWrapper tone="vellum" eyebrow="Scope of work — owner side" badge="Sheet E-003.1">
        <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
          Owner-side
          <em className="cv-display-italic"> staffing.</em>
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-cv-graphite">
          When you are the owner, developer, or utility, inspection and oversight roles protect
          your schedule, quality, and budget. A strong inspector catches issues during
          construction. A weak one turns them into turnover problems.{" "}
          <Link
            to="/how-it-works"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            See how the staffing process works →
          </Link>
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Owner-side roles" badge="OW-01–05">
        <div className="grid gap-4 md:grid-cols-2">
          {ownerSideRoles.map((role, i) => (
            <RoleCard
              key={role.title}
              code={`OW-${(i + 1).toString().padStart(2, "0")}`}
              title={role.title}
              description={role.description}
              audience="owner"
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/staff-my-project">Staff my project →</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/services/contractor-side">Contractor-side roles →</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
