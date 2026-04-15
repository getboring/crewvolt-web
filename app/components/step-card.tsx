type StepCardProps = {
  step: number;
  title: string;
  body: string;
};

export function StepCard({ step, title, body }: StepCardProps) {
  return (
    <article className="rounded-xl border border-cv-border bg-white p-6 shadow-sm">
      <p className="font-data text-[22px] leading-[1.3] font-medium text-cv-copper">{step}</p>
      <h3 className="mt-2 font-headline text-[18px] leading-[1.35] font-semibold text-cv-navy">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-cv-steel">{body}</p>
    </article>
  );
}
