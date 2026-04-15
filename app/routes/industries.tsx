import { SectionWrapper } from "~/components/section-wrapper";
import { Badge } from "~/components/ui/badge";
import { industries } from "~/lib/content";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/industries";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Industries We Serve | Substations, Wind, Solar, BESS, Transmission | CrewVolt",
    description:
      "CrewVolt staffs energy infrastructure projects across substations, wind farms, solar installations, battery storage, transmission, and grid modernization.",
    path: "/industries",
  });
}

export function links() {
  return canonicalLinks("/industries");
}

export default function IndustriesRoute() {
  return (
    <>
      <SectionWrapper tone="parchment">
        <h1 className="font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">Where we work.</h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          CrewVolt is focused on the Southeast and expanding as our network grows. The energy
          infrastructure buildout is creating demand for experienced professionals in every major
          sector.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <div className="space-y-6">
          {industries.map((industry) => {
            const badgeClass =
              industry.status === "Hiring"
                ? "bg-cv-warning-bg text-cv-amber"
                : "bg-cv-success-bg text-cv-success";

            return (
              <article key={industry.id} className="rounded-xl border border-cv-border bg-cv-cream p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
                    {industry.title}
                  </h2>
                  <Badge className={badgeClass}>{industry.status}</Badge>
                </div>
                <p className="mt-4 text-base leading-7 text-cv-charcoal">{industry.description}</p>
                <p className="mt-3 text-sm leading-6 text-cv-steel">
                  <strong className="text-cv-charcoal">Currently seeking:</strong>{" "}
                  {industry.currentlySeeking}.
                </p>
              </article>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
