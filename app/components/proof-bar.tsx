import { Quote } from "lucide-react";

import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

type Testimonial = {
  quote: string;
  attribution: string;
  meta: string;
};

type ClientMark = {
  segment: string;
  engagement: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "First agency that didn't try to push me into a rate cut after placement. Three projects in two years, zero ghosting.",
    attribution: "Senior Electrical Inspector",
    meta: "18 years · Tennessee",
  },
  {
    quote:
      "They knew the difference between a substation and a switchyard before the first call. That alone is rare.",
    attribution: "QA/QC Manager",
    meta: "22 years · Active in Texas + Southeast",
  },
  {
    quote:
      "W-2, weekly pay, workers comp covered. After a decade of 1099 weekend bookkeeping, this is what I should have had all along.",
    attribution: "Civil Superintendent",
    meta: "15 years · Midwest",
  },
];

const clientMarks: ClientMark[] = [
  { segment: "Investor-Owned Utility", engagement: "Substation Program · Multi-Site" },
  { segment: "Tier-1 EPC", engagement: "Wind Project · Q3 2026 Mobilization" },
  { segment: "IPP Developer", engagement: "Solar Farm · Commissioning Support" },
  { segment: "Distribution Co-op", engagement: "Distribution Hardening Program" },
  { segment: "Self-Perform Contractor", engagement: "Transmission · QA/QC Lead" },
];

type ProofBarProps = {
  className?: string;
};

export function ProofBar({ className }: ProofBarProps) {
  return (
    <div className={cn("space-y-12", className)}>
      {/* Worker testimonials */}
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card
            key={t.attribution}
            className="@container/card h-full border-transparent bg-white shadow-sm ring-1 ring-cv-border"
          >
            <CardContent className="flex flex-col gap-4 py-5">
              <Quote
                aria-hidden="true"
                className="size-5 shrink-0 text-cv-copper"
              />
              <blockquote className="font-headline text-[clamp(1rem,1.4vw,1.125rem)] italic leading-relaxed text-cv-charcoal">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-auto border-t border-cv-border-light pt-3">
                <p className="text-sm font-semibold text-cv-navy">
                  {t.attribution}
                </p>
                <p className="text-xs uppercase tracking-[1px] text-cv-steel">
                  {t.meta}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Client engagement marks */}
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[1.6px] text-cv-steel">
          Client engagements (anonymized at client request)
        </p>
        <ul
          role="list"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {clientMarks.map((m) => (
            <li
              key={m.segment + m.engagement}
              className="rounded-lg border border-cv-border bg-cv-cream p-4"
            >
              <p className="font-headline text-sm font-semibold leading-tight text-cv-navy">
                {m.segment}
              </p>
              <p className="mt-1 text-xs leading-snug text-cv-steel">
                {m.engagement}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
