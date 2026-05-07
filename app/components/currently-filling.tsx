import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type OpenRole = {
  title: string;
  region: string;
  industry: string;
  status: "Open" | "Filling" | "Urgent";
};

const sampleRoles: OpenRole[] = [
  {
    title: "Electrical Inspector",
    region: "Tennessee",
    industry: "Substation",
    status: "Urgent",
  },
  {
    title: "QA/QC Manager",
    region: "Texas",
    industry: "Solar",
    status: "Open",
  },
  {
    title: "Civil Superintendent",
    region: "Midwest",
    industry: "Wind",
    status: "Filling",
  },
  {
    title: "High Voltage Inspector",
    region: "Southeast",
    industry: "BESS",
    status: "Open",
  },
];

const statusDot: Record<OpenRole["status"], string> = {
  Urgent: "bg-cv-danger animate-pulse",
  Filling: "bg-cv-amber",
  Open: "bg-cv-success",
};

type CurrentlyFillingProps = {
  roles?: OpenRole[];
  /** Hide the apply CTA when shown directly above the join form */
  hideApply?: boolean;
  className?: string;
};

export function CurrentlyFilling({
  roles = sampleRoles,
  hideApply = false,
  className,
}: CurrentlyFillingProps) {
  return (
    <section
      aria-label="Currently filling roles"
      className={cn(
        "rounded-xl border border-cv-border bg-white p-6 shadow-sm md:p-8",
        className,
      )}
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-cv-copper">
            Currently filling — May 2026
          </p>
          <h3 className="mt-2 font-headline text-[clamp(1.25rem,2vw,1.5rem)] leading-tight font-semibold text-cv-navy">
            Real seats. Real projects. Active right now.
          </h3>
        </div>
        <p className="text-xs uppercase tracking-[1.4px] text-cv-steel">
          12+ across substation, wind, solar
        </p>
      </div>

      <ul role="list" className="divide-y divide-cv-border-light">
        {roles.map((r, i) => (
          <li
            key={`${r.title}-${i}`}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 md:grid-cols-[auto_1.6fr_1fr_auto]"
          >
            <span
              aria-hidden="true"
              className={cn("block size-2 shrink-0 rounded-full", statusDot[r.status])}
            />
            <div className="min-w-0">
              <p className="font-headline text-base font-semibold leading-tight text-cv-navy md:text-[17px]">
                {r.title}
              </p>
              <p className="mt-0.5 text-xs uppercase tracking-[1.2px] text-cv-steel">
                {r.industry}
              </p>
            </div>
            <p className="hidden text-sm text-cv-charcoal md:block">{r.region}</p>
            <p className="text-xs uppercase tracking-[1.2px] text-cv-steel">
              {r.status}
            </p>
          </li>
        ))}
      </ul>

      {!hideApply ? (
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-cv-border-light pt-5">
          <Button asChild>
            <Link to="/join-our-network">Join the network</Link>
          </Button>
          <p className="text-xs text-cv-steel">
            Roles refresh weekly. Submit once and we will reach out as positions
            open.
          </p>
        </div>
      ) : null}
    </section>
  );
}
