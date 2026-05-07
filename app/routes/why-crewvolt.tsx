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
import { MatchLine } from "~/components/match-line";
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
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLdScript data={faqSchema} />

      <SectionWrapper tone="vellum" eyebrow="Specification" badge="Sheet E-006">
        <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
          Why
          <em className="cv-display-italic"> CrewVolt.</em>
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-cv-graphite">
          Specialized energy staffing built for both sides of the project: clients who need
          proven field leaders and workers who want fair pay and continuity. With over a
          quarter of oil, gas, and mining workers{" "}
          <a
            href="https://www.energy.gov/topics/energy-workforce"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark"
          >
            nearing retirement
          </a>
          , getting the right people on your project matters more than ever.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Specification matrix" badge="Compare 4 options">
        <ComparisonMatrix
          columns={["CrewVolt", "General agency", "Direct hire", "1099 contractor"]}
          rows={[
            {
              label: "Energy infrastructure specialization",
              note: "Substation, wind, solar, BESS, Tx",
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
              label: "5-day average match window",
              note: "Active network only",
              values: ["yes", "no", "no", "partial"],
            },
          ]}
        />
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!py-10">
        <MatchLine label="Match line — frequently asked" />
      </SectionWrapper>

      <SectionWrapper tone="vellum" eyebrow="Frequently asked" badge="FAQ-001 — FAQ-006">
        <Accordion type="single" collapsible className="cv-paper-flat">
          {whyCrewVoltFaq.map((item, i) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-cv-rule-soft px-5 last:border-b-0"
            >
              <AccordionTrigger className="py-5 text-left font-display text-[20px] font-medium text-cv-pencil hover:no-underline [&>svg]:text-cv-copper">
                <span className="flex w-full items-center gap-4">
                  <span className="cv-mono shrink-0 text-[10px] uppercase tracking-[0.22em] text-cv-copper">
                    FAQ-{(i + 1).toString().padStart(3, "0")} · {item.audience.replace("For ", "")}
                  </span>
                  <span className="leading-tight">{item.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-[152px] text-base leading-relaxed text-cv-graphite">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-8 cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          See{" "}
          <Link to="/how-it-works" className="text-cv-copper underline-offset-4 hover:underline">
            sequence of operations →
          </Link>{" "}
          or explore{" "}
          <Link to="/industries" className="text-cv-copper underline-offset-4 hover:underline">
            site conditions →
          </Link>
        </p>
      </SectionWrapper>

      <SectionWrapper tone="vellum" className="!pt-0">
        <CtaBanner />
      </SectionWrapper>
    </>
  );
}
