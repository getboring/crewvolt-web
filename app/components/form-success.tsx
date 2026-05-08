import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type FormSuccessProps = {
  title?: string;
  message: string;
  /** Optional secondary button — "Back home" by default */
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

const PHONE_TEL = "+1-423-555-0100";
const PHONE_DISPLAY = "+1 (423) 555-0100";

export function FormSuccess({
  title = "Submission received.",
  message,
  secondaryHref = "/",
  secondaryLabel = "Back home",
  className,
}: FormSuccessProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-xl border border-cv-border bg-white p-6 shadow-sm md:p-8",
        className,
      )}
    >
      <div className="flex flex-wrap items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-cv-success-bg p-2 text-cv-success"
        >
          <CheckCircle2 className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-headline text-[clamp(1.5rem,2.5vw,2rem)] leading-tight font-semibold text-cv-navy">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-cv-charcoal">
            {message}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-cv-border-light pt-5">
        <Button asChild>
          <Link to={secondaryHref}>{secondaryLabel}</Link>
        </Button>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex h-11 items-center rounded-md border border-cv-navy bg-transparent px-5 text-sm font-semibold text-cv-navy transition-colors hover:border-cv-copper hover:text-cv-copper"
        >
          Call {PHONE_DISPLAY}
        </a>
        <a
          href="mailto:staffing@crewvolt.com"
          className="text-sm text-cv-copper hover:text-cv-copper-dark"
        >
          staffing@crewvolt.com
        </a>
      </div>
    </div>
  );
}
