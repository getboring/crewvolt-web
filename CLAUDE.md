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

## Stack

- React Router v7 (framework mode)
- Cloudflare Workers + Wrangler
- Tailwind CSS v4 with custom CrewVolt drafting tokens in `app/styles/app.css`
- shadcn/ui (radix) primitives in `app/components/ui/`
- React Hook Form + Zod for forms
- D1 + R2 + Workers runtime + Resend (notifications)

## Design system — "Contract Drawing"

CrewVolt is presented as a set of construction contract drawings. Each route is a numbered sheet (`E-001`, `E-002`...). Sheet metadata lives in `app/lib/sheets.ts`. The system uses drafting-paper tones, hairline rules, drawing-grid backgrounds, match-line dividers, revision triangles, and a fixed title block.

### Type stack
- Display: **Fraunces** (variable, optical-size 144) via Google Fonts
- Body: **General Sans** (Fontshare CDN)
- Mono: **JetBrains Mono** (Google Fonts)
- Logo / wordmark: **Barlow Condensed** (Google Fonts)
- All loaded via `<link>` in `app/root.tsx`

### Color palette
| Token | Value | Use |
|---|---|---|
| `--cv-vellum` | `#F4EFE2` | Page ground |
| `--cv-vellum-light` | `#FAF6EC` | Card surfaces |
| `--cv-vellum-dark` | `#EBE3D0` | Surface depth tier |
| `--cv-pencil` | `#1A1A1A` | Primary text + linework + dark sections |
| `--cv-graphite` | `#3A4452` | Body text |
| `--cv-graphite-light` | `#5B6776` | Secondary copy |
| `--cv-copper` | `#B87333` | Annotation, primary accent, single-point CTA |
| `--cv-revision-red` | `#C8442C` | Revision marks, urgency dots |
| `--cv-blueprint` | `#0C4A6E` | Blueprint section background |
| `--cv-field-green` | `#3D5A3E` | Worker-side accent |
| `--cv-rule-soft` | `rgba(26,26,26,0.18)` | Hairline rules |
| `--cv-rule-grid` | `rgba(26,26,26,0.06)` | Drawing grid |

### Signature components

| Component | Purpose |
|---|---|
| `TitleBlock` | Fixed bottom-right drafting title block (sheet num, project, scale, issue) |
| `BarScale` | Bottom scroll progress shown as drafting bar scale (CSS scroll-driven) |
| `MatchLine` | Dashed-line section divider with `MATCH LINE — SEE SHEET ###` label |
| `RevisionTriangle` | Copper / red / navy filled triangle marker |
| `SingleLineDiagram` | Animated SVG single-line diagram of a substation (hero) |
| `NotesColumn` | Right-rail callout column (drafting "general notes") |
| `ComparisonMatrix` | Specification matrix table for /why-crewvolt |
| `RolesBoard` | Live "currently filling" position list w/ revision dots |
| `EngineerStamp` | Circular founder stamp (about page) |
| `NorthArrow` | Tiny SVG north arrow in nav (rotates per sheet) |
| `StampedReceipt` | Form-success state styled as stamped drawing receipt |
| `StickyMobileCta` | Fixed bottom-bar phone + staff-project CTA on mobile |

### Sheet numbering (drawing set)

| Route | Sheet | Title |
|---|---|---|
| `/` | E-001 | Cover |
| `/about` | E-002 | Project Brief |
| `/services` | E-003 | Scope of Work |
| `/services/owner-side` | E-003.1 | Scope — Owner Side |
| `/services/contractor-side` | E-003.2 | Scope — Contractor Side |
| `/how-it-works` | E-004 | Sequence of Operations |
| `/industries` | E-005 | Site Conditions |
| `/why-crewvolt` | E-006 | Specification |
| `/staff-my-project` | E-007 | Initial Intake — Owner |
| `/join-our-network` | E-008 | Initial Intake — Crew |
| `/contact` | E-009 | RFI Submission |
| `/vendor-readiness` | E-010 | Vendor Qualification |
| `/blog` | E-011 | Revision History |

