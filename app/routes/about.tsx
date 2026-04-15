import { SectionWrapper } from "~/components/section-wrapper";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/about";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title:
      "About CrewVolt | Energy Construction Staffing Built by People Who Have Done the Work",
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
        <h1 className="font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">
          Built by people who have done the work.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          CrewVolt is a W-2 contract staffing company that places experienced leadership and
          inspection professionals on energy infrastructure projects. We work across substations,
          wind, solar, BESS, and transmission. We serve owners, utilities, EPC contractors, and
          the workers themselves.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
          Why this company exists
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          The energy industry is building at a pace we have not seen in decades. Data centers are
          driving load growth. Renewable mandates are accelerating schedules. Grid modernization is
          expanding everywhere. The interconnection queue is backed up, and every project in that
          queue needs people who can build, inspect, and lead.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          At the same time, the experienced workforce is shrinking. That gap between project demand
          and proven field capability is where CrewVolt operates.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
          How we are different
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
        <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
          What we stand for
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
      </SectionWrapper>
    </>
  );
}
