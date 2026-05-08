import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type StepCardProps = {
  step: number;
  title: string;
  body: string;
};

export function StepCard({ step, title, body }: StepCardProps) {
  return (
    <Card className="@container/card cv-reveal-up h-full border-transparent bg-white shadow-sm ring-1 ring-cv-border">
      <CardHeader>
        <p
          aria-hidden="true"
          className="font-data text-[22px] leading-[1.3] font-medium text-cv-copper"
        >
          {step}
        </p>
        <CardTitle className="font-headline text-lg leading-snug font-semibold text-cv-navy @md/card:text-[19px]">
          <span className="sr-only">Step {step}: </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-cv-steel">{body}</p>
      </CardContent>
    </Card>
  );
}
