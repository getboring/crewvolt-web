import { Link } from "react-router";

import { cn } from "~/lib/utils";

type RoleCardProps = {
  title: string;
  description?: string;
  href?: string;
  audience?: "owner" | "contractor";
};

export function RoleCard({ title, description, href, audience }: RoleCardProps) {
  const content = (
    <article
      className={cn(
        "h-full rounded-xl border border-cv-border bg-white p-5 shadow-sm transition-transform duration-[var(--cv-motion-normal)] hover:-translate-y-0.5 hover:shadow-md",
        href ? "cursor-pointer" : ""
      )}
    >
      {audience ? (
        <span
          className={cn(
            "inline-flex rounded-sm px-2 py-1 text-[10px] font-semibold tracking-[1px] uppercase",
            audience === "owner"
              ? "bg-cv-info-bg text-cv-navy"
              : "bg-cv-success-bg text-cv-field-green"
          )}
        >
          {audience} side
        </span>
      ) : null}
      <h3 className="mt-2 font-headline text-[18px] leading-[1.35] font-semibold text-cv-navy">
        {title}
      </h3>
      {description ? <p className="mt-2 text-sm leading-6 text-cv-steel">{description}</p> : null}
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link to={href} className="block h-full">
      {content}
    </Link>
  );
}
