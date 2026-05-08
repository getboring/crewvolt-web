# CrewVolt Web

Marketing website and lead intake for CrewVolt, a W-2 contract staffing company focused on energy infrastructure projects (substations, wind, solar, BESS, transmission).

## Live status

- Worker URL: `https://crewvolt-web.codyboring.workers.dev`
- GitHub: `https://github.com/getboring/crewvolt-web`
- Runtime: Cloudflare Workers
- See `CLAUDE.md` for full design system, component inventory, SSR rules, PWA setup, and operational notes.

## Stack

- React Router v7 (framework mode)
- Cloudflare Workers + Wrangler
- Tailwind CSS v4 + custom CrewVolt tokens
- shadcn/ui primitives (full FormField pattern wired)
- React Hook Form + Zod (with Vitest unit tests)
- D1 (form submissions + open_roles board) + R2 (resumes)
- Resend for form notifications (when secret is set)
- Vitest for unit tests
- PWA manifest + iOS/Android meta + safe-area insets

## Local setup

```bash
pnpm install
pnpm dev
```

Local app runs on `http://localhost:5173`.

## Scripts

- `pnpm dev` — local dev server with Cloudflare runtime
- `pnpm typecheck` — wrangler types + react-router typegen + tsc
- `pnpm build` — production build
- `pnpm test` / `pnpm test:watch` — vitest
- `pnpm run deploy` — build + deploy to Cloudflare Workers
- `pnpm cf-typegen` — regenerate `worker-configuration.d.ts`

## Cloudflare resources

- Worker name: `crewvolt-web`
- D1 database: `crewvolt-db` (`983b5f01-d94a-45e8-870f-8c76a7c57f08`)
- R2 bucket: `crewvolt-uploads`
- Migrations: `workers/migrations/`

Apply migrations:

```bash
pnpm exec wrangler d1 migrations apply crewvolt-db --remote
```

## Required secrets and vars

```bash
pnpm exec wrangler secret put RESEND_API_KEY
```

`wrangler.jsonc` vars:
- `NOTIFICATION_EMAIL`
- `RESEND_FROM_EMAIL`
- `PUBLIC_SITE_URL`
- `CF_WEB_ANALYTICS_TOKEN` (optional)

## Form pipeline

All 3 intake forms (`/staff-my-project`, `/join-our-network`, `/contact`):

1. Zod-validate (full shadcn FormField pattern with auto-wired aria attrs)
2. Honeypot anti-spam (`website` sr-only field) — silent success on bot fill
3. Save to D1 `form_submissions`
4. Resume → R2 (5 MB cap) for the join form
5. Resend notification when `RESEND_API_KEY` is set
6. On success: render `<FormSuccess>` card (replaces form) + toast
7. On validation rejection: per-field inline + summary toast

### Submit-pattern gotcha

Capture the form ref synchronously *before* `form.handleSubmit` — RHF's async resolver clears `event.currentTarget`. See `CLAUDE.md` for the working pattern.

## Live elements

- **D1-backed `<CurrentlyFilling>`** — reads `open_roles` table; each row has a server-formatted relative timestamp.
- **`<IndustryPulse>`** — rotating citation-backed industry stats (LBL/BLS/DOE).
- **Footer "Last revised"** — UTC-formatted server-side date stamp.

## Security headers

`workers/app.ts` applies CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy on non-asset responses.

## PWA / iOS / Android

- `public/manifest.webmanifest` with app shortcuts
- 180/192/512 + maskable PNG icons (regen instructions in `CLAUDE.md`)
- Full meta set in `<Layout>` `<head>`: theme-color light/dark, status-bar-style, viewport-fit=cover
- Mobile CSS: tap-highlight, touch-action, overscroll-behavior, safe-area utilities
- Sticky mobile CTA + Sonner respect `env(safe-area-inset-bottom)`
