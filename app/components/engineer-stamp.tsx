import { cn } from "~/lib/utils";

type EngineerStampProps = {
  name?: string;
  title?: string;
  location?: string;
  className?: string;
};

export function EngineerStamp({
  name = "FOUNDER, CREWVOLT",
  title = "FORMER PROJECT MANAGER",
  location = "STATE OF TENNESSEE",
  className,
}: EngineerStampProps) {
  return (
    <div className={cn("inline-block", className)}>
      <svg
        viewBox="0 0 220 220"
        className="h-[180px] w-[180px]"
        role="img"
        aria-label="Founder stamp"
      >
        <defs>
          <path
            id="cv-stamp-arc-top"
            d="M 30,110 a 80,80 0 0,1 160,0"
            fill="none"
          />
          <path
            id="cv-stamp-arc-bottom"
            d="M 30,110 a 80,80 0 0,0 160,0"
            fill="none"
          />
        </defs>

        <circle
          cx="110"
          cy="110"
          r="98"
          fill="none"
          stroke="var(--cv-pencil)"
          strokeWidth="2"
        />
        <circle
          cx="110"
          cy="110"
          r="84"
          fill="none"
          stroke="var(--cv-pencil)"
          strokeWidth="1"
        />

        <text
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          letterSpacing="3"
          fill="var(--cv-pencil)"
        >
          <textPath href="#cv-stamp-arc-top" startOffset="50%" textAnchor="middle">
            {name}
          </textPath>
        </text>

        <text
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="var(--cv-pencil)"
        >
          <textPath href="#cv-stamp-arc-bottom" startOffset="50%" textAnchor="middle">
            {location}
          </textPath>
        </text>

        {/* Center monogram */}
        <text
          x="110"
          y="98"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="42"
          fontWeight="500"
          fill="var(--cv-pencil)"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          CV
        </text>
        <line
          x1="68"
          y1="118"
          x2="152"
          y2="118"
          stroke="var(--cv-pencil)"
          strokeWidth="1"
        />
        <text
          x="110"
          y="138"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="3"
          fill="var(--cv-pencil)"
        >
          {title}
        </text>
        <text
          x="110"
          y="156"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="3"
          fill="var(--cv-graphite-light)"
        >
          FOUNDED 2026
        </text>
      </svg>
    </div>
  );
}
