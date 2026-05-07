import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function SplitCards() {
  return (
    <div className="grid gap-0 md:grid-cols-2">
      <Link
        to="/staff-my-project"
        className="group relative block border border-cv-pencil bg-cv-vellum-light p-7 transition-colors hover:bg-cv-pencil md:border-r-0"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="cv-slug-copper">For owners + EPC</p>
          <ArrowUpRight
            className="size-5 text-cv-graphite-light transition-colors group-hover:text-cv-copper"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-5 font-display text-[26px] font-medium leading-tight tracking-tight text-cv-pencil group-hover:text-cv-vellum">
          You need experienced people on site. Not in six weeks. Now.
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-cv-graphite group-hover:text-cv-vellum/80">
          We know who is good, we know who is available, and we handle the W-2 employment
          end-to-end so your project keeps moving.
        </p>
        <p className="cv-mono mt-6 text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light group-hover:text-cv-copper">
          Staff a project →
        </p>
      </Link>

      <Link
        to="/join-our-network"
        className="group relative block border border-cv-pencil bg-cv-vellum-light p-7 transition-colors hover:bg-cv-pencil"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="cv-mono text-[10px] font-medium uppercase tracking-[0.22em] text-cv-field-green">
            For field professionals
          </p>
          <ArrowUpRight
            className="size-5 text-cv-graphite-light transition-colors group-hover:text-cv-field-green-light"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-5 font-display text-[26px] font-medium leading-tight tracking-tight text-cv-pencil group-hover:text-cv-vellum">
          Your experience has value. The way you work should reflect it.
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-cv-graphite group-hover:text-cv-vellum/80">
          W-2 employment, fair pay, payroll and insurance handled. Continuity from project to
          project. No 1099 weekend bookkeeping.
        </p>
        <p className="cv-mono mt-6 text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light group-hover:text-cv-field-green-light">
          Join the network →
        </p>
      </Link>
    </div>
  );
}
