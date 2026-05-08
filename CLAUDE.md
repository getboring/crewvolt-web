# CrewVolt Web — Project Notes

## Purpose

CrewVolt marketing website and lead intake system.

- Audience 1: project owners and EPC clients who need staffing
- Audience 2: experienced field professionals looking for W-2 contract work

## Production status

- Worker URL: `https://crewvolt-web.codyboring.workers.dev`
- GitHub: `https://github.com/getboring/crewvolt-web`
- Cloudflare Worker: `crewvolt-web`
- D1: `crewvolt-db` (`983b5f01-d94a-45e8-870f-8c76a7c57f08`)
- R2: `crewvolt-uploads`

## Stack (current as of 2026-05-08)

- React Router v7.15 (framework mode) — uses `viewTransition` prop on internal `<Link>` components for smooth route crossfades (gated on `prefers-reduced-motion`)
- Cloudflare Workers + Wrangler 4.90 + `@cloudflare/vite-plugin` 1.36
- Tailwind CSS v4.2.4 with custom CrewVolt tokens in `app/styles/app.css`
- shadcn/ui (radix-ui) primitives in `app/components/ui/`
- React 19.2.6 + React DOM 19.2.6
- React Hook Form 7.75 + Zod 3.25 (Zod v4 is incompatible with @hookform/resolvers 5.2 type-side; revisit after resolver 5.3+)
- TypeScript 6.0 (deprecated `baseUrl` removed from `tsconfig.json` — `paths` resolve relative to tsconfig location)
- Vitest 4.1 for unit tests
- workers-og for per-page dynamic OG PNGs
- Cloudflare D1 + R2 + Workers runtime + Resend (notifications)

## Routes (14)

```
/                          Home (12 numbered sections)
/about                     About + transmission-tower image bleed
/services                  Services overview + mini-nav (Owner / Contractor / Project-specific anchors)
/services/owner-side       Owner-side roles
/services/contractor-side  Contractor-side roles
/how-it-works              Sequence — for clients (01) + for workers (02)
/industries                6-tile gradient + Lucide icon grid
/why-crewvolt              Comparison matrix (4-column) + FAQ accordion
/staff-my-project          Owner intake form (FormSuccess on submit)
/join-our-network          Crew intake form + CurrentlyFilling top + FormSuccess
/contact                   RFI form + phone/email/quick-links aside
/vendor-readiness          Vendor onboarding checklist
/blog                      Placeholder ("coming soon")
*                          404 catch-all
```

## Live elements (D1 + dynamic data)

- **`open_roles` table** (`workers/migrations/0002_open_roles.sql`) — id, title, industry, region, status (Open/Filling/Urgent), posted_at, active. Indexed on (active, posted_at DESC). Seeded with 4 rows. To add or update roles for the demo, edit rows in the remote DB:
  ```bash
  pnpm exec wrangler d1 execute crewvolt-db --remote --command "..."
  ```
- **`<CurrentlyFilling>`** — reads from D1 via the route loader. Each row carries a server-formatted `posted_relative` ("3d ago") to avoid hydration mismatch. Rendered on home (eyebrow 09) and on `/join-our-network`. Falls back to a hardcoded list if D1 is unreachable.
- **`<IndustryPulse>`** — rotating citation-backed industry stats (LBL queue, BLS, DOE USEER, DOE FY26 spending). Auto-rotates every 5.5s, pauses on hover/focus, disables on prefers-reduced-motion. Wrapped in `<ClientOnly>` to avoid hydration race. Rendered on home (eyebrow 10).
- **Footer "Last revised" timestamp** — root loader produces both an ISO `serverDate` and a UTC-formatted `serverDateLabel` so client and server render identical text. Footer reads via `useRouteLoaderData("root")`.

## SSR / hydration rules (do not regress)

React Router 7 server-renders the page including loader data. The client hydrates with the same data. Anything that produces *different* text between SSR and hydration triggers React error #418. Lessons learned:

