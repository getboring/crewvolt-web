import { cn } from "~/lib/utils";

type RevisionTriangleProps = {
  number: string | number;
  className?: string;
  tone?: "copper" | "red" | "navy";
};

export function RevisionTriangle({ number, className, tone = "copper" }: RevisionTriangleProps) {
  const fill =
    tone === "red"
      ? "fill-cv-revision-red"
      : tone === "navy"
        ? "fill-cv-navy"
        : "fill-cv-copper";

  return (
    <span
      className={cn(
        "relative inline-flex h-5 w-5 items-center justify-center text-[9px] font-semibold leading-none",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 20 20"
        className={cn("absolute inset-0 h-5 w-5", fill)}
        aria-hidden="true"
      >
        <polygon points="10,1 19,18 1,18" />
      </svg>
      <span className="relative -mt-0.5 cv-mono font-bold text-cv-vellum">{number}</span>
    </span>
  );
}
