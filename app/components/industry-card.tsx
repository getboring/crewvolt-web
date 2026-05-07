import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

type IndustryCardProps = {
  title: string;
  description?: string;
  status: "Active" | "Hiring";
  href?: string;
};

export function IndustryCard({
  title,
  description,
  status,
  href,
}: IndustryCardProps) {
  const inner = (
    <Card
      className={cn(
        "@container/card h-full border-transparent bg-white shadow-sm ring-1 ring-cv-border transition-all duration-200",
        href
          ? "hover:-translate-y-0.5 hover:shadow-md hover:ring-cv-copper/40"
          : "",
      )}
    >
      <CardHeader>
        <Badge
          variant="outline"
          className={cn(
            "rounded-sm border-transparent text-[10px] font-semibold uppercase tracking-[1px]",
            status === "Hiring"
              ? "bg-cv-warning-bg text-cv-amber"
              : "bg-cv-success-bg text-cv-success",
          )}
        >
          {status}
        </Badge>
        <CardTitle className="mt-2 font-headline text-lg leading-snug font-semibold text-cv-navy @md/card:text-[19px]">
          {title}
        </CardTitle>
      </CardHeader>
      {description ? (
        <CardContent>
          <p className="text-sm leading-6 text-cv-steel">{description}</p>
        </CardContent>
      ) : null}
    </Card>
  );

  if (!href) return inner;

  return (
    <Link to={href} className="block h-full">
      {inner}
    </Link>
  );
}
