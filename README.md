# CrewVolt Web

Marketing website for CrewVolt, a W-2 contract staffing company focused on energy infrastructure projects (substations, wind, solar, BESS, transmission).

The site is presented as a **set of construction contract drawings** — every route is a numbered sheet (`E-001`...) with a fixed title block, drafting-grid background, match-line dividers, and revision triangles. The aesthetic is the visual language of the buyer.

## Live status

- Worker URL: `https://crewvolt-web.codyboring.workers.dev`
- GitHub: `https://github.com/getboring/crewvolt-web`
- Runtime: Cloudflare Workers
- See `CLAUDE.md` for the full design system and sheet numbering.

## Stack

- React Router v7 (framework mode)
- Cloudflare Workers + Wrangler
- Tailwind CSS v4 + custom drafting tokens
- shadcn/ui primitives, customized for the drawing system
- React Hook Form + Zod (step-1 minimum, optional disclosure)
- D1 (form submission storage) + R2 (resume uploads)
- Resend (form notifications)
- Fonts: Fraunces (Google), General Sans (Fontshare), JetBrains Mono (Google), Barlow Condensed (Google)

## Local setup

```bash
pnpm install
pnpm dev
```

App runs on `http://localhost:5173`.

## Scripts

- `pnpm dev` — local dev with Cloudflare runtime
- `pnpm typecheck` — wrangler types + react-router typegen + tsc
- `pnpm build` — production build
- `pnpm run deploy` — build + deploy to Cloudflare Workers
- `pnpm cf-typegen` — regenerate `worker-configuration.d.ts`

## Cloudflare resources

- Worker: `crewvolt-web`
- D1: `crewvolt-db` (`983b5f01-d94a-45e8-870f-8c76a7c57f08`)
- R2: `crewvolt-uploads`
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

All three forms (`/staff-my-project`, `/join-our-network`, `/contact`) use React Router actions and follow the same flow:

1. Zod-validate (only step-1 fields required; deeper detail is optional disclosure)
2. Save payload to D1 `form_submissions`
3. Upload resume to R2 for the join form when provided
4. Send Resend notification when `RESEND_API_KEY` is configured
5. Render `StampedReceipt` success state

## Design system

See `CLAUDE.md` for full documentation of:
- Sheet numbering map (`E-001`...)
- Type stack (Fraunces / General Sans / JetBrains Mono / Barlow Condensed)
- Color tokens (vellum + pencil + copper + revision-red + blueprint + field-green)
- Signature components (`TitleBlock`, `BarScale`, `MatchLine`, `RevisionTriangle`, `SingleLineDiagram`, `NotesColumn`, `ComparisonMatrix`, `RolesBoard`, `EngineerStamp`, `StampedReceipt`)
- Motion rules (one orchestrated hero load, restrained micro-states, `prefers-reduced-motion` gated)
- Security headers (CSP, HSTS, Permissions-Policy applied in `workers/app.ts`)
