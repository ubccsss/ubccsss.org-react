# ubccsss.org — React rewrite

Blank starter for the next [ubccsss.org](https://ubccsss.org), replacing the Hugo site.

This repo is **scaffolding only**: the shell, design tokens and tooling are set up, and every page
still has to be built. Nothing here is final design — it exists so the first page can be written
without a yak-shave.

## Stack

| Concern   | Choice                                                                   |
| --------- | ------------------------------------------------------------------------ |
| Framework | Next.js 16 (App Router, Turbopack)                                       |
| Language  | TypeScript. We can change this to JS as well                             |
| Styling   | Tailwind CSS v4 — tokens declared in `app/globals.css` via `@theme`      |
| Linting   | ESLint                                                                   |
| Hosting   | Netlify                                                                  |
| Node      | 24 (see `.nvmrc`)                                                        |

## Getting started

```bash
nvm use            # or any Node 24
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Layout

```
app/
  layout.tsx        root layout — fonts, metadata, header/footer
  page.tsx          placeholder home (delete when the real one lands)
  not-found.tsx     404
  globals.css       design tokens + base styles
  icon.svg          favicon (CSSS cube mark)
components/
  site-header.tsx   nav shell
  site-footer.tsx   footer shell
lib/
  site.ts           site identity + navigation
public/brand/       CSSS logo assets (copied from the Hugo site)
netlify.toml        build settings
.github/workflows/  CI: lint + typecheck + build
```

## Design system

Colours and fonts come from the **CSSS Branding Guide** and are declared once, in `app/globals.css`,
as Tailwind v4 theme tokens. Use the generated utilities and add them as needed.

| Token               | Utility examples          | Hex       |
| ------------------- | ------------------------- | --------- |
| `--color-navy`      | `bg-navy` `text-navy`     | `#061D80` |
| `--color-navy-deep` | `bg-navy-deep`            | `#08327B` |
| `--color-blue-deep` | `bg-blue-deep`            | `#0F4996` |
| `--color-blue`      | `text-blue` `bg-blue`     | `#3A76DB` |
| `--color-blue-alt`  | `bg-blue-alt`             | `#387DD0` |
| `--color-sky`       | `bg-sky` `text-sky`       | `#B1D4FF` |
| `--color-ink`       | `text-ink` `text-ink/70`  | `#1C2333` |
| `--color-paper`     | `bg-paper`                | `#EEF3FC` |

## Conventions

See [CONTRIBUTING.md](./CONTRIBUTING.md). The short version: server components by default, colours
only through tokens, `metadata` on every page, small reviewed PRs against a protected `main`.

## Deploying (staging)

This repo deploys as its **own standalone site** — it is not connected to ubccsss.org and cannot
break it. The aim is a URL webmasters can look at while the rewrite is being built.

**Staging URL: <https://csss-2.netlify.app/>**

Netlify is the host because the society already uses it and it needs no infrastructure work. Keep
the site linked to this repo so that:

- **pushes to `main` deploy automatically** — nobody runs a deploy command;
- **every PR gets its own deploy preview URL**, which is the review surface for design work, so a
  change can be looked at before it reaches the staging URL.

The build settings are pinned in `netlify.toml` (`npm run build`, `.next`, Node 24) and match what
Netlify auto-detects. Netlify runs its own Next.js runtime, so there is **no plugin to install**.
The Netlify site name is what forms the URL, and those names are globally unique on Netlify.

### Noindex while this is staging

A blank template under CSSS branding must not end up in Google alongside the real site, so
**three** noindex signals are in place, and all three are commented as staging-only:

| Layer | Where |
| --- | --- |
| `robots.txt` route (`Disallow: /`) | `app/robots.ts` |
| `<meta name="robots" content="noindex, nofollow">` | `metadata.robots` in `app/layout.tsx` |
| `X-Robots-Tag: noindex, nofollow, noarchive` | `[[headers]]` in `netlify.toml` |

`disallow` stops crawling, `noindex` stops an already-known URL being listed — hence both rather
than picking one.

### Going live later

When this is ready to replace the current site, undo the staging bits:

1. delete `app/robots.ts`
2. remove the `robots` field from `metadata` in `app/layout.tsx`
3. remove the `[[headers]]` block from `netlify.toml`
4. add `ubccsss.org` as a custom domain on the Netlify site (the DNS cutover from the Hugo site is
   a separate, deliberate step — the zone is on Cloudflare, so whoever holds that account has to
   make the change)


## Migration notes (from Hugo)

- **This repo is a template, not a migration.** Pages need to be rebuilt one at a time.
- **Content is not here.** The Hugo site's `content/` markdown, page bundles and images still live in
  [ubccsss/ubccsss.org](https://github.com/ubccsss/ubccsss.org). Port content page by page, pulling
  only the assets each page actually uses.
- **URLs should stay stable.** `lib/site.ts` mirrors the current Hugo menu
  (`config/_default/menu.yml`), so routes line up with the URLs already in the wild. Keep it that
  way — `ubccsss.org/services/courses/` should not become `/courses`.
- **Two Hugo features need rethinking rather than porting:**
  - the course reviews page, which posts to a Cloudflare Worker (`course-review-worker`) — keep the
    worker, re-point the form;
  - the sponsorship enquiry form, which is a `mailto:` link with no backend. Don't imply submissions
    are stored unless a backend is actually added.
