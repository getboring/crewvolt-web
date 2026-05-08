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
  /** Index of the column representing CrewVolt — gets accent styling */
  highlightColumn?: number;
  className?: string;
};

const markIcon = {
  yes: Check,
  no: X,
  partial: Minus,
} as const;

const markStyle = {
  yes: "bg-cv-success-bg text-cv-success",
  no: "bg-cv-danger-bg text-cv-danger",
  partial: "bg-cv-cream text-cv-steel",
} as const;

const markLabel = {
  yes: "Yes",
  no: "No",
  partial: "Partial",
} as const;

export function ComparisonMatrix({
  columns,
  rows,
  highlightColumn = 0,
  className,
}: ComparisonMatrixProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-cv-border bg-white shadow-sm",
        className,
      )}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-cv-border">
            <th
              scope="col"
              className="w-[40%] px-5 py-4 align-bottom text-xs font-semibold uppercase tracking-[1.2px] text-cv-steel"
            >
              <span>Specification</span>
            </th>
            {columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "px-4 py-4 align-bottom",
                  i === highlightColumn ? "bg-cv-cream" : "",
                )}
              >
                <p
                  className={cn(
                    "font-headline text-base font-semibold leading-tight md:text-[17px]",
                    i === highlightColumn ? "text-cv-navy" : "text-cv-steel",
                  )}
                >
                  {col}
                </p>
                {i === highlightColumn ? (
                  <p className="mt-1 text-[10px] uppercase tracking-[1.4px] text-cv-copper">
                    Our model
                  </p>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={row.label}
              className={cn(rowIdx % 2 === 1 ? "bg-cv-cream/40" : "")}
            >
              <td className="border-b border-cv-border-light px-5 py-3.5 align-top">
                <p className="text-sm font-medium leading-snug text-cv-charcoal">
                  {row.label}
                </p>
                {row.note ? (
                  <p className="mt-1 text-xs leading-snug text-cv-steel">
                    {row.note}
                  </p>
                ) : null}
              </td>
              {row.values.map((mark, colIdx) => {
                const Icon = markIcon[mark];
                return (
                  <td
                    key={`${row.label}-${colIdx}`}
                    className={cn(
                      "border-b border-cv-border-light px-4 py-3.5 align-top",
                      colIdx === highlightColumn ? "bg-cv-cream" : "",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex items-center justify-center rounded-full p-1.5",
                        markStyle[mark],
                      )}
                    >
                      <Icon
                        className="size-4"
                        aria-label={markLabel[mark]}
                      />
                    </span>
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
