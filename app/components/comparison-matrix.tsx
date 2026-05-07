import { Check, Minus, X } from "lucide-react";

import { cn } from "~/lib/utils";

type Mark = "yes" | "no" | "partial";

type ComparisonRow = {
  label: string;
  values: Mark[];
  note?: string;
};

type ComparisonMatrixProps = {
  columns: string[];
  rows: ComparisonRow[];
  /** Index of the column representing "us" — gets accented styling */
  highlightColumn?: number;
  className?: string;
};

const markIcon = {
  yes: Check,
  no: X,
  partial: Minus,
} as const;

const markColor = {
  yes: "text-cv-success",
  no: "text-cv-revision-red",
  partial: "text-cv-graphite-mute",
} as const;

export function ComparisonMatrix({
  columns,
  rows,
  highlightColumn = 0,
  className,
}: ComparisonMatrixProps) {
  return (
    <div className={cn("cv-paper-flat overflow-x-auto", className)}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-cv-pencil">
            <th className="cv-slug w-[34%] px-4 py-3 align-bottom">
              <span>Specification</span>
            </th>
            {columns.map((col, i) => (
              <th
                key={col}
                className={cn(
                  "px-4 py-3 align-bottom",
                  i === highlightColumn ? "bg-cv-vellum" : ""
                )}
              >
                <p className="cv-mono text-[10px] uppercase tracking-[0.2em] text-cv-graphite-light">
                  Item {String.fromCharCode(65 + i)}
                </p>
                <p
                  className={cn(
                    "mt-1 font-display text-base font-medium leading-tight",
                    i === highlightColumn ? "text-cv-pencil" : "text-cv-graphite"
                  )}
                >
                  {col}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={row.label}
              className={cn(rowIdx % 2 === 1 ? "bg-cv-vellum/40" : "")}
            >
              <td className="border-b border-cv-rule-soft px-4 py-3 align-top">
                <p className="text-sm font-medium text-cv-pencil">{row.label}</p>
                {row.note ? (
                  <p className="cv-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-cv-graphite-light">
                    {row.note}
                  </p>
                ) : null}
              </td>
              {row.values.map((mark, colIdx) => {
                const Icon = markIcon[mark];
                const colorClass = markColor[mark];
                return (
                  <td
                    key={`${row.label}-${colIdx}`}
                    className={cn(
                      "border-b border-cv-rule-soft px-4 py-3 align-top",
                      colIdx === highlightColumn ? "bg-cv-vellum" : ""
                    )}
                  >
                    <Icon className={cn("size-4", colorClass)} aria-label={mark} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
