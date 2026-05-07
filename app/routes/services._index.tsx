import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { JsonLdScript } from "~/components/json-ld-script";
import { MatchLine } from "~/components/match-line";
import { RoleCard } from "~/components/role-card";
import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { contractorSideRoles, ownerSideRoles, projectSpecificRoles } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/services._index";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Energy Staffing Services | CrewVolt",
    description:
      "CrewVolt staffs inspectors and project managers for owners and superintendents and QA/QC professionals for contractors on energy infrastructure projects.",
    path: "/services",
  });
}

export function links() {
  return canonicalLinks("/services");
}

export default function ServicesOverviewRoute() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: "CrewVolt" },
    serviceType: "Energy infrastructure staffing",
    areaServed: "United States",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CrewVolt Staffing Services",
      itemListElement: [
        ...ownerSideRoles.map((role) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: role.title, description: role.description },
        })),
        ...contractorSideRoles.map((role) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: role.title, description: role.description },
        })),
      ],
    },
  };

  return (
    <>
      <JsonLdScript data={serviceSchema} />

      <SectionWrapper tone="vellum" eyebrow="Scope of work" badge="Sheet E-003">
        <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
          Leadership and inspection
          <em className="cv-display-italic"> staffing.</em>
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-cv-graphite">
          CrewVolt provides W-2 contract staffing for leadership and inspection roles on energy
          infrastructure projects. We handle employment, payroll, taxes, workers comp, and
          onboarding so your team can focus on execution.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <div className="grid gap-0 md:grid-cols-2">
          <article className="border border-cv-pencil bg-cv-vellum-light p-7 md:border-r-0">
            <p className="cv-slug-copper">Owner side · E-003.1</p>
            <h2 className="mt-4 font-display text-[28px] font-medium leading-tight tracking-tight text-cv-pencil">
              Oversight roles that protect your investment
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cv-graphite">
              Inspection and project leadership roles for owners, developers, and utilities.
            </p>
            <Button asChild className="mt-6">
              <Link to="/services/owner-side">View owner-side roles →</Link>
            </Button>
          </article>

          <article className="border border-cv-pencil bg-cv-vellum-light p-7">
            <p className="cv-mono text-[10px] font-medium uppercase tracking-[0.22em] text-cv-field-green">
              Contractor side · E-003.2
            </p>
            <h2 className="mt-4 font-display text-[28px] font-medium leading-tight tracking-tight text-cv-pencil">
              Field leadership that keeps production moving
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cv-graphite">
              Superintendent and quality roles for EPC and self-perform contractor teams.
            </p>
            <Button asChild className="mt-6">
              <Link to="/services/contractor-side">View contractor-side roles →</Link>
            </Button>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!py-10">
        <MatchLine label="Match line — owner-side roles" />
      </SectionWrapper>

      <SectionWrapper tone="vellum" eyebrow="Owner-side — protect investment" badge="OW-01–05">
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
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Contractor-side — keep production moving" badge="CR-01–05">
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
      </SectionWrapper>

      <SectionWrapper tone="vellum" eyebrow="Project-specific roles" badge="PS-01–05">
        <div className="grid gap-4 md:grid-cols-2">
          {projectSpecificRoles.map((role, i) => (
            <RoleCard
              key={role.title}
              code={`PS-${(i + 1).toString().padStart(2, "0")}`}
              title={role.title}
              description={role.description}
            />
          ))}
        </div>
        <p className="mt-8 cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          Need a role not listed?{" "}
          <Link to="/contact" className="text-cv-copper underline-offset-4 hover:underline">
            Submit RFI on Sheet E-009 →
          </Link>
        </p>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!pt-0">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
