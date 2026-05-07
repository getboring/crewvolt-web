export type SheetMeta = {
  number: string;
  title: string;
  scale: string;
};

const sheetMap: Record<string, SheetMeta> = {
  "/": { number: "E-001", title: "Cover", scale: "NTS" },
  "/about": { number: "E-002", title: "Project Brief", scale: "NTS" },
  "/services": { number: "E-003", title: "Scope of Work", scale: "1:1" },
  "/services/owner-side": { number: "E-003.1", title: "Scope — Owner Side", scale: "1:1" },
  "/services/contractor-side": { number: "E-003.2", title: "Scope — Contractor Side", scale: "1:1" },
  "/how-it-works": { number: "E-004", title: "Sequence of Operations", scale: "NTS" },
  "/industries": { number: "E-005", title: "Site Conditions", scale: "VAR" },
  "/why-crewvolt": { number: "E-006", title: "Specification", scale: "1:1" },
  "/staff-my-project": { number: "E-007", title: "Initial Intake — Owner", scale: "1:1" },
  "/join-our-network": { number: "E-008", title: "Initial Intake — Crew", scale: "1:1" },
  "/contact": { number: "E-009", title: "RFI Submission", scale: "NTS" },
  "/vendor-readiness": { number: "E-010", title: "Vendor Qualification", scale: "1:1" },
  "/blog": { number: "E-011", title: "Revision History", scale: "NTS" },
};

export function sheetForPath(path: string): SheetMeta {
  if (sheetMap[path]) return sheetMap[path];
  // Fall back to first matching prefix (handles trailing slashes / nested routes)
  const trimmed = path.replace(/\/+$/, "") || "/";
  if (sheetMap[trimmed]) return sheetMap[trimmed];
  return { number: "SHT 404", title: "Not in Drawing Set", scale: "—" };
}

export const PROJECT_NUMBER = "CV-2026-001";
export const PROJECT_NAME = "CREWVOLT — ENERGY INFRA STAFFING";
export const ISSUE_DATE = "2026.05";
