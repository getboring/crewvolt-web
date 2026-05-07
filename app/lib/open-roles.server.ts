export type OpenRoleRow = {
  id: string;
  title: string;
  industry: string;
  region: string;
  status: "Open" | "Filling" | "Urgent";
  posted_at: string;
};

const fallbackRoles: OpenRoleRow[] = [
  {
    id: "fallback-001",
    title: "Electrical Inspector",
    industry: "Substation",
    region: "Tennessee",
    status: "Urgent",
    posted_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fallback-002",
    title: "QA/QC Manager",
    industry: "Solar",
    region: "Texas",
    status: "Open",
    posted_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fallback-003",
    title: "Civil Superintendent",
    industry: "Wind",
    region: "Midwest",
    status: "Filling",
    posted_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fallback-004",
    title: "High Voltage Inspector",
    industry: "BESS",
    region: "Southeast",
    status: "Open",
    posted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Fetch active open roles from D1, newest first.
 * Returns a hardcoded fallback if D1 is unreachable or the table is missing
 * (so the demo never shows an empty list).
 */
export async function listOpenRoles(
  db: D1Database | undefined,
  limit = 4,
): Promise<OpenRoleRow[]> {
  if (!db) return fallbackRoles.slice(0, limit);

  try {
    const result = await db
      .prepare(
        `SELECT id, title, industry, region, status, posted_at
         FROM open_roles
         WHERE active = 1
         ORDER BY posted_at DESC
         LIMIT ?1`,
      )
      .bind(limit)
      .all<OpenRoleRow>();

    if (!result.results || result.results.length === 0) {
      return fallbackRoles.slice(0, limit);
    }

    return result.results;
  } catch (err) {
    console.warn("listOpenRoles fallback (db query failed)", err);
    return fallbackRoles.slice(0, limit);
  }
}

/** Format an ISO timestamp as e.g. "3 days ago" */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const now = Date.now();
  const seconds = Math.max(0, Math.floor((now - then) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}
