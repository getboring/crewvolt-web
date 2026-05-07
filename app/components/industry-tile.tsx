import { Battery, GitBranch, Sun, type LucideIcon, Wind, Zap, ZapOff } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export type IndustryId =
  | "substations"
  | "wind"
  | "solar"
  | "bess"
  | "transmission"
  | "grid-modernization";

type ToneClasses = {
  /** Header band background — subtle gradient using brand tokens */
  band: string;
  /** Icon color */
  icon: string;
  /** Body accent for "Common roles" prefix */
  accent: string;
};

const toneByIndustry: Record<IndustryId, ToneClasses> = {
  substations: {
    band: "bg-gradient-to-br from-cv-navy to-cv-navy-light",
    icon: "text-cv-copper-light",
    accent: "text-cv-copper",
  },
  wind: {
    band: "bg-gradient-to-br from-cv-field-green to-cv-navy-dark",
    icon: "text-white",
    accent: "text-cv-field-green",
  },
  solar: {
    band: "bg-gradient-to-br from-cv-amber to-cv-copper-dark",
    icon: "text-white",
    accent: "text-cv-amber",
  },
  bess: {
    band: "bg-gradient-to-br from-cv-navy-dark to-cv-charcoal",
    icon: "text-cv-copper-light",
    accent: "text-cv-copper",
  },
  transmission: {
    band: "bg-gradient-to-br from-cv-charcoal to-cv-navy-dark",
    icon: "text-cv-copper-light",
    accent: "text-cv-copper",
  },
  "grid-modernization": {
    band: "bg-gradient-to-br from-cv-navy-light to-cv-navy",
    icon: "text-cv-copper-light",
    accent: "text-cv-copper",
  },
};

const iconByIndustry: Record<IndustryId, LucideIcon> = {
  substations: Zap,
  wind: Wind,
  solar: Sun,
  bess: Battery,
  transmission: ZapOff,
  "grid-modernization": GitBranch,
};

type IndustryTileProps = {
  id: IndustryId;
  title: string;
  description?: string;
  status: "Active" | "Hiring";
  currentlySeeking?: string;
  href?: string;
};

export function IndustryTile({
  id,
  title,
  description,
  status,
  currentlySeeking,
  href,
}: IndustryTileProps) {
  const tone = toneByIndustry[id];
  const Icon = iconByIndustry[id];

  const inner = (
    <Card
      className={cn(
        "@container/card group h-full overflow-hidden border-transparent bg-white shadow-sm ring-1 ring-cv-border transition-all duration-200",
        href ? "hover:-translate-y-0.5 hover:shadow-md hover:ring-cv-copper/40" : "",
      )}
    >
      {/* Visual header band with industry icon */}
      <div
        aria-hidden="true"
        className={cn(
          "relative -mx-px -mt-px h-24 overflow-hidden",
          tone.band,
        )}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        <Icon
          className={cn(
            "absolute right-5 top-5 size-12 transition-transform duration-300 group-hover:scale-110",
            tone.icon,
          )}
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-headline text-lg leading-snug font-semibold text-cv-navy @md/card:text-[20px]">
            {title}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 rounded-sm border-transparent text-[10px] font-semibold uppercase tracking-[1px]",
              status === "Hiring"
                ? "bg-cv-warning-bg text-cv-amber"
                : "bg-cv-success-bg text-cv-success",
            )}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>

      {description ? (
        <CardContent>
          <p className="text-sm leading-6 text-cv-steel">{description}</p>
          {currentlySeeking ? (
            <p className="mt-4 border-t border-cv-border-light pt-3 text-xs leading-6 text-cv-charcoal">
              <span
                className={cn(
                  "mr-1 font-semibold uppercase tracking-[1px]",
                  tone.accent,
                )}
              >
                Currently seeking ·
              </span>{" "}
              {currentlySeeking}
            </p>
          ) : null}
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
