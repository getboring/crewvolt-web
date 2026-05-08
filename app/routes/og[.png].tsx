import { ImageResponse } from "workers-og";

import type { Route } from "./+types/og[.png]";

const NAVY = "#1B365D";
const NAVY_DARK = "#0F2240";
const COPPER = "#B87333";
const PARCHMENT = "#F7F4EF";
const STEEL = "#94A3B8";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const title =
    url.searchParams.get("title") ?? "Energy Infrastructure Staffing";
  const subtitle =
    url.searchParams.get("subtitle") ??
    "W-2 contract staffing for substations, wind, solar, BESS, transmission.";
  const eyebrow = url.searchParams.get("eyebrow") ?? "CrewVolt";

  const safeTitle = title.length > 90 ? title.slice(0, 87).trimEnd() + "…" : title;
  const safeSubtitle =
    subtitle.length > 180 ? subtitle.slice(0, 177).trimEnd() + "…" : subtitle;

  // Compact, every multi-child element has explicit display:flex.
  // Root uses explicit pixel dimensions — Satori does not implement
  // 'width:100%' the way browsers do, the canvas needs explicit sizing.
  const html =
    `<div style="display:flex;flex-direction:column;justify-content:space-between;width:1200px;height:630px;padding:80px;background-color:${NAVY_DARK};background-image:linear-gradient(135deg,${NAVY_DARK},${NAVY});color:${PARCHMENT};font-family:system-ui,sans-serif">` +
    `<div style="display:flex;flex-direction:column">` +
    `<div style="display:flex;font-size:22px;font-weight:700;letter-spacing:6px;color:${PARCHMENT}">CREWVOLT</div>` +
    `<div style="display:flex;margin-top:36px;font-size:14px;letter-spacing:3px;font-weight:700;color:${COPPER}">${escapeHtml(eyebrow.toUpperCase())}</div>` +
    `</div>` +
    `<div style="display:flex;flex-direction:column">` +
    `<div style="display:flex;font-size:64px;line-height:1.05;font-weight:700;letter-spacing:-1px;color:${PARCHMENT};font-family:Georgia,serif">${escapeHtml(safeTitle)}</div>` +
    `<div style="display:flex;margin-top:28px;font-size:24px;line-height:1.45;color:${STEEL}">${escapeHtml(safeSubtitle)}</div>` +
    `</div>` +
    `<div style="display:flex;justify-content:space-between;font-size:16px;color:${STEEL}">` +
    `<div style="display:flex">W-2 only · Workers comp · Five-region coverage</div>` +
    `<div style="display:flex;font-weight:600;color:${PARCHMENT}">crewvolt.com</div>` +
    `</div>` +
    `</div>`;

  // Throw the Response so RR7 short-circuits before route-component
  // rendering. (Returning works in some cases but RR7 wraps non-`throw`
  // responses inside the SSR HTML shell, defeating image serving.)
  throw new ImageResponse(html, {
    width: 1200,
    height: 630,
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
      "Content-Type": "image/png",
    },
  });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