### Motion language

- **One orchestrated hero load** (≈3s): drawing grid → title stamp → SVG single-line draws via `stroke-dasharray` → headline reveal staggered → voltage callouts pop late.
- **Restrained micro-states**: card hover lifts 2px with shadow + revision triangle reveal. No autoplay carousels, no sticky animations.
- **Scroll-driven bar scale** (CSS `animation-timeline: scroll()`) — progressive enhancement, falls back to static.
- All cinematic motion gated on `prefers-reduced-motion: no-preference`.

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

- Route map in `app/routes.ts` (14 routes incl. blog and 404 catch-all)
- Sheet metadata + drawing constants in `app/lib/sheets.ts`
- SEO helpers + Org schema in `app/lib/seo.ts`
- Form schemas in `app/lib/forms.ts` (step-1 minimum validation; deeper fields optional)
- Form persistence + notifications in `app/lib/submissions.server.ts`
- DB migrations in `workers/migrations/`
- Security headers and CSP applied in `workers/app.ts`
- Shared CTA: `app/components/cta-banner.tsx` (split client/worker, dark)
- Content data: `app/lib/content.ts` (roles, industries, FAQ, sequence steps)

## Routes

```
/                          E-001 Cover
/about                     E-002 Project Brief (founder stamp)
/services                  E-003 Scope of Work overview
/services/owner-side       E-003.1
/services/contractor-side  E-003.2
/how-it-works              E-004 Sequence (step-card details)
/industries                E-005 Site Conditions (live currently-seeking)
/why-crewvolt              E-006 Specification (matrix + FAQ)
/staff-my-project          E-007 Owner intake (4 required, optional disclosure)
/join-our-network          E-008 Crew intake (3 required, optional disclosure)
/contact                   E-009 RFI form
/vendor-readiness          E-010 Vendor package list
/blog                      E-011 Revision History
*                          404 — "Not in drawing set"
```

## Form pipeline

All three forms (`/staff-my-project`, `/join-our-network`, `/contact`) use React Router actions:
1. Zod-validate (step-1 fields required, all extended fields optional)
2. Save payload to `form_submissions` in D1
3. Upload resume to R2 for join form when present
4. Send Resend notification when `RESEND_API_KEY` is configured
5. Render `StampedReceipt` success state in place of the form

## SEO & shareables

- All pages: title 50–60 chars, description 150–160 chars, canonical, OG tags, twitter:card
- OG image: `public/og/crewvolt-default.png` (1200x630 PNG)
- Schema: ProfessionalService (global), Service (services), FAQ (why-crewvolt), LocalBusiness (contact), JobPosting (join-our-network)
- Sitemap: `public/sitemap.xml`
- Accessibility: skip-to-content, semantic `<main>`, focus rings, keyboard nav, `aria-current` on nav, all decorative drawing chrome `aria-hidden`

## Security headers

`workers/app.ts` applies these to non-asset responses:
- `Content-Security-Policy` (allows Google Fonts, Fontshare, Cloudflare Insights, Resend connect, Unsplash images)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security`
- `Permissions-Policy` (locks down sensors / payment / camera)

## Operational notes

- `RESEND_API_KEY` required for email notifications. Without it, forms still save to D1.
- `CF_WEB_ANALYTICS_TOKEN` optional — analytics script only injected when set.
- Phone in nav/footer/contact is a placeholder (`+1 (423) 555-0100`) — replace with real DID before launch.
- Founder name + photo on About page is intentionally anonymous (stamp block) until approved.

## TODO (needs human action)

- Real phone DID across site
- Point `crewvolt.com` DNS to Cloudflare Workers
- Add real testimonials / case studies as engagements progress
- Write blog content (sheet E-011 currently shows revision history only)
- Replace founder stamp text with approved name
- Real client logos in homepage proof bar (currently typeset placeholders)
- Wire CF Web Analytics token in `wrangler.jsonc` `vars.CF_WEB_ANALYTICS_TOKEN`
