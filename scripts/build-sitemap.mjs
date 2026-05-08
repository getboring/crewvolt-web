#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from the route table at build time.
 * Run via the `prebuild` npm script so it always reflects the current
 * routes and lastmod is always today's UTC date.
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const BASE_URL = "https://crewvolt.com";

// Route → priority + changefreq mapping. Mirrors what was in the prior
// hand-maintained sitemap.
const routes = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/services", priority: 0.9, changefreq: "monthly" },
  { path: "/services/owner-side", priority: 0.8, changefreq: "monthly" },
  { path: "/services/contractor-side", priority: 0.8, changefreq: "monthly" },
  { path: "/how-it-works", priority: 0.8, changefreq: "monthly" },
  { path: "/industries", priority: 0.85, changefreq: "monthly" },
  { path: "/why-crewvolt", priority: 0.85, changefreq: "monthly" },
  { path: "/staff-my-project", priority: 0.95, changefreq: "weekly" },
  { path: "/join-our-network", priority: 0.95, changefreq: "weekly" },
  { path: "/contact", priority: 0.7, changefreq: "monthly" },
  { path: "/vendor-readiness", priority: 0.6, changefreq: "monthly" },
  { path: "/blog", priority: 0.5, changefreq: "weekly" },
];

const today = new Date().toISOString().slice(0, 10);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${r.path === "/" ? "/" : r.path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority.toFixed(1)}</priority>`,
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");

const outPath = path.join(root, "public", "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");

console.log(
  `[build-sitemap] wrote ${routes.length} routes to ${path.relative(root, outPath)} (lastmod ${today})`,
);
