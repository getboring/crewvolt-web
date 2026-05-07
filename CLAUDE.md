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

- Route map is defined in `app/routes.ts` (14 routes including blog and catch-all)
- SEO helpers and canonical metadata are in `app/lib/seo.ts`
- Form schemas are in `app/lib/forms.ts`
- Form submission persistence and notifications are in `app/lib/submissions.server.ts`
- Database migrations are in `workers/migrations/`
- Shared CTA component: `app/components/cta-banner.tsx` (dual client/worker CTA)
- Content data: `app/lib/content.ts` (roles, industries, FAQ, how-it-works steps)

## Routes

```
/                          Home
/about                     About (founder credibility, values)
/services                  Services overview (owner + contractor roles)
/services/owner-side       Owner side staffing
/services/contractor-side  Contractor side staffing
/how-it-works              How it works (dual audience steps)
/industries                Industries we serve (6 sectors)
/why-crewvolt              Why CrewVolt (FAQ accordion, schema)
/staff-my-project          Client intake form (D1 + Resend)
/join-our-network          Worker intake form (D1 + R2 resume + Resend)
/contact                   Contact form (D1 + Resend)
/vendor-readiness          Vendor onboarding documentation
/blog                      Blog placeholder (coming soon)
*                          404 catch-all
```

## SEO status

- All pages: title 50-60 chars, description 150-160 chars, canonical, OG tags, twitter:card
- OG image: `public/og/crewvolt-default.png` (1200x630 PNG)
- Schema: ProfessionalService (global), Service (services), FAQ (why-crewvolt), LocalBusiness (contact), JobPosting (join-our-network)
- Sitemap: `public/sitemap.xml` with lastmod/priority
- External links: DOE USEER, LBL Queues, BLS on relevant pages
- Internal links: 2+ per page minimum, CtaBanner on all content pages
- Accessibility: skip-to-content link, semantic `<main>`, focus rings, keyboard nav

## Content and brand references

- Build spec: `../CREWVOLT_BUILD_DOCUMENT_FINAL.md`
- Full copy: `../CREWVOLT_WEBSITE_CONTENT_V3.md`
- Brand tokens and visual system: `../crewvolt-brand-system.jsx`

## Form submit pattern (do not regress)

All three intake forms (`/contact`, `/staff-my-project`, `/join-our-network`) capture the form ref **synchronously** before calling `form.handleSubmit`, because the Zod resolver is async and `event.currentTarget` is null by the time the inner callback runs:

```ts
const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const target = event.currentTarget; // capture before async
  form.handleSubmit(() => {
    submit(target, { method: "post" });
  })(event);
};
```

The naive `form.handleSubmit((_, event) => submit(event?.currentTarget, ...))` pattern fails silently — no POST, no error, no toast. Fixed in commit `336a97b`.

## Verified working (2026-05-07)

End-to-end Playwright smoke pass against the live Worker:

- All 14 routes return 200 with correct titles and zero console errors.
- `/contact`, `/staff-my-project`, `/join-our-network` each successfully POST → save to D1 `form_submissions` → reset the form on `actionData.ok`.
- 404 catch-all renders correctly for unknown paths.

## PWA / iOS / Android (2026)

- `public/manifest.webmanifest` — name, short_name, theme_color, icons (SVG + 192/512 PNG + maskable), display=standalone, app-shortcuts for `/staff-my-project` and `/join-our-network`.
- Icon set generated from `public/icons/icon-source.svg` via macOS `qlmanage` + `sips`. To regenerate after a brand change:
  ```bash
  qlmanage -t -s 1024 -o /tmp public/icons/icon-source.svg
  cp /tmp/icon-source.svg.png public/icons/icon-512.png
  sips -Z 512 public/icons/icon-512.png --out public/icons/icon-512.png
  sips -Z 192 public/icons/icon-512.png --out public/icons/icon-192.png
  sips -Z 180 public/icons/icon-512.png --out public/apple-touch-icon.png
  cp public/icons/icon-512.png public/icons/icon-maskable-512.png
  ```
- Meta tags in `app/root.tsx`:
  - `mobile-web-app-capable` + `apple-mobile-web-app-capable` for standalone install
  - `apple-mobile-web-app-status-bar-style: black-translucent`
  - `apple-mobile-web-app-title: CrewVolt`
  - `application-name: CrewVolt`
  - `format-detection: telephone=no` (prevents iOS auto-linking phone-like number patterns)
  - `theme-color` with `(prefers-color-scheme: light)` and `(prefers-color-scheme: dark)` variants — Android Chrome address bar tints accordingly
  - `color-scheme: light` meta + CSS declaration
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover` — required for `env(safe-area-inset-*)` to work on notched devices.
- Mobile-only CSS polish in `app/styles/app.css`:
  - `-webkit-tap-highlight-color: transparent` on all interactive elements
  - `touch-action: manipulation` (eliminates 300ms double-tap delay)
  - `overscroll-behavior-y: contain` on body (no rubber-band scroll)
  - `-webkit-font-smoothing: antialiased`
  - Safe-area utility classes: `.cv-safe-pt`, `.cv-safe-pb`, `.cv-safe-px`
- Sonner toaster repositioned to `bottom-center` with `env(safe-area-inset-bottom)` offset so it doesn't collide with the sticky top nav on mobile.
- Nav header uses `paddingTop: env(safe-area-inset-top)` so notched-iPhone status bars don't overlap the logo.

## Operational notes

- `RESEND_API_KEY` is required for email notifications. Without it, forms still save to D1.
- `CF_WEB_ANALYTICS_TOKEN` is optional. If blank, analytics script is not injected.
- Success toast auto-dismisses in ~5s, faster than Playwright's default 30s `waitFor`. The reliable assertion is "form fields cleared" + a D1 row appearing.

## TODO (needs human action)

- Add real phone number across site (contact page, footer)
- Point `crewvolt.com` DNS to Cloudflare Workers
- Add real testimonials/case studies when available
- Write blog content
- Replace founder quote on About page with real name when approved
- Set `RESEND_API_KEY` Worker secret to enable email notifications on submissions
