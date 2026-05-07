import { Link } from "react-router";

import { cn } from "~/lib/utils";

type IndustryCardProps = {
  title: string;
  description?: string;
  status: "Active" | "Hiring";
  currentlySeeking?: string;
  code?: string;
  href?: string;
};

export function IndustryCard({
  title,
  description,
  status,
  currentlySeeking,
  code,
  href,
}: IndustryCardProps) {
  const isHiring = status === "Hiring";

  const content = (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-cv-rule-soft bg-cv-vellum-light p-5 transition-[transform,box-shadow,border-color] duration-[var(--cv-motion-normal)] ease-[var(--cv-ease)]",
        href ? "hover:-translate-y-[2px] hover:shadow-[var(--cv-shadow-lift)] hover:border-cv-pencil cursor-pointer" : ""
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="cv-mono text-[9px] font-medium uppercase tracking-[0.22em] text-cv-graphite-light">
          {code ?? "SC"}
        </p>
        <span
          className={cn(
            "cv-mono inline-flex items-center gap-1.5 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]",
            isHiring
              ? "border border-cv-revision-red/60 text-cv-revision-red"
              : "border border-cv-success/60 text-cv-success"
          )}
        >
          <span
            className={cn(
              "block size-1 rounded-full",
              isHiring ? "cv-pulse-dot bg-cv-revision-red" : "bg-cv-success"
            )}
            aria-hidden="true"
          />
          {status}
        </span>
      </div>
      <h3 className="mt-3 font-display text-[24px] font-medium leading-[1.05] tracking-tight text-cv-pencil">
        {title}
      </h3>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-cv-graphite">{description}</p>
      ) : null}
      {currentlySeeking ? (
        <div className="mt-4 border-t border-cv-rule-soft pt-3">
          <p className="cv-slug-copper">Currently seeking</p>
          <p className="mt-1 text-sm leading-snug text-cv-graphite">{currentlySeeking}</p>
        </div>
      ) : null}
      {href ? (
        <span
          aria-hidden="true"
          className="cv-mono mt-auto pt-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-cv-graphite-light transition-colors group-hover:text-cv-copper"
        >
          Site detail →
        </span>
      ) : null}
    </article>
  );

  if (!href) return content;

  return (
    <Link to={href} className="block h-full">
      {content}
    </Link>
  );
}
