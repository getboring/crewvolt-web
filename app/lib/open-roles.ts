/**
 * Client-safe shared types + helpers for open roles.
 * Server-only D1 fetching lives in open-roles.server.ts.
 */

export type OpenRoleStatus = "Open" | "Filling" | "Urgent";

export type OpenRoleRow = {
  id: string;
  title: string;
  industry: string;
  region: string;
  status: OpenRoleStatus;
  posted_at: string;
};

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
