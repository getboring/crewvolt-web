import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

import { SectionEyebrow } from "~/components/section-eyebrow";
import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/vendor-readiness";

const readinessItems = [
  "NDA",
  "W-9 tax identification",
  "Certificate of insurance covering general liability and workers compensation",
  "Statement of qualifications",
  "Subconsultant and supplier qualification forms",
  "Subcontractor safety prequalification documentation",
  "Quality manual",
  "ACH payment setup",
] as const;

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Vendor Readiness | Subconsultant Onboarding Documentation | CrewVolt",
    description:
      "CrewVolt maintains current NDA, W-9, insurance certificates, safety prequalification, and quality documentation ready for vendor onboarding and procurement.",
    path: "/vendor-readiness",
  });
}

export function links() {
  return canonicalLinks("/vendor-readiness");
}

export default function VendorReadinessRoute() {
  return (
    <>
      <SectionWrapper tone="parchment">
        <SectionEyebrow label="Vendor readiness" />
        <h1 className="font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          Ready to onboard. Ready to work.
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-7 text-cv-charcoal">
          CrewVolt maintains current documentation to move through standard subconsultant and
          vendor onboarding processes used by engineering firms, utilities, and EPC contractors.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white">
        <SectionEyebrow label="Submittal package" />
        <div className="rounded-xl border border-cv-border bg-cv-cream p-6">
          <h2 className="font-headline text-[24px] leading-[1.25] font-semibold text-cv-navy">
            Ready to submit
          </h2>
          <ul className="mt-5 space-y-3">
            {readinessItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base leading-7 text-cv-charcoal">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-cv-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-4xl text-base leading-7 text-cv-charcoal">
          If your organization uses a formal procurement and vendor qualification process, we are
          prepared to move through it efficiently. We come prepared with everything procurement
          needs so we are not the reason onboarding takes longer than it should.
        </p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-cv-charcoal">
          Learn more about our <Link to="/services" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">staffing services</Link> or see <Link to="/how-it-works" className="text-cv-copper underline underline-offset-4 hover:text-cv-copper-dark">how the engagement works</Link>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/staff-my-project">Staff my project</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
