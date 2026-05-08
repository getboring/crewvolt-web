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

  // Satori (the engine workers-og uses) requires every multi-child div to
  // have explicit display:flex. To avoid whitespace-between-tags being
  // treated as text-node children, the template is built compactly with
  // no inter-tag whitespace.
  const root = `display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%;padding:80px 88px;background:linear-gradient(135deg,${NAVY_DARK} 0%,${NAVY} 60%,${NAVY} 100%);color:${PARCHMENT};font-family:system-ui,-apple-system,sans-serif;position:relative`;
  const orb = `display:block;position:absolute;right:-120px;top:-120px;width:520px;height:520px;border-radius:9999px;background:radial-gradient(closest-side,rgba(184,115,51,0.42),rgba(184,115,51,0))`;
  const head = `display:flex;flex-direction:column`;
  const wordmark = `display:flex;align-items:center`;
  const cvBox = `display:flex;align-items:center;justify-content:center;width:40px;height:40px;background:${PARCHMENT};color:${NAVY};border-radius:6px;font-weight:800;font-size:20px;letter-spacing:1px;margin-right:14px`;
  const cvText = `display:flex;font-size:20px;letter-spacing:5px;font-weight:700;color:${PARCHMENT}`;
  const eyebrowS = `display:flex;margin-top:42px;font-size:14px;letter-spacing:3px;font-weight:700;color:${COPPER}`;
  const titleWrap = `display:flex;flex-direction:column;max-width:1040px`;
  const titleS = `display:flex;font-size:64px;line-height:1.05;font-weight:700;letter-spacing:-1px;color:${PARCHMENT};font-family:Georgia,serif`;
  const subtitleS = `display:flex;margin-top:28px;font-size:24px;line-height:1.45;color:${STEEL}`;
  const footer = `display:flex;justify-content:space-between;align-items:center;font-size:16px;color:${STEEL}`;
  const footerLeft = `display:flex;align-items:center`;
  const dot = `display:block;width:8px;height:8px;border-radius:9999px;background:${COPPER};margin-right:14px`;
  const trustText = `display:flex`;
  const url2 = `display:flex;font-weight:600;color:${PARCHMENT}`;

  // Single-line concatenation — no whitespace between elements.
  const html =
    `<div style="${root}">` +
    `<div style="${orb}"></div>` +
    `<div style="${head}">` +
    `<div style="${wordmark}">` +
    `<div style="${cvBox}">CV</div>` +
    `<div style="${cvText}">CREWVOLT</div>` +
    `</div>` +
    `<div style="${eyebrowS}">${escapeHtml(eyebrow.toUpperCase())}</div>` +
    `</div>` +
    `<div style="${titleWrap}">` +
    `<div style="${titleS}">${escapeHtml(safeTitle)}</div>` +
    `<div style="${subtitleS}">${escapeHtml(safeSubtitle)}</div>` +
    `</div>` +
    `<div style="${footer}">` +
    `<div style="${footerLeft}">` +
    `<div style="${dot}"></div>` +
    `<div style="${trustText}">W-2 only · Workers comp · Five-region coverage</div>` +
    `</div>` +
    `<div style="${url2}">crewvolt.com</div>` +
    `</div>` +
    `</div>`;

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
      "Content-Type": "image/png",
    },
  });
}

export default function OgRoute() {
  return null;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
