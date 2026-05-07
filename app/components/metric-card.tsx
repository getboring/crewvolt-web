import { Card, CardContent } from "~/components/ui/card";

type MetricCardProps = {
  label: string;
  value: string;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <Card className="@container/card h-full border-transparent bg-cv-cream shadow-none ring-1 ring-cv-border">
      <CardContent className="flex flex-col gap-2 py-4">
        <p className="text-[12px] font-semibold uppercase tracking-[1px] text-cv-steel">
          {label}
        </p>
        <p className="font-data text-[22px] leading-[1.3] font-medium text-cv-copper @md/card:text-[24px]">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
