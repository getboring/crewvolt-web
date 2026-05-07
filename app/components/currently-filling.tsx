import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import type { OpenRoleRow } from "~/lib/open-roles";
import { cn } from "~/lib/utils";

const statusDot: Record<OpenRoleRow["status"], string> = {
  Urgent: "bg-cv-danger animate-pulse",
  Filling: "bg-cv-amber",
  Open: "bg-cv-success",
};

type CurrentlyFillingProps = {
  roles: OpenRoleRow[];
  /** Hide the apply CTA (e.g. when shown directly above the join form) */
  hideApply?: boolean;
  className?: string;
};

export function CurrentlyFilling({
  roles,
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
            Currently filling
          </p>
          <h3 className="mt-2 font-headline text-[clamp(1.25rem,2vw,1.5rem)] leading-tight font-semibold text-cv-navy">
            Real seats. Real projects. Active right now.
          </h3>
        </div>
        <p className="text-xs uppercase tracking-[1.4px] text-cv-steel">
          {roles.length}+ across substation, wind, solar, BESS
        </p>
      </div>

      <ul role="list" className="divide-y divide-cv-border-light">
        {roles.map((r) => (
          <li
            key={r.id}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 md:grid-cols-[auto_1.6fr_1fr_auto_auto]"
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
            <p className="hidden text-xs uppercase tracking-[1.2px] text-cv-steel md:block">
              {r.status}
            </p>
            <time
              dateTime={r.posted_at}
              className="text-xs tabular-nums text-cv-steel"
            >
              {r.posted_relative}
            </time>
          </li>
        ))}
      </ul>

      {!hideApply ? (
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-cv-border-light pt-5">
          <Button asChild>
            <Link to="/join-our-network">Join the network</Link>
          </Button>
          <p className="text-xs text-cv-steel">
            Live from our open-roles board. Submit once and we will reach out
            as positions open.
          </p>
        </div>
      ) : null}
    </section>
  );
}
