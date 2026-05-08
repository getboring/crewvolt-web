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

type IndustryTone = {
  /** Body accent for "Common roles" prefix */
  accent: string;
  /** Subtle gradient overlay over the photo (anchors brand tone) */
  overlay: string;
  /** Icon color shown over the photo */
  icon: string;
};

const toneByIndustry: Record<IndustryId, IndustryTone> = {
  substations: {
    accent: "text-cv-copper",
    overlay: "from-cv-navy/85 via-cv-navy/30 to-transparent",
    icon: "text-cv-copper-light",
  },
  wind: {
    accent: "text-cv-field-green",
    overlay: "from-cv-field-green/80 via-cv-navy-dark/30 to-transparent",
    icon: "text-white",
  },
  solar: {
    accent: "text-cv-amber",
    overlay: "from-cv-navy-dark/70 via-cv-amber/15 to-transparent",
    icon: "text-white",
  },
  bess: {
    accent: "text-cv-copper",
    overlay: "from-cv-navy-dark/85 via-cv-charcoal/30 to-transparent",
    icon: "text-cv-copper-light",
  },
  transmission: {
    accent: "text-cv-copper",
    overlay: "from-cv-charcoal/85 via-cv-navy-dark/30 to-transparent",
    icon: "text-cv-copper-light",
  },
  "grid-modernization": {
    accent: "text-cv-copper",
    overlay: "from-cv-navy/80 via-cv-navy-light/20 to-transparent",
    icon: "text-cv-copper-light",
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

const imageByIndustry: Record<IndustryId, string> = {
  substations: "/img/industry-substations.jpg",
  wind: "/img/industry-wind.jpg",
  solar: "/img/industry-solar.jpg",
  bess: "/img/industry-bess.jpg",
  transmission: "/img/industry-transmission.jpg",
  "grid-modernization": "/img/industry-grid-mod.jpg",
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
  const imageSrc = imageByIndustry[id];

  const inner = (
    <Card
      className={cn(
        "@container/card group h-full overflow-hidden border-transparent bg-white shadow-sm ring-1 ring-cv-border transition-all duration-200",
        href ? "hover:-translate-y-0.5 hover:shadow-md hover:ring-cv-copper/40" : "",
      )}
    >
      {/* Visual header — real photography under a brand-tone gradient overlay */}
      <div
        aria-hidden="true"
        className="relative -mx-px -mt-px h-32 overflow-hidden md:h-36"
      >
        <img
          src={imageSrc}
          alt=""
          width={900}
          height={600}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-tr",
            tone.overlay,
          )}
        />
        <Icon
          className={cn(
            "absolute right-5 top-5 size-9 transition-transform duration-300 group-hover:scale-110",
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