1. **Route-level `meta()` REPLACES root `meta()`.** Static `<head>` meta (PWA, theme-color, app-name) lives in the `Layout` component as literal markup, not in `meta()`.
2. **Date / time formatting must use UTC** when rendered both server- and client-side. The footer uses a UTC-precomputed `serverDateLabel` string. Relative times for D1 rows are computed once on the server and stored as `posted_relative`.
3. **`server.ts` files cannot be imported by client components.** Split shared types into a non-`.server` file (e.g. `app/lib/open-roles.ts` for types/helpers + `app/lib/open-roles.server.ts` for the D1 fetcher).
4. **Components with client-only initial state** (matchMedia, useLocation edge cases, animation timing) go in `<ClientOnly>` (`app/components/client-only.tsx`). Renders `null`/fallback during SSR + first hydration; mounts after `useEffect`.
5. **Sonner Toaster** is wrapped in `<ClientToaster>` for the same reason.

## Form pipeline

All three forms (`/contact`, `/staff-my-project`, `/join-our-network`):

1. Validate with Zod via `zodResolver` (full shadcn `<Form>` + `<FormField>` + `<FormControl>` + `<FormMessage>` pattern, auto-wires `aria-describedby`/`aria-invalid`/htmlFor).
2. Honeypot (`website` field, sr-only) — submitted bots get silent success with no D1 write.
3. On `useSubmit` — capture `event.currentTarget` synchronously *before* `handleSubmit` runs (RHF's async resolver clears the synthetic event reference). See `app/routes/contact.tsx:106-112` for the canonical pattern.
4. Save payload to `form_submissions` D1 table via `saveFormSubmission`.
5. Upload resume to R2 (max 5 MB, server-enforced) when present on join form.
6. Send Resend notification when `RESEND_API_KEY` is configured (otherwise saves to D1 only — TODO: set this secret).
7. Action `catch` blocks `console.error` so `wrangler tail` surfaces failures.
8. On success: render `<FormSuccess>` block with phone + email CTAs; the form is replaced. Toast also fires for assistive feedback.
9. On field validation rejection: top-level `toast.error("Please fix the highlighted fields")` plus inline per-field messages from `FormMessage`.

## Component inventory

### Signature components
- `HeroSection` — navy gradient + 55%-width offshore-wind image bleed on lg+, two tone-coded CTA cards (copper for owner/EPC, field-green for field professionals)
- `SplitCards` — owner / worker decision cards
- `ProofBar` — 3 anonymized worker testimonials + 5 client engagement marks
- `BenefitGrid` — twin grids: 6 client benefits + 8 worker benefits, each with Lucide icon
- `IndustryTile` — gradient header band + industry-specific Lucide icon (Zap/Wind/Sun/Battery/ZapOff/GitBranch), status badge, currentlySeeking line
- `IndustryPulse` — rotating citation-backed industry stats (live element)
- `CurrentlyFilling` — D1-backed open roles board with status pulse dots
- `ComparisonMatrix` — 4-column spec comparison (CrewVolt vs general agency / direct hire / 1099)
- `PullQuote` — large italic Playfair quote with copper left rule
- `SectionEyebrow` — copper hairline + uppercase label + optional numbered index
- `FormSuccess` — clean post-submit success card with CTAs
- `StickyMobileCta` — bottom-fixed phone + Staff project bar (mobile only, hidden on form pages)
- `ClientOnly` / `ClientToaster` — SSR-mismatch escape hatches

### Primitives (shadcn/ui)
accordion, badge, button, card, checkbox, form, input, label, select, sheet, sonner, textarea, tooltip

## Design system

- **Type:** Playfair Display (display), Source Sans 3 (body), IBM Plex Mono (data), Barlow Condensed (logo)
- **Color tokens:** navy `#1B365D`, copper `#B87333`, field-green `#3D5A3E`, parchment `#F7F4EF`, cream `#FAFAF7`
- **Hero H1:** `clamp(2.5rem, 5.5vw, 5rem)`
- **Section H2:** `clamp(1.75rem, 3vw, 2.25rem)`
- **Card primitive:** shadcn `Card` + `@container/card` queries for component-level responsiveness
- **Section padding:** `py-16 md:py-20` baseline; hero `py-20 md:py-28 lg:py-32`

## Photography inventory

All photos are self-hosted under `public/img/` (CSP-clean, no third-party fetch at runtime). Sourced from Unsplash under the free-commercial license, downloaded at viewport-appropriate sizes (~80–280 KB each).

| File | Used at | Source |
|---|---|---|
| `hero-offshore-wind.jpg` | Home hero (right-bleed on lg+) | Offshore wind farm, calm blue |
| `about-grid.jpg` | About page wide bleed | Transmission towers at sunset |
| `services-hero.jpg` | `/services` hero bleed | Lineman working on transmission tower |
| `why-crewvolt-hero.jpg` | `/why-crewvolt` hero bleed | Substation at twilight, glowing |
| `industry-substations.jpg` | IndustryTile (substations) | Substation framework silhouette at dusk |
| `industry-wind.jpg` | IndustryTile (wind) | Wind turbines on rolling green hills |
| `industry-solar.jpg` | IndustryTile (solar) | Aerial drone over solar farm |
| `industry-bess.jpg` | IndustryTile (bess) | Industrial transformer (BESS-adjacent) |
| `industry-transmission.jpg` | IndustryTile (transmission) | Single transmission tower silhouette |
| `industry-grid-mod.jpg` | IndustryTile (grid-modernization) | Transmission towers at orange sunrise |

All `<img>` tags use explicit width/height + `loading="lazy"` for tiles and `loading="eager"` + `fetchPriority="high"` for hero images. Hero images include the `.cv-ken-burns` utility for slow scale animation.

## Motion utilities (scroll-driven)

All defined in `app/styles/app.css`. CSS-only — no JS. Gated on `prefers-reduced-motion: no-preference`. Falls back to static rendering on browsers without `animation-timeline` support.

| Utility | What it does | Where applied |
|---|---|---|
| `.cv-scroll-progress` | 2px copper bar at top, scaleX driven by `scroll(root)` | `<div className="cv-scroll-progress" />` in root.tsx |
| `.cv-reveal-up` | Fade-up animation tied to `view()` timeline (entry 0% → cover 30%) | RoleCard, IndustryTile, StepCard, BenefitGrid, ProofBar, MetricCard |
| `.cv-count-up` | Subtle scale 0.94 → 1 + translate as element enters viewport | MetricCard value text |
| `.cv-ken-burns` | 22s scale 1 → 1.06 + translate, alternate forever | Hero `<img>` on home, services, why-crewvolt |
| `[data-slot="card"]` global hover | Parent `<a>:hover/focus` lifts card 3px with copper-tinted shadow | Every shadcn Card on the site |
| `::view-transition-old/new(root)` | 250ms cubic-bezier crossfade between routes | Every internal `<Link viewTransition>` (nav, footer) |

## PWA / iOS / Android (2026)

- `public/manifest.webmanifest` — name, short_name, theme_color, icons (SVG + 192/512 PNG + maskable), display=standalone, app shortcuts.
- Icon set generated from `public/icons/icon-source.svg` via macOS `qlmanage` + `sips`. Regen instructions in this doc below.
- Meta tags in literal `<head>` of `Layout` (not `meta()`):
  - `mobile-web-app-capable` + `apple-mobile-web-app-capable`
  - `apple-mobile-web-app-status-bar-style: black-translucent`
  - `apple-mobile-web-app-title: CrewVolt`
  - `application-name: CrewVolt`
  - `format-detection: telephone=no`
  - `theme-color` light + dark variants
  - `color-scheme: light`
  - `mask-icon` for Safari pinned tabs
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover`.
- Mobile CSS in `app.css`: tap-highlight-color transparent, touch-action manipulation, overscroll-behavior contain, antialiased font smoothing, safe-area utility classes (`.cv-safe-pt`, `.cv-safe-pb`, `.cv-safe-px`).
- Nav header: `paddingTop: env(safe-area-inset-top)`.
- Sticky mobile CTA + Sonner toaster: respect `env(safe-area-inset-bottom)`.

### Regenerating icons after a brand change
```bash
qlmanage -t -s 1024 -o /tmp public/icons/icon-source.svg
cp /tmp/icon-source.svg.png public/icons/icon-512.png
sips -Z 512 public/icons/icon-512.png --out public/icons/icon-512.png
sips -Z 192 public/icons/icon-512.png --out public/icons/icon-192.png
sips -Z 180 public/icons/icon-512.png --out public/apple-touch-icon.png
cp public/icons/icon-512.png public/icons/icon-maskable-512.png
```

## Security

`workers/app.ts` applies these headers to non-asset responses:
- `Content-Security-Policy` (default-src 'self' + Google Fonts + Cloudflare Insights + Resend)
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (locks down sensors / payment / camera)

Honeypot field on all 3 forms catches naive bots. Turnstile not yet wired (skipped per plan; revisit post-demo).

## Commands

```bash
pnpm dev                                                 # local dev with CF runtime
pnpm typecheck                                           # wrangler types + react-router typegen + tsc
pnpm build                                               # production build
pnpm test                                                # vitest run
pnpm test:watch                                          # vitest watch mode
pnpm run deploy                                          # build + deploy to CF Workers
pnpm exec wrangler d1 migrations apply crewvolt-db --remote
pnpm exec wrangler secret put RESEND_API_KEY
```

## SEO

- All pages: title 50–60 chars, description 150–160 chars, canonical, OG, twitter:card.
- **Per-page dynamic OG images** via `workers-og` package, served from `/og.png?title=...&subtitle=...&eyebrow=...`. The image renders a navy gradient with a copper accent ring, the page eyebrow + title + subtitle, and a brand wordmark + tagline strip. `buildPageMeta()` automatically generates the URL; pages can override with explicit `imagePath`. PNG cached for 1 day at the browser, 7 days at the edge.
- Schema: ProfessionalService (global), Service (services), FAQ (why-crewvolt), LocalBusiness (contact), JobPosting (join-our-network — datePosted is computed dynamically server-side).
- Sitemap: `public/sitemap.xml` is **auto-generated** by `scripts/build-sitemap.mjs` via the `prebuild` npm hook. Routes + priorities + changefreq live in the script. `lastmod` is always the current UTC date at build time.
- Favicon: light + dark SVG variants (`favicon.svg` + `favicon-dark.svg`) wired with `media="(prefers-color-scheme: ...)"` so dark-mode browsers get a parchment-on-navy mark.
- `<noscript>` fallback in `Layout` shows a CrewVolt-branded message + email/phone for JS-disabled users.
- Accessibility: skip-to-content link, semantic `<main>`, focus-visible rings, keyboard nav, `aria-current="page"` on active nav, copper underline on active link (color + shape — fixes WCAG 1.4.1).

## Operational notes

- `RESEND_API_KEY` is required for email notifications. Without it, forms still save to D1.
- `CF_WEB_ANALYTICS_TOKEN` is optional. If blank, the analytics script is not injected.
- Real phone DID is `+1-423-555-0100` placeholder — replace with the live number across:
  - `app/components/footer.tsx` (`PHONE_DISPLAY` / `PHONE_TEL`)
  - `app/components/nav.tsx` (`tel:` href + display string)
  - `app/components/sticky-mobile-cta.tsx` (`PHONE_TEL`)
  - `app/routes/contact.tsx` aside
  - `app/components/form-success.tsx` (`PHONE_TEL` / `PHONE_DISPLAY`)
- Success toast auto-dismisses in ~5s. The reliable success indicator is now the `<FormSuccess>` block that replaces the form on `actionData.ok`.

## TODO (needs human action)

- Wire real phone DID
- Point `crewvolt.com` DNS to Cloudflare Workers
- Set `RESEND_API_KEY` Worker secret
- Set `CF_WEB_ANALYTICS_TOKEN` once a Web Analytics site is created
- Add real testimonials/case studies as engagements progress
- Write blog content (sheet placeholder until then)
- Replace founder quote / placeholder name on About page
- Real client logos in homepage proof bar
- Per-page dynamic OG via `workers-og` (M5 — DONE; route at `/og.png`)
- Cloudflare Turnstile on intake forms (post-demo hardening)
