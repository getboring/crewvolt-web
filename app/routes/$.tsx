import { Link } from "react-router";

import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/$";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Not in drawing set | CrewVolt",
    description: "The page you are looking for is not part of the CrewVolt drawing set.",
    path: "/404",
  });
}

export function links() {
  return canonicalLinks("/404");
}

export default function CatchAllRoute(_: Route.ComponentProps) {
  return (
    <SectionWrapper tone="vellum" eyebrow="Sheet — error" badge="Sheet 404">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="cv-display text-[clamp(3rem,7vw,5.5rem)]">
            Not in the
            <em className="cv-display-italic"> drawing set.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-cv-graphite">
            This sheet does not exist in the current revision. Try one of the linked sheets, or
            check back after the next revision is issued.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/staff-my-project">Staff a project →</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/join-our-network">Join the network →</Link>
            </Button>
            <Button asChild variant="link">
              <Link to="/">Return to cover sheet →</Link>
            </Button>
          </div>
        </div>

        <aside className="cv-paper-flat self-start">
          <div className="border-b border-cv-pencil px-5 py-3">
            <p className="cv-slug-copper">Drawing set — current revision</p>
          </div>
          <ul className="divide-y divide-cv-rule-soft text-sm">
            {[
              ["E-001", "Cover", "/"],
              ["E-003", "Scope of Work", "/services"],
              ["E-005", "Site Conditions", "/industries"],
              ["E-006", "Specification", "/why-crewvolt"],
              ["E-007", "Initial Intake — Owner", "/staff-my-project"],
              ["E-008", "Initial Intake — Crew", "/join-our-network"],
            ].map(([num, title, to]) => (
              <li key={num}>
                <Link
                  to={to}
                  className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-cv-vellum"
                >
                  <span className="cv-mono w-[44px] text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
                    {num}
                  </span>
                  <span className="text-cv-pencil">{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </SectionWrapper>
  );
}
