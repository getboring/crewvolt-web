import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { HeroSection } from "~/components/hero-section";
import { IndustryCard } from "~/components/industry-card";
import { MetricCard } from "~/components/metric-card";
import { RoleCard } from "~/components/role-card";
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
    title:
      "CrewVolt | Energy Infrastructure Staffing - Inspectors, Superintendents, Project Managers",
    description:
      "CrewVolt places experienced inspectors, superintendents, and project managers on substation, wind, and solar projects. W-2 contract staffing for energy construction.",
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
        <SplitCards />
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
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
        <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
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
        <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
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
        <div className="grid gap-4 md:grid-cols-3">
          {clientPlanSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <div className="grid gap-4 md:grid-cols-3">
          {workerPlanSteps.map((step, index) => (
            <StepCard key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="white">
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
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
            Roles we staff
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
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
            Industries
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
        <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
          By the numbers
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Roles we staff" value="15+" />
          <MetricCard label="Professionals in our network" value="In progress" />
          <MetricCard label="Combined years of field experience" value="In progress" />
          <MetricCard label="Project types" value="6" />
        </div>
      </SectionWrapper>
    </>
  );
}
