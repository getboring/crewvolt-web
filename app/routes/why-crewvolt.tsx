import { Link } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
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

      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Why CrewVolt" />
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Why CrewVolt.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          Specialized energy staffing built for both sides of the project: clients who need proven
          field leaders and workers who want fair pay and continuity. With over a quarter of oil,
          gas, and mining workers{" "}
          <a href="https://www.energy.gov/topics/energy-workforce" target="_blank" rel="noopener noreferrer" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">nearing retirement</a>,
          getting the right people on your project matters more than ever.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
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

      <SectionWrapper tone="parchment">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
