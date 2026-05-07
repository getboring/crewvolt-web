import { cn } from "~/lib/utils";

type NorthArrowProps = {
  rotation?: number;
  className?: string;
};

export function NorthArrow({ rotation = 0, className }: NorthArrowProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5 text-cv-pencil", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <polygon
        points="12,2.5 14.5,13 12,11 9.5,13"
        fill="currentColor"
      />
      <polygon
        points="12,21.5 14.5,11 12,13 9.5,11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        x="12"
        y="7"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="3.6"
        fontWeight="700"
        fill="var(--cv-vellum)"
        opacity="0"
      >
        N
      </text>
    </svg>
  );
}
