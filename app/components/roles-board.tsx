import { Link } from "react-router";

import { RevisionTriangle } from "~/components/revision-triangle";
import { cn } from "~/lib/utils";

export type OpenRole = {
  code: string;
  title: string;
  industry: string;
  region: string;
  postedDays: number;
  status: "Open" | "Filling" | "Urgent";
};

const sampleRoles: OpenRole[] = [
  {
    code: "FDR-014",
    title: "Electrical Inspector",
    industry: "Substation",
    region: "Tennessee",
    postedDays: 2,
    status: "Urgent",
  },
  {
    code: "FDR-013",
    title: "QA/QC Manager",
    industry: "Solar",
    region: "Texas",
    postedDays: 6,
    status: "Open",
  },
  {
    code: "FDR-012",
    title: "Civil Superintendent",
    industry: "Wind",
    region: "Midwest",
    postedDays: 9,
    status: "Filling",
  },
  {
    code: "FDR-011",
    title: "High Voltage Inspector",
    industry: "BESS",
    region: "Southeast",
    postedDays: 14,
    status: "Open",
  },
];

type RolesBoardProps = {
  roles?: OpenRole[];
  /** Optional: hide the per-role apply CTA when board is shown on the network page itself */
  hideApply?: boolean;
};

export function RolesBoard({ roles = sampleRoles, hideApply = false }: RolesBoardProps) {
  return (
    <div className="cv-paper-flat">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-cv-pencil px-5 py-3">
        <div>
          <p className="cv-slug-copper">Open positions — Rev 14</p>
          <p className="mt-1 cv-h3 text-[22px]">Currently filling</p>
        </div>
        <p className="cv-mono text-[10px] uppercase tracking-[0.22em] text-cv-graphite-light">
          Drawn 2026.05 · Last revised today
        </p>
      </header>
      <ul role="list" className="divide-y divide-cv-rule-soft">
        {roles.map((role, i) => (
          <li
            key={role.code}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 md:grid-cols-[auto_1.4fr_1fr_1fr_auto]"
          >
            <RevisionTriangle
              number={i + 1}
              tone={role.status === "Urgent" ? "red" : "copper"}
            />
            <div className="min-w-0">
              <p className="font-display text-[17px] font-medium leading-tight text-cv-pencil">
                {role.title}
              </p>
              <p className="cv-mono mt-0.5 text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
                {role.code} · {role.industry}
              </p>
            </div>
            <p className="hidden cv-mono text-[11px] uppercase tracking-[0.16em] text-cv-graphite md:block">
              {role.region}
            </p>
            <p className="hidden cv-mono text-[11px] uppercase tracking-[0.16em] text-cv-graphite md:block">
              <span
                className={cn(
                  "mr-1.5 inline-block size-1.5 rounded-full",
                  role.status === "Urgent"
                    ? "cv-pulse-dot bg-cv-revision-red"
                    : role.status === "Filling"
                      ? "bg-cv-amber"
                      : "bg-cv-success"
                )}
              />
              {role.status}
              <span className="ml-2 text-cv-graphite-light">
                · {role.postedDays}d
              </span>
            </p>
            {hideApply ? (
              <span className="cv-mono text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
                Apply ↓
              </span>
            ) : (
              <Link
                to="/join-our-network"
                className="cv-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cv-copper hover:text-cv-copper-dark"
              >
                Apply →
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
