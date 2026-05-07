import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

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
      <SectionWrapper tone="vellum" eyebrow="Vendor qualification" badge="Sheet E-010">
        <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
          Ready to onboard.
          <em className="cv-display-italic"> Ready to work.</em>
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-cv-graphite">
          CrewVolt maintains current documentation to move through standard subconsultant and
          vendor onboarding processes used by engineering firms, utilities, and EPC contractors.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Submittal package — Rev 01" badge="Items 01–08">
        <div className="cv-paper-flat">
          <div className="border-b border-cv-pencil px-5 py-3">
            <p className="cv-slug-copper">Ready to submit</p>
          </div>
          <ul className="divide-y divide-cv-rule-soft">
            {readinessItems.map((item, i) => (
              <li
                key={item}
                className="grid grid-cols-[44px_auto_1fr] items-center gap-3 px-5 py-3.5"
              >
                <span className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <CheckCircle2 className="size-4 shrink-0 text-cv-success" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-cv-pencil">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-cv-graphite">
          If your organization uses a formal procurement and vendor qualification process, we
          are prepared to move through it efficiently. We come prepared with everything
          procurement needs so we are not the reason onboarding takes longer than it should.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/staff-my-project">Staff my project →</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/contact">Contact / RFI →</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
