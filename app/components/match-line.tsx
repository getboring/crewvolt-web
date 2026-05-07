import { cn } from "~/lib/utils";

type MatchLineProps = {
  label?: string;
  className?: string;
};

export function MatchLine({ label = "Match line", className }: MatchLineProps) {
  return (
    <div className={cn("cv-match-line cv-mono text-cv-graphite-light", className)}>
      <span className="cv-mono inline-flex items-center gap-2 px-2 text-[10px] font-medium uppercase tracking-[0.22em]">
        <span className="block size-1 rounded-full bg-cv-copper" aria-hidden="true" />
        {label}
        <span aria-hidden="true">→</span>
      </span>
    </div>
  );
}
