import { cn } from "~/lib/utils";

type SectionEyebrowProps = {
  /** Short uppercase label, e.g. "For clients" */
  label: string;
  /** Optional zero-padded section index, e.g. "01" */
  index?: string;
  /** Tone of the accent rule + label */
  tone?: "copper" | "field-green" | "navy" | "white";
  /** Optional muted right-aligned caption */
  caption?: string;
  className?: string;
};

const toneClasses: Record<NonNullable<SectionEyebrowProps["tone"]>, string> = {
  copper: "text-cv-copper",
  "field-green": "text-cv-field-green",
  navy: "text-cv-navy",
  white: "text-cv-copper-light",
};

const ruleClasses: Record<NonNullable<SectionEyebrowProps["tone"]>, string> = {
  copper: "bg-cv-copper",
  "field-green": "bg-cv-field-green",
  navy: "bg-cv-navy",
  white: "bg-cv-copper-light",
};

export function SectionEyebrow({
  label,
  index,
  tone = "copper",
  caption,
  className,
}: SectionEyebrowProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-wrap items-center gap-x-4 gap-y-2",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-8 shrink-0", ruleClasses[tone])}
      />
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[1.6px]",
          toneClasses[tone],
        )}
      >
        {index ? <span className="mr-2 opacity-70">{index}</span> : null}
        {label}
      </p>
      {caption ? (
        <span className="ml-auto text-[11px] uppercase tracking-[1.4px] text-cv-steel/80">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
