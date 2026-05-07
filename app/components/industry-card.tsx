import { Link } from "react-router";

import { cn } from "~/lib/utils";

type IndustryCardProps = {
  title: string;
  description?: string;
  status: "Active" | "Hiring";
  href?: string;
};

export function IndustryCard({ title, description, status, href }: IndustryCardProps) {
  const badgeClass =
    status === "Hiring" ? "bg-cv-warning-bg text-cv-amber" : "bg-cv-success-bg text-cv-success";

  const content = (
    <article
      className={cn(
        "h-full rounded-xl border border-cv-border bg-white p-5 shadow-sm transition-transform duration-[var(--cv-motion-normal)] hover:-translate-y-0.5 hover:shadow-md",
        href ? "cursor-pointer" : ""
      )}
    >
      <span className={cn("inline-flex rounded-sm px-2 py-1 text-[10px] font-semibold tracking-[1px] uppercase", badgeClass)}>
        {status}
      </span>
      <h3 className="mt-2 font-headline text-[18px] leading-[1.35] font-semibold text-cv-navy">{title}</h3>
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
