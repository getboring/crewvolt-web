import { Link } from "react-router";

import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/blog._index";

const revisions = [
  { rev: "Rev 04", date: "—", note: "Field insights & hiring trends — content forthcoming" },
  { rev: "Rev 03", date: "2026.05", note: "Site re-issued under Drawing Set 2026 (E-001…E-011)" },
  { rev: "Rev 02", date: "2026.04", note: "Marketing audit applied — SEO, CTAs, social proof, schema" },
  { rev: "Rev 01", date: "2026.04", note: "Initial issue — CrewVolt LLC formed in Tennessee" },
];

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Revision History | CrewVolt",
    description:
      "Updates and revisions to the CrewVolt drawing set. Industry insights, hiring trends, and field perspectives in development.",
    path: "/blog",
  });
}

export function links() {
  return canonicalLinks("/blog");
}

export default function BlogIndexRoute() {
  return (
    <>
      <SectionWrapper tone="vellum" eyebrow="Revision history" badge="Sheet E-011">
        <h1 className="cv-display text-[clamp(2.5rem,5vw,4.5rem)]">
          Field
          <em className="cv-display-italic"> insights.</em>
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-cv-graphite">
          We are building out a content library covering hiring trends, workforce data, and
          insights from the field. Until then, this is the revision history of the public
          drawing set.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="white" eyebrow="Drawing set revisions" badge="REV 01–04">
        <div className="cv-paper-flat">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-cv-pencil">
                <th className="cv-slug px-5 py-3 align-bottom">Rev</th>
                <th className="cv-slug px-5 py-3 align-bottom">Date</th>
                <th className="cv-slug px-5 py-3 align-bottom">Notes</th>
              </tr>
            </thead>
            <tbody>
              {revisions.map((r, i) => (
                <tr
                  key={r.rev}
                  className={i % 2 === 1 ? "bg-cv-vellum/40" : ""}
                >
                  <td className="border-b border-cv-rule-soft px-5 py-3 align-top">
                    <span className="cv-mono text-[12px] uppercase tracking-[0.2em] text-cv-copper">
                      {r.rev}
                    </span>
                  </td>
                  <td className="border-b border-cv-rule-soft px-5 py-3 align-top">
                    <span className="cv-mono text-[12px] uppercase tracking-[0.18em] text-cv-graphite">
                      {r.date}
                    </span>
                  </td>
                  <td className="border-b border-cv-rule-soft px-5 py-3 align-top text-sm leading-relaxed text-cv-pencil">
                    {r.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/staff-my-project">Staff my project →</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/join-our-network">Join the network →</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
