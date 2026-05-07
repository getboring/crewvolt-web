import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

type RoleCardProps = {
  title: string;
  description?: string;
  href?: string;
  audience?: "owner" | "contractor";
};

export function RoleCard({ title, description, href, audience }: RoleCardProps) {
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
        <div className="flex items-start justify-between gap-3">
          {audience ? (
            <Badge
              variant="outline"
              className={cn(
                "rounded-sm border-cv-border-light text-[10px] font-semibold uppercase tracking-[1px]",
                audience === "owner"
                  ? "bg-cv-info-bg text-cv-navy"
                  : "bg-cv-success-bg text-cv-field-green",
              )}
            >
              {audience} side
            </Badge>
          ) : (
            <span aria-hidden="true" />
          )}
          {href ? (
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-cv-steel transition-colors group-hover/card:text-cv-copper"
            />
          ) : null}
        </div>
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
    <Link to={href} className="group/card-link block h-full">
      {inner}
    </Link>
  );
}
