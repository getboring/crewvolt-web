type MetricCardProps = {
  label: string;
  value: string;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <article className="rounded-lg border border-cv-border bg-cv-cream p-5">
      <p className="text-[12px] font-semibold tracking-[1px] uppercase text-cv-steel">{label}</p>
      <p className="mt-2 font-data text-[22px] leading-[1.3] font-medium text-cv-copper">{value}</p>
    </article>
  );
}
