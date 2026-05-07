import { useLocation } from "react-router";

import { ISSUE_DATE, PROJECT_NAME, PROJECT_NUMBER, sheetForPath } from "~/lib/sheets";
import { cn } from "~/lib/utils";

type TitleBlockProps = {
  className?: string;
};

export function TitleBlock({ className }: TitleBlockProps) {
  const location = useLocation();
  const sheet = sheetForPath(location.pathname);

  return (
    <aside
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed bottom-3 right-3 z-40 hidden md:block",
        className
      )}
    >
      <div className="cv-paper-stamp grid w-[260px] grid-cols-[1fr_auto] gap-0 bg-cv-vellum-light p-0 text-cv-pencil">
        <div className="border-b border-r border-cv-rule-soft px-3 py-2">
          <p className="cv-mono text-[9px] font-medium uppercase tracking-[0.18em] text-cv-graphite-light">
            Project
          </p>
          <p className="cv-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] leading-tight">
            {PROJECT_NAME}
          </p>
        </div>
        <div className="border-b border-cv-rule-soft px-3 py-2 text-right">
          <p className="cv-mono text-[9px] font-medium uppercase tracking-[0.18em] text-cv-graphite-light">
            Job no
          </p>
          <p className="cv-mono text-[10.5px] font-semibold tracking-[0.04em]">{PROJECT_NUMBER}</p>
        </div>
        <div className="border-r border-cv-rule-soft px-3 py-2">
          <p className="cv-mono text-[9px] font-medium uppercase tracking-[0.18em] text-cv-graphite-light">
            Sheet
          </p>
          <p className="font-display text-[18px] font-medium leading-none tracking-tight">
            {sheet.number}
          </p>
        </div>
        <div className="px-3 py-2 text-right">
          <p className="cv-mono text-[9px] font-medium uppercase tracking-[0.18em] text-cv-graphite-light">
            Scale / Issue
          </p>
          <p className="cv-mono text-[10.5px] font-semibold tracking-[0.06em]">
            {sheet.scale} · {ISSUE_DATE}
          </p>
        </div>
        <div className="col-span-2 border-t border-cv-rule-soft px-3 py-1.5">
          <p className="cv-mono text-[10px] uppercase tracking-[0.16em] text-cv-graphite-light">
            <span className="text-cv-pencil">{sheet.title}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
