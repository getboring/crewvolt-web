import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { JsonLdScript } from "~/components/json-ld-script";
import { RoleCard } from "~/components/role-card";
import { SectionEyebrow } from "~/components/section-eyebrow";
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
    provider: {
      "@type": "Organization",
      name: "CrewVolt",
    },
    serviceType: "Energy infrastructure staffing",
    areaServed: "United States",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CrewVolt Staffing Services",
      itemListElement: [
        ...ownerSideRoles.map((role) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: role.title,
            description: role.description,
          },
        })),
        ...contractorSideRoles.map((role) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: role.title,
            description: role.description,
          },
        })),
      ],
    },
  };

  return (
    <>
      <JsonLdScript data={serviceSchema} />

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Services" />
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Leadership and inspection staffing for energy projects.
        </h1>
        <nav
          aria-label="On this page"
          className="mt-8 flex flex-wrap gap-2 border-t border-cv-border pt-5"
        >
          <a
            href="#owner-side"
            className="inline-flex h-9 items-center rounded-md border border-cv-border bg-white px-3 text-xs font-semibold uppercase tracking-[1.2px] text-cv-navy transition-colors hover:border-cv-copper hover:text-cv-copper"
          >
            Owner side
          </a>
          <a
            href="#contractor-side"
            className="inline-flex h-9 items-center rounded-md border border-cv-border bg-white px-3 text-xs font-semibold uppercase tracking-[1.2px] text-cv-navy transition-colors hover:border-cv-copper hover:text-cv-copper"
          >
            Contractor side
          </a>
          <a
            href="#project-specific"
            className="inline-flex h-9 items-center rounded-md border border-cv-border bg-white px-3 text-xs font-semibold uppercase tracking-[1.2px] text-cv-navy transition-colors hover:border-cv-copper hover:text-cv-copper"
          >
            Project-specific
          </a>
        </nav>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          CrewVolt provides W-2 contract staffing for leadership and inspection roles on energy
          infrastructure projects. We handle employment, payroll, taxes, workers comp, and
          onboarding so your team can focus on execution.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="Two sides — same standard" />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-cv-copper">
              Owner side
            </p>
            <h2 className="mt-2 font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
              Oversight roles that protect your investment
            </h2>
            <p className="mt-3 text-sm leading-6 text-cv-charcoal">
              Inspection and project leadership roles for owners, developers, and utilities.
            </p>
            <Button asChild className="mt-5">
              <Link to="/services/owner-side">View owner-side roles</Link>
            </Button>
          </article>

          <article className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-cv-field-green">
              Contractor side
            </p>
            <h2 className="mt-2 font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
              Field leadership that keeps production moving
            </h2>
            <p className="mt-3 text-sm leading-6 text-cv-charcoal">
              Superintendent and quality roles for EPC and self-perform contractor teams.
            </p>
            <Button asChild className="mt-5">
              <Link to="/services/contractor-side">View contractor-side roles</Link>
            </Button>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment" className="scroll-mt-24" innerClassName="" >
        <div id="owner-side" />
        <SectionEyebrow label="Owner-side roles" />
        <h2 className="font-headline text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] font-semibold text-cv-navy">
          Inspectors and project leadership
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {ownerSideRoles.map((role) => (
            <RoleCard key={role.title} title={role.title} description={role.description} audience="owner" />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="white" className="scroll-mt-24">
        <div id="contractor-side" />
        <SectionEyebrow label="Contractor-side roles" tone="field-green" />
        <h2 className="font-headline text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] font-semibold text-cv-navy">
          Field leadership and quality
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {contractorSideRoles.map((role) => (
            <RoleCard
              key={role.title}
              title={role.title}
              description={role.description}
              audience="contractor"
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment" className="scroll-mt-24">
        <div id="project-specific" />
        <SectionEyebrow label="Project-specific roles" />
        <h2 className="font-headline text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] font-semibold text-cv-navy">
          Specialized seats we fill
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projectSpecificRoles.map((role) => (
            <RoleCard key={role.title} title={role.title} description={role.description} />
          ))}
        </div>
        <p className="mt-6 text-base leading-7 text-cv-charcoal">
          Need a role not listed here? <Link to="/contact" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">Contact us</Link> to discuss your project requirements.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
