import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { JsonLdScript } from "~/components/json-ld-script";
import { SectionWrapper } from "~/components/section-wrapper";
import { whyCrewVoltFaq } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/why-crewvolt";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Why CrewVolt | Specialized Energy Staffing vs General Agencies",
    description:
      "CrewVolt only staffs energy infrastructure projects. Compare our model with engineering firms, general staffing agencies, and direct hiring.",
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
        <h1 className="font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">Why CrewVolt.</h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          Specialized energy staffing built for both sides of the project: clients who need proven
          field leaders and workers who want fair pay and continuity.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
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
      </SectionWrapper>
    </>
  );
}
