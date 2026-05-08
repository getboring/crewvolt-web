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

  // Trim absurdly long text to keep the layout clean
  const safeTitle = title.length > 90 ? title.slice(0, 87).trimEnd() + "…" : title;
  const safeSubtitle =
    subtitle.length > 180 ? subtitle.slice(0, 177).trimEnd() + "…" : subtitle;

  const html = `
    <div style="
      width:100%;
      height:100%;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      padding:80px 88px;
      background:linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 60%, ${NAVY} 100%);
      color:${PARCHMENT};
      font-family:system-ui,-apple-system,sans-serif;
      position:relative;
      overflow:hidden;
    ">
      <div style="
        position:absolute;
        right:-120px;
        top:-120px;
        width:520px;
        height:520px;
        border-radius:9999px;
        background:radial-gradient(closest-side, rgba(184,115,51,0.42), rgba(184,115,51,0));
      "></div>

      <div style="display:flex;flex-direction:column;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="
            width:36px;
            height:36px;
            background:${PARCHMENT};
            color:${NAVY};
            border-radius:6px;
            display:flex;
            align-items:center;
            justify-content:center;
            font-weight:800;
            font-size:18px;
            letter-spacing:1px;
          ">CV</div>
          <span style="
            font-size:18px;
            letter-spacing:5px;
            font-weight:700;
            text-transform:uppercase;
            color:${PARCHMENT};
          ">CREWVOLT</span>
        </div>
        <span style="
          margin-top:42px;
          font-size:14px;
          letter-spacing:3px;
          font-weight:700;
          text-transform:uppercase;
          color:${COPPER};
        ">${escapeHtml(eyebrow)}</span>
      </div>

      <div style="display:flex;flex-direction:column;max-width:1040px;">
        <div style="
          font-size:64px;
          line-height:1.05;
          font-weight:700;
          letter-spacing:-1px;
          color:${PARCHMENT};
          font-family:Georgia,serif;
        ">${escapeHtml(safeTitle)}</div>
        <div style="
          margin-top:28px;
          font-size:24px;
          line-height:1.45;
          color:${STEEL};
        ">${escapeHtml(safeSubtitle)}</div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;font-size:16px;color:${STEEL};">
        <span style="display:flex;align-items:center;gap:14px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:9999px;background:${COPPER};"></span>
          W-2 only · Workers comp · Five-region coverage
        </span>
        <span style="font-weight:600;color:${PARCHMENT};">crewvolt.com</span>
      </div>
    </div>
  `;

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

// `loader` is enough for a leaf "asset" route — no React component needed.
// We export an empty default so RR's typegen is happy.
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
