import { Link } from "react-router";

import { Button } from "~/components/ui/button";

type CtaBannerProps = {
  /** "DETAIL n" or similar drafting code displayed as section badge. */
  badge?: string;
  title?: string;
  body?: string;
};

export function CtaBanner({
  badge = "DETAIL — INTAKE",
  title = "Two ways in. Both lead to the same place: the right people on the right project.",
  body,
}: CtaBannerProps) {
  return (
    <section className="border border-cv-pencil bg-cv-pencil text-cv-vellum">
      <div className="grid gap-0 md:grid-cols-[1fr_auto_1fr]">
        <div className="p-8 md:p-10">
          <p className="cv-slug-copper text-cv-copper-light">{badge}</p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,2.4vw,2.4rem)] font-medium leading-[1.1] tracking-tight cv-dark-text-primary">
            {title}
          </h2>
          {body ? <p className="mt-3 max-w-md text-sm leading-relaxed cv-dark-text-secondary">{body}</p> : null}
        </div>

        <div className="hidden w-px bg-cv-dark-border md:block" aria-hidden="true" />

        <div className="grid gap-0 md:grid-cols-1">
          <div className="border-t border-cv-dark-border p-7 md:border-l-0 md:border-t-0">
            <p className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-copper-light">
              For owners + EPC
            </p>
            <p className="mt-2 font-display text-[18px] font-medium leading-snug cv-dark-text-primary">
              We probably already know who should be on it.
            </p>
            <Button asChild variant="accent" className="mt-4">
              <Link to="/staff-my-project">Staff project →</Link>
            </Button>
          </div>
          <div className="border-t border-cv-dark-border p-7">
            <p className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-field-green-light">
              For field professionals
            </p>
            <p className="mt-2 font-display text-[18px] font-medium leading-snug cv-dark-text-primary">
              Get matched to good projects on a W-2.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/join-our-network">Join network →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
