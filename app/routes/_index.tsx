import { Link, useLoaderData } from "react-router";

import { BenefitGrid } from "~/components/benefit-grid";
import { CtaBanner } from "~/components/cta-banner";
import { CurrentlyFilling } from "~/components/currently-filling";
import { HeroSection } from "~/components/hero-section";
import { IndustryPulse } from "~/components/industry-pulse";
import { IndustryTile, type IndustryId } from "~/components/industry-tile";
import { MetricCard } from "~/components/metric-card";
import { ProofBar } from "~/components/proof-bar";
import { PullQuote } from "~/components/pull-quote";
import { RoleCard } from "~/components/role-card";
import { SectionEyebrow } from "~/components/section-eyebrow";
import { SectionWrapper } from "~/components/section-wrapper";
import { SplitCards } from "~/components/split-cards";
import { StepCard } from "~/components/step-card";
import { Button } from "~/components/ui/button";
import { industries, rolesWeStaff } from "~/lib/content";
import { listOpenRoles } from "~/lib/open-roles.server";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/_index";

export async function loader({ context }: Route.LoaderArgs) {
  const openRoles = await listOpenRoles(context.cloudflare.env.DB);
  return { openRoles };
}

const clientPlanSteps = [
  {
    title: "Tell us the project.",
    body: "Location, roles, timeline. We already understand the scope.",
  },
  {
    title: "We match the right people.",
    body: "From a network we have already vetted. People we know can do the work.",
  },
  {
    title: "They show up ready.",
    body: "Employed by CrewVolt. Payroll, taxes, and insurance handled. You direct the work.",
  },
] as const;

const workerPlanSteps = [
  {
    title: "Tell us about yourself.",
    body: "Roles you have held, projects you have worked, and where you are willing to go.",
  },
  {
    title: "We vet you the way the jobsite would.",
    body: "References from people who have worked alongside you, not just names on a resume.",
  },
  {
    title: "We match you with projects that fit.",
    body: "When a project wraps, we are already working on what comes next.",
  },
] as const;

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Energy Infrastructure Staffing | CrewVolt",
    description:
      "CrewVolt places experienced inspectors, superintendents, and project managers on substation, wind, and solar projects. W-2 staffing for energy construction.",
    path: "/",
  });
}

export function links() {
  return canonicalLinks("/");
}

export default function HomeRoute() {
  const { openRoles } = useLoaderData<typeof loader>();
  return (
    <>
      <HeroSection />

      <SectionWrapper tone="white">
        <SectionEyebrow label="Both sides of the project" index="01" />
        <SplitCards />
      </SectionWrapper>

      {/* Trust proof bar — testimonials + client engagements */}
      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Proof" index="02" caption="Verified through field references" />
        <ProofBar />
      </SectionWrapper>

      {/* Pull quote acts as a visual rest */}
      <SectionWrapper tone="white" className="!py-12 md:!py-16">
        <PullQuote attribution="Founder, CrewVolt">
          A $40 million substation does not wait for you to find an electrical
          inspector.
        </PullQuote>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="The problem — for clients" index="03" />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          Schedule slips when key seats sit open.
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          A wind project with a commissioning deadline does not care that your
          last QA/QC manager took a direct hire offer two weeks before
          mobilization. An interconnection queue does not pause because you are
          still interviewing candidates.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          Every week you are short a key person on site is a week the schedule
          slips. And when schedules slip, the calls start coming. From your
          client. From your VP. From the developer wondering if this project is
          going to hit COD.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow
          label="The problem — for workers"
          index="04"
          tone="field-green"
        />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          Experience deserves a partner that acts like one.
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          They lowball your rate, disappear after placement, and leave you
          scrambling when a project wraps. Going 1099 sounds flexible until
          weekends are spent on payroll, taxes, insurance, and chasing the next
          gig.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          Your experience has value and the way you work should reflect it.
        </p>
      </SectionWrapper>

      {/* What clients get */}
      <SectionWrapper tone="parchment">
        <SectionEyebrow label="What clients get" index="05" />
        <BenefitGrid audience="clients" />
      </SectionWrapper>

      {/* What workers get */}
      <SectionWrapper tone="white">
        <SectionEyebrow
          label="What workers get"
          index="06"
          tone="field-green"
        />
        <BenefitGrid audience="workers" />
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="How it works — for clients" index="07" />
        <div className="grid gap-4 md:grid-cols-3">
          {clientPlanSteps.map((step, index) => (
            <StepCard
              key={step.title}
              step={index + 1}
              title={step.title}
              body={step.body}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment" className="!pt-0">
        <SectionEyebrow
          label="How it works — for workers"
          index="08"
          tone="field-green"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {workerPlanSteps.map((step, index) => (
            <StepCard
              key={step.title}
              step={index + 1}
              title={step.title}
              body={step.body}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Pull quote — second editorial moment */}
      <SectionWrapper tone="white" className="!py-12 md:!py-16">
        <PullQuote>
          We built CrewVolt to fix both sides. Clients get experienced people
          fast. Workers get consistent work, fair pay, and a company that
          understands what they do.
        </PullQuote>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow
          label="Currently filling"
          index="09"
          caption="Live from our open-roles board"
        />
        <CurrentlyFilling roles={openRoles} />
      </SectionWrapper>

      {/* Industry pulse — live-feeling rotation of citation-backed industry stats */}
      <SectionWrapper tone="white" className="!py-12 md:!py-16">
        <SectionEyebrow
          label="Industry pulse"
          index="10"
          caption="Public data · refreshed monthly"
        />
        <IndustryPulse />
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow
          label="Roles we staff"
          index="11"
          caption="See full list →"
        />
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <h2 className="font-headline text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] font-semibold text-cv-navy">
            Inspectors, superintendents, project managers, QA/QC.
          </h2>
          <Button asChild variant="link" className="px-0">
            <Link to="/services">See all services</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rolesWeStaff.map((role) => (
            <RoleCard key={role} title={role} href="/services" />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Industries" index="12" caption="View industry detail →" />
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <h2 className="font-headline text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] font-semibold text-cv-navy">
            Where we work.
          </h2>
          <Button asChild variant="link" className="px-0">
            <Link to="/industries">View industry detail</Link>
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <IndustryTile
              key={industry.id}
              id={industry.id as IndustryId}
              title={industry.title}
              description={industry.description}
              status={industry.status}
              currentlySeeking={industry.currentlySeeking}
              href="/industries"
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <CtaBanner />
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="By the numbers" index="13" />
        <h2 className="font-headline text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] font-semibold text-cv-navy">
          A focused operation.
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Distinct roles we staff" value="15+" />
          <MetricCard label="Project types served" value="6" />
          <MetricCard label="Employment model" value="W-2" />
          <MetricCard label="Regions covered" value="5+" />
        </div>
      </SectionWrapper>
    </>
  );
}
