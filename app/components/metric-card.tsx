type MetricCardProps = {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  itemNumber?: number;
};

export function MetricCard({ label, value, unit, note, itemNumber }: MetricCardProps) {
  return (
    <article className="relative flex flex-col gap-2 border border-cv-rule-soft bg-cv-vellum-light p-5">
      <div className="flex items-center justify-between">
        <p className="cv-slug-copper">{label}</p>
        {itemNumber !== undefined ? (
          <span className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
            ITEM {itemNumber.toString().padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <div className="cv-hairline-strong h-[1.5px] w-8 bg-cv-pencil" aria-hidden="true" />
      <p
        className="font-display font-medium leading-none tracking-tight text-cv-pencil"
        style={{ fontVariationSettings: "'opsz' 144", fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
      >
        {value}
        {unit ? (
          <span className="cv-mono ml-2 align-baseline text-sm font-medium uppercase tracking-[0.22em] text-cv-graphite-light">
            {unit}
          </span>
        ) : null}
      </p>
      {note ? (
        <p className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          {note}
        </p>
      ) : null}
    </article>
  );
}
