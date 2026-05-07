import { relativeTime, type OpenRoleRow } from "~/lib/open-roles";

type SeedRow = Omit<OpenRoleRow, "posted_relative">;

const fallbackSeeds: SeedRow[] = [
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
function withRelative(rows: SeedRow[]): OpenRoleRow[] {
  return rows.map((r) => ({ ...r, posted_relative: relativeTime(r.posted_at) }));
}

export async function listOpenRoles(
  db: D1Database | undefined,
  limit = 4,
): Promise<OpenRoleRow[]> {
  if (!db) return withRelative(fallbackSeeds.slice(0, limit));

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
      .all<SeedRow>();

    if (!result.results || result.results.length === 0) {
      return withRelative(fallbackSeeds.slice(0, limit));
    }

    return withRelative(result.results);
  } catch (err) {
    console.warn("listOpenRoles fallback (db query failed)", err);
    return withRelative(fallbackSeeds.slice(0, limit));
  }
}
