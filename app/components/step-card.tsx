type StepCardProps = {
  step: number;
  title: string;
  body: string;
  /** "DETAIL n" code displayed as drafting label. Auto-generated if omitted. */
  detailCode?: string;
};

export function StepCard({ step, title, body, detailCode }: StepCardProps) {
  const code = detailCode ?? `DETAIL ${step.toString().padStart(2, "0")}`;
  return (
    <article className="relative flex flex-col gap-4 border border-cv-rule-soft bg-cv-vellum-light p-6">
      <div className="flex items-baseline justify-between gap-3">
        <span
          aria-hidden="true"
          className="font-display text-[64px] font-medium leading-none tracking-tight text-cv-copper"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {step.toString().padStart(2, "0")}
        </span>
        <span className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          {code}
        </span>
      </div>
      <div className="cv-hairline-strong h-[1.5px] w-12 bg-cv-pencil" aria-hidden="true" />
      <h3 className="font-display text-[20px] font-medium leading-tight tracking-tight text-cv-pencil">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-cv-graphite">{body}</p>
    </article>
  );
}
