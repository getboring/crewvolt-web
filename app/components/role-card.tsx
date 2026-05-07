import { Link } from "react-router";

import { cn } from "~/lib/utils";

type RoleCardProps = {
  title: string;
  description?: string;
  href?: string;
  audience?: "owner" | "contractor";
  code?: string;
};

export function RoleCard({ title, description, href, audience, code }: RoleCardProps) {
  const accent =
    audience === "owner"
      ? "border-l-cv-copper"
      : audience === "contractor"
        ? "border-l-cv-field-green"
        : "border-l-cv-pencil";

  const content = (
    <article
      className={cn(
        "group relative h-full border border-cv-rule-soft border-l-4 bg-cv-vellum-light p-5 transition-[transform,box-shadow,border-color] duration-[var(--cv-motion-normal)] ease-[var(--cv-ease)]",
        accent,
        href ? "hover:-translate-y-[2px] hover:shadow-[var(--cv-shadow-lift)] hover:border-cv-pencil cursor-pointer" : ""
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {audience ? (
            <p
              className={cn(
                "cv-mono text-[9px] font-medium uppercase tracking-[0.22em]",
                audience === "owner" ? "text-cv-copper" : "text-cv-field-green"
              )}
            >
              {audience === "owner" ? "Owner side" : "Contractor side"}
            </p>
          ) : null}
          <h3 className="mt-1 font-display text-[19px] font-medium leading-tight tracking-tight text-cv-pencil">
            {title}
          </h3>
        </div>
        {code ? (
          <span className="cv-mono text-[9px] uppercase tracking-[0.22em] text-cv-graphite-light">
            {code}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-cv-graphite">{description}</p>
      ) : null}
      {href ? (
        <span
          aria-hidden="true"
          className="cv-mono mt-4 inline-block text-[9px] font-semibold uppercase tracking-[0.22em] text-cv-graphite-light transition-colors group-hover:text-cv-copper"
        >
          Detail →
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
