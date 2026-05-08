import { Link } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { ComparisonMatrix } from "~/components/comparison-matrix";
import { CtaBanner } from "~/components/cta-banner";
import { JsonLdScript } from "~/components/json-ld-script";
import { SectionEyebrow } from "~/components/section-eyebrow";
import { SectionWrapper } from "~/components/section-wrapper";
import { whyCrewVoltFaq } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/why-crewvolt";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Why CrewVolt | Specialized Energy Staffing vs General Agencies",
    description:
      "CrewVolt only staffs energy infrastructure projects. See how we compare to engineering firms, general staffing agencies, direct hiring, and 1099 independence.",
    path: "/why-crewvolt",
  });
}

export function links() {
  return canonicalLinks("/why-crewvolt");
}

export default function WhyCrewVoltRoute() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: whyCrewVoltFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLdScript data={faqSchema} />

      {/* Hero with image bleed */}
      <section className="relative isolate overflow-hidden bg-cv-navy-dark">
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src="/img/why-crewvolt-hero.jpg"
            alt=""
            width={1600}
            height={1067}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cv-navy-dark via-cv-navy/80 to-cv-navy/30" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:px-8 md:py-24 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-cv-copper-light">
            Why CrewVolt
          </p>
          <h1 className="mt-5 max-w-3xl font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-white">
            Specialized energy staffing for both sides of the project.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg md:leading-8">
            Clients need proven field leaders. Workers want fair pay and
            continuity. With over a quarter of oil, gas, and mining workers{" "}
            <a
              href="https://www.energy.gov/topics/energy-workforce"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cv-copper-light underline underline-offset-4 hover:text-white"
            >
              nearing retirement
            </a>
            , getting the right people on your project matters more than ever.
          </p>
        </div>
      </section>

      <SectionWrapper tone="white">
        <SectionEyebrow label="How we compare" />
        <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy">
          CrewVolt vs the alternatives.
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-cv-charcoal">
          A quick spec comparison against the four staffing models energy
          construction projects typically choose between.
        </p>
        <div className="mt-8">
          <ComparisonMatrix
            columns={["CrewVolt", "General agency", "Direct hire", "1099 contractor"]}
            rows={[
              {
                label: "Energy infrastructure specialization",
                note: "Substation, wind, solar, BESS, transmission",
                values: ["yes", "no", "partial", "partial"],
              },
              {
                label: "W-2 employment with workers comp",
                values: ["yes", "partial", "yes", "no"],
              },
              {
                label: "Field-vetted references",
                note: "Worked-alongside, not resume keywords",
                values: ["yes", "no", "partial", "partial"],
              },
              {
                label: "Project-timeline staffing",
                note: "No permanent headcount risk",
                values: ["yes", "yes", "no", "yes"],
              },
              {
                label: "Continuity between projects",
                values: ["yes", "no", "yes", "no"],
              },
              {
                label: "One invoice, AP-friendly",
                values: ["yes", "yes", "partial", "no"],
              },
              {
                label: "Five-day average match window",
                note: "Active network only",
                values: ["yes", "no", "no", "partial"],
              },
            ]}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Frequently asked questions" />
        <Accordion type="single" collapsible className="rounded-xl border border-cv-border bg-cv-cream p-3">
          {whyCrewVoltFaq.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-cv-border-light px-2">
              <AccordionTrigger className="text-left font-headline text-[20px] font-semibold text-cv-navy hover:no-underline">
                <span>
                  <span className="mr-2 text-[11px] font-semibold tracking-[1px] uppercase text-cv-copper">
                    {item.audience}
                  </span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-base leading-7 text-cv-charcoal">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6 text-base leading-7 text-cv-charcoal">
          See <Link to="/how-it-works" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">how the process works</Link> or explore the <Link to="/industries" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">industries we serve</Link>.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
