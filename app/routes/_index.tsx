import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { HeroSection } from "~/components/hero-section";
import { IndustryCard } from "~/components/industry-card";
import { MetricCard } from "~/components/metric-card";
import { RoleCard } from "~/components/role-card";
import { SectionEyebrow } from "~/components/section-eyebrow";
import { SectionWrapper } from "~/components/section-wrapper";
import { SplitCards } from "~/components/split-cards";
import { StepCard } from "~/components/step-card";
import { Button } from "~/components/ui/button";
import { industries, rolesWeStaff } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/_index";

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
  return (
    <>
      <HeroSection />

      <SectionWrapper tone="white">
        <SectionEyebrow label="Both sides of the project" index="01" />
        <SplitCards />
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="The problem — for clients" index="02" />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          A $40 million substation does not wait for you to find an electrical inspector.
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          A wind project with a commissioning deadline does not care that your last QA/QC manager
          took a direct hire offer two weeks before mobilization. An interconnection queue does
          not pause because you are still interviewing candidates.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          Every week you are short a key person on site is a week the schedule slips. And when
          schedules slip, the calls start coming. From your client. From your VP. From the
          developer wondering if this project is going to hit COD.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow
          label="The problem — for workers"
          index="03"
          tone="field-green"
        />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          You are good at what you do, but too many staffing companies treat you like a line item.
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          They lowball your rate, disappear after placement, and leave you scrambling when a
          project wraps. Going 1099 sounds flexible until weekends are spent on payroll, taxes,
          insurance, and chasing the next gig.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          Your experience has value and the way you work should reflect it.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Why we exist" index="04" />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          CrewVolt exists because our founder has lived both sides of this problem.
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          Managing substation projects, scrambling to fill seats, and watching what happens when
          the wrong person shows up on site. Working alongside experienced professionals who kept
          being treated like they were disposable.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          We built CrewVolt to fix both sides. Clients get experienced people fast. Workers get
          consistent work, fair pay, and a company that understands what they do.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="What sets us apart" index="05" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-cv-border bg-cv-cream p-4">
            <p className="font-data text-[22px] leading-[1.3] font-medium text-cv-copper">W-2</p>
            <p className="mt-1 text-sm text-cv-steel">Full employment, not 1099</p>
          </div>
          <div className="rounded-lg border border-cv-border bg-cv-cream p-4">
            <p className="font-data text-[22px] leading-[1.3] font-medium text-cv-copper">Energy only</p>
            <p className="mt-1 text-sm text-cv-steel">We do not staff outside our industry</p>
          </div>
          <div className="rounded-lg border border-cv-border bg-cv-cream p-4">
            <p className="font-data text-[22px] leading-[1.3] font-medium text-cv-copper">Field vetted</p>
            <p className="mt-1 text-sm text-cv-steel">References from people who worked alongside them</p>
          </div>
          <div className="rounded-lg border border-cv-border bg-cv-cream p-4">
            <p className="font-data text-[22px] leading-[1.3] font-medium text-cv-copper">Both sides</p>
            <p className="mt-1 text-sm text-cv-steel">We serve clients and workers equally</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="How it works — for clients" index="06" />
        <div className="grid gap-4 md:grid-cols-3">
          {clientPlanSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow
          label="How it works — for workers"
          index="07"
          tone="field-green"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {workerPlanSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="Outcomes" index="08" />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <h3 className="font-headline text-[20px] leading-[1.3] font-semibold text-cv-navy">
              What success looks like
            </h3>
            <p className="mt-3 text-sm leading-6 text-cv-charcoal">
              <strong>For clients:</strong> Your project has the right people in place before
              mobilization. Inspections pass. Documentation is clean. The superintendent is not
              learning on the job.
            </p>
            <p className="mt-3 text-sm leading-6 text-cv-charcoal">
              <strong>For workers:</strong> You move from one good project to the next without
              scrambling. Your pay is fair. Your employment is W-2 with taxes handled and insurance
              covered.
            </p>
          </article>

          <article className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <h3 className="font-headline text-[20px] leading-[1.3] font-semibold text-cv-navy">
              What failure looks like
            </h3>
            <p className="mt-3 text-sm leading-6 text-cv-charcoal">
              <strong>For clients:</strong> You hire someone who interviews well but cannot perform
              in the field. Ramp-up, replacement search, and another ramp-up put the schedule at
              risk.
            </p>
            <p className="mt-3 text-sm leading-6 text-cv-charcoal">
              <strong>For workers:</strong> You take a gig through an agency that cuts your rate
              and ghosts after placement. The project ends and you are back to square one.
            </p>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow
          label="Roles we staff"
          index="09"
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

      <SectionWrapper tone="white">
        <SectionEyebrow label="Industries" index="10" caption="View industry detail →" />
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <h2 className="font-headline text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] font-semibold text-cv-navy">
            Where we work.
          </h2>
          <Button asChild variant="link" className="px-0">
            <Link to="/industries">View industry detail</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard
              key={industry.id}
              title={industry.title}
              description={industry.description}
              status={industry.status}
              href="/industries"
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <CtaBanner />
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="By the numbers" index="11" />
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
