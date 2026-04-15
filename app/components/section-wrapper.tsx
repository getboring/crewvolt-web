import type { ReactNode } from "react";

import { cn } from "~/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  tone?: "parchment" | "white";
  className?: string;
  innerClassName?: string;
};

export function SectionWrapper({
  children,
  tone = "parchment",
  className,
  innerClassName,
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-20",
        tone === "parchment" ? "bg-cv-parchment" : "bg-white",
        className
      )}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", innerClassName)}>{children}</div>
    </section>
  );
}
