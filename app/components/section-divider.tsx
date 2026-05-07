import { cn } from "~/lib/utils";

type SectionDividerProps = {
  className?: string;
  /** "centered" puts a short copper rule centered; "edge" runs a hairline edge to edge */
  variant?: "centered" | "edge";
};

export function SectionDivider({
  className,
  variant = "centered",
}: SectionDividerProps) {
  if (variant === "edge") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "mx-auto w-full max-w-6xl border-t border-cv-border",
          className,
        )}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("flex justify-center py-2", className)}
    >
      <span className="block h-px w-12 bg-cv-copper" />
    </div>
  );
}
