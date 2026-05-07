import { Check } from "lucide-react";

import { ISSUE_DATE, PROJECT_NUMBER } from "~/lib/sheets";

type StampedReceiptProps = {
  sheet: string;
  title: string;
  message: string;
};

export function StampedReceipt({ sheet, title, message }: StampedReceiptProps) {
  return (
    <div className="cv-paper-stamp relative bg-cv-vellum-light p-8 md:p-10">
      {/* Stamp ring */}
      <div className="absolute right-6 top-6 hidden md:block">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-cv-success">
          <div className="absolute inset-1 rounded-full border border-cv-success" />
          <div className="text-center">
            <Check className="mx-auto size-6 text-cv-success" aria-hidden="true" />
            <p className="cv-mono mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-cv-success">
              Received
            </p>
          </div>
        </div>
      </div>

      <p className="cv-slug-copper">RFI received · {ISSUE_DATE}</p>
      <h2
        className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-tight text-cv-pencil"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cv-graphite">{message}</p>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-md border-t border-cv-rule-soft pt-5 cv-mono text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
        <div>
          <p>Sheet</p>
          <p className="mt-0.5 text-cv-pencil">{sheet}</p>
        </div>
        <div>
          <p>Project</p>
          <p className="mt-0.5 text-cv-pencil">{PROJECT_NUMBER}</p>
        </div>
        <div>
          <p>Issue</p>
          <p className="mt-0.5 text-cv-pencil">{ISSUE_DATE}</p>
        </div>
        <div>
          <p>Reply window</p>
          <p className="mt-0.5 text-cv-pencil">≤ 1 business day</p>
        </div>
      </div>
    </div>
  );
}
