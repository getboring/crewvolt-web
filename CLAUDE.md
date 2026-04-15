# CrewVolt Web - Project Notes

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

## Stack

- React Router v7 (framework mode)
- Tailwind CSS v4 with custom CrewVolt tokens in `app/styles/app.css`
- shadcn/ui (radix) components in `app/components/ui/`
- React Hook Form + Zod for forms
- Cloudflare D1 + R2 + Workers runtime

## Commands

```bash
pnpm dev
pnpm typecheck
pnpm build
pnpm run deploy
pnpm exec wrangler d1 migrations apply crewvolt-db --remote
pnpm exec wrangler secret put RESEND_API_KEY
```

## Key architecture

- Route map is defined in `app/routes.ts`
- SEO helpers and canonical metadata are in `app/lib/seo.ts`
- Form schemas are in `app/lib/forms.ts`
- Form submission persistence and notifications are in `app/lib/submissions.server.ts`
- Database migrations are in `workers/migrations/`

## Content and brand references

- Build spec: `../CREWVOLT_BUILD_DOCUMENT_FINAL.md`
- Full copy: `../CREWVOLT_WEBSITE_CONTENT_V3.md`
- Brand tokens and visual system: `../crewvolt-brand-system.jsx`

## Operational notes

- `RESEND_API_KEY` is required for email notifications.
- Without `RESEND_API_KEY`, forms still save into D1.
- `CF_WEB_ANALYTICS_TOKEN` is optional. If blank, analytics script is not injected.
