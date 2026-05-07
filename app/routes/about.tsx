import { Link } from "react-router";

import { CtaBanner } from "~/components/cta-banner";
import { SectionEyebrow } from "~/components/section-eyebrow";
import { SectionWrapper } from "~/components/section-wrapper";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/about";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "About CrewVolt | Energy Construction Staffing",
    description:
      "CrewVolt was founded by energy construction professionals who know what it takes to staff substations, wind farms, and solar projects with the right people.",
    path: "/about",
  });
}

export function links() {
  return canonicalLinks("/about");
}

export default function AboutRoute() {
  return (
    <>
      <SectionWrapper tone="parchment">
        <SectionEyebrow label="About CrewVolt" />
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Built by people who have done the work.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          CrewVolt is a W-2 contract staffing company that places experienced leadership and
          inspection professionals on energy infrastructure projects. We work across substations,
          wind, solar, BESS, and transmission. We serve owners, utilities, EPC contractors, and
          the workers themselves.
        </p>
      </SectionWrapper>

      {/* Wide image bleed */}
      <figure className="relative">
        <img
          src="/img/about-grid.jpg"
          alt="Transmission towers at sunset, representing the energy grid CrewVolt staffs."
          width={1800}
          height={1200}
          loading="lazy"
          decoding="async"
          className="h-[280px] w-full object-cover md:h-[420px] lg:h-[520px]"
        />
        <figcaption className="sr-only">
          Transmission towers at sunset.
        </figcaption>
      </figure>

      <SectionWrapper tone="white">
        <SectionEyebrow label="Why this company exists" />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          The energy industry is building at a pace we have not seen in decades.
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          The energy industry is building at a pace we have not seen in decades. Data centers are
          driving load growth. Renewable mandates are accelerating schedules. Grid modernization is
          expanding everywhere. The{" "}
          <a href="https://emp.lbl.gov/queues" target="_blank" rel="noopener noreferrer" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">interconnection queue</a>{" "}
          holds nearly 2,300 GW of capacity waiting for grid connection, and every project in that
          queue needs people who can build, inspect, and lead.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          At the same time, the experienced workforce is shrinking. The{" "}
          <a href="https://www.energy.gov/policy/us-energy-employment-jobs-report-useer" target="_blank" rel="noopener noreferrer" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">U.S. Energy &amp; Employment Report</a>{" "}
          documents the growing gap between project demand and available talent. That gap is where
          CrewVolt operates.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="How we are different" />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          We are not a generalist staffing agency.
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          Most staffing companies are generalists. Their recruiters are learning the difference
          between an electrical inspector and an electrical superintendent during intake. We are
          not that company.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          Every role we fill is on an energy infrastructure project. Our founder has managed this
          work in the field. The filter is simple: not "can they interview," but "would we trust
          them on our own jobsite?"
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="Founded from the field" />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          A note from the founder.
        </h2>
        <div className="mt-6 rounded-xl border border-cv-border bg-cv-cream p-6 md:p-8">
          <blockquote className="max-w-4xl text-base leading-7 text-cv-charcoal italic">
            "I spent years managing substation projects and watching the same problems repeat.
            Clients scrambling to fill critical seats weeks before mobilization. Experienced workers
            getting lowballed and ghosted by agencies that did not understand what they do.
            CrewVolt exists to fix both sides of that equation."
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-cv-navy">
            Founder, CrewVolt
          </p>
          <p className="text-sm text-cv-steel">
            Former energy construction project manager with field experience across substation,
            transmission, and generation projects.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="What we stand for" />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          Four principles we will not compromise on.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <h3 className="font-headline text-[20px] font-semibold text-cv-navy">Fair pay for good work.</h3>
            <p className="mt-2 text-sm leading-6 text-cv-charcoal">
              We pay competitive rates because that is how you keep experienced people.
            </p>
          </article>
          <article className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <h3 className="font-headline text-[20px] font-semibold text-cv-navy">
              Relationships over transactions.
            </h3>
            <p className="mt-2 text-sm leading-6 text-cv-charcoal">
              This is a small industry. We build long-term trust because that is how the work gets
              done.
            </p>
          </article>
          <article className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <h3 className="font-headline text-[20px] font-semibold text-cv-navy">Do the work right.</h3>
            <p className="mt-2 text-sm leading-6 text-cv-charcoal">
              We vet people the way you would if you had the time. We do not send candidates we do
              not trust.
            </p>
          </article>
          <article className="rounded-xl border border-cv-border bg-cv-cream p-6">
            <h3 className="font-headline text-[20px] font-semibold text-cv-navy">Take care of your people.</h3>
            <p className="mt-2 text-sm leading-6 text-cv-charcoal">
              Workers are CrewVolt employees with W-2 employment, taxes handled, workers comp, and
              continuity to the next project.
            </p>
          </article>
        </div>
        <p className="mt-6 text-base leading-7 text-cv-charcoal">
          See how we <Link to="/services" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">staff both sides of the project</Link>, or learn more about the <Link to="/industries" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">industries we serve</Link>.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
