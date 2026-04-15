# CrewVolt Web

Marketing website for CrewVolt, a W-2 contract staffing company focused on energy infrastructure projects.

## Live status

- Worker URL: `https://crewvolt-web.codyboring.workers.dev`
- GitHub: `https://github.com/getboring/crewvolt-web`
- Runtime: Cloudflare Workers
- Last production deploy: Apr 15, 2026

## Stack

- React Router v7 (framework mode)
- Cloudflare Workers + Wrangler
- Tailwind CSS v4 + CrewVolt token system
- shadcn/ui components customized for CrewVolt brand tokens
- React Hook Form + Zod for form validation
- D1 for form submission storage
- R2 for resume uploads
- Resend API integration for form notifications

## Local setup

```bash
pnpm install
pnpm dev
```

Local app runs on `http://localhost:5173`.

## Scripts

- `pnpm dev` - start local development server
- `pnpm typecheck` - generate types and run TS checks
- `pnpm build` - production build
- `pnpm run deploy` - build and deploy to Cloudflare Workers
- `pnpm cf-typegen` - regenerate `worker-configuration.d.ts`

## Cloudflare resources

- Worker name: `crewvolt-web`
- D1 database: `crewvolt-db` (`983b5f01-d94a-45e8-870f-8c76a7c57f08`)
- R2 bucket: `crewvolt-uploads`
- Migration folder: `workers/migrations`

Apply migrations:

```bash
pnpm exec wrangler d1 migrations apply crewvolt-db --remote
```

## Required secrets and vars

Set secret in Cloudflare:

```bash
pnpm exec wrangler secret put RESEND_API_KEY
```

Configured vars in `wrangler.jsonc`:

- `NOTIFICATION_EMAIL`
- `RESEND_FROM_EMAIL`
- `PUBLIC_SITE_URL`
- `CF_WEB_ANALYTICS_TOKEN`

## Form pipeline

All three forms use React Router actions:

- `/staff-my-project`
- `/join-our-network`
- `/contact`

Flow:

1. Validate with Zod
2. Save payload to `form_submissions` in D1
3. Upload resume to R2 for join form when provided
4. Send Resend notification when `RESEND_API_KEY` is available

## Content and docs

- Build spec: `../CREWVOLT_BUILD_DOCUMENT_FINAL.md`
- Content source: `../CREWVOLT_WEBSITE_CONTENT_V3.md`
- Brand system: `../crewvolt-brand-system.jsx`

## Notes

- This project intentionally uses parchment background (`#F7F4EF`) and a strict 4-font system.
- Copper is accent only. Body text stays charcoal/navy/steel for contrast.
- Mobile touch targets are 44px minimum.
