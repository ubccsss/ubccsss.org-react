# Contributing

This repo is maintained by CSSS webmasters. Keep it boring: small PRs, reviewed before merge.

## Workflow

1. Branch off `main` (`git checkout -b feat/course-reviews`).
2. Make your change, run `npm run lint && npm run typecheck && npm run build` locally.
3. Open a PR. `main` is protected — **no direct pushes, no self-merged PRs.** At least one other
   webmaster reviews.
4. Squash-merge once CI is green.
5. 
## Code conventions

- **Server components by default.** Add `"use client"` only to the leaf that needs state, effects
  or browser APIs, and keep those leaves small.
- **No colour literals in components.** Use the token utilities (`bg-navy`, `text-sky`, `text-ink/70`)
  declared in `app/globals.css`.
- **Fonts:** headings and labels use `font-display` (Montserrat, uppercase + wide tracking for
  section labels); body copy uses the default `font-sans` (Poppins).
- **Place shared UI in `components/`**, page-specific pieces next to the route they serve.
- Keep site-wide strings and navigation in `lib/site.ts` rather than duplicating them per page.
- Every page exports `metadata` (or a `generateMetadata` function) — no page ships with the
  default title.

## Content

Do not invent facts, prices, sponsor names, deadlines or statistics to fill a layout. If a page
needs real content, ask the relevant exec (for sponsorship and external comms, `vpx@ubccsss.org`).
Placeholder copy belongs behind TODO
