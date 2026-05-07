import type { ReactNode } from "react";

import { cn } from "~/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  /** Visual surface treatment. */
  tone?: "vellum" | "vellum-dark" | "blueprint" | "pencil" | "white";
  /** Show a subtle drawing grid behind the section content. */
  grid?: boolean;
  /** Optional eyebrow rendered above the section. Drafting-slug styling. */
  eyebrow?: string;
  /** Optional sheet number rendered in upper-right (e.g. "DETAIL 1"). */
  badge?: string;
  className?: string;
  innerClassName?: string;
  /** Sets the inner content max width. Defaults to 7xl (1280px). */
  width?: "default" | "narrow" | "wide";
};

const toneClasses: Record<NonNullable<SectionWrapperProps["tone"]>, string> = {
  vellum: "bg-cv-vellum text-cv-pencil",
  "vellum-dark": "bg-cv-vellum-dark text-cv-pencil",
  blueprint: "cv-blueprint-grid text-cv-vellum",
  pencil: "bg-cv-pencil text-cv-vellum",
  white: "bg-cv-vellum-light text-cv-pencil",
};

export function SectionWrapper({
  children,
  tone = "vellum",
  grid = false,
  eyebrow,
  badge,
  className,
  innerClassName,
  width = "default",
}: SectionWrapperProps) {
  const widthClass =
    width === "narrow"
      ? "max-w-4xl"
      : width === "wide"
        ? "max-w-[88rem]"
        : "max-w-7xl";

  return (
    <section
      className={cn(
        "relative isolate py-16 md:py-24",
        toneClasses[tone],
        className
      )}
    >
      {grid ? (
        <div
          aria-hidden="true"
          className="cv-drawing-grid pointer-events-none absolute inset-0 opacity-60"
        />
      ) : null}

      <div
        className={cn(
          "relative mx-auto w-full px-5 md:px-8",
          widthClass,
          innerClassName
        )}
      >
        {(eyebrow || badge) && (
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-cv-rule-soft pb-3">
            <p className="cv-slug-copper">{eyebrow}</p>
            {badge ? (
              <p className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
                {badge}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
