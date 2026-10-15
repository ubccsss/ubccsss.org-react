import type { MetadataRoute } from "next";

/**
 * STAGING ONLY — this repo deploys as its own standalone site
 * (https://csss-2.netlify.app) while the rewrite is in progress. It is not
 * ubccsss.org, but it carries CSSS branding, so it must not turn up in search
 * results next to the real site.
 *
 * To go live for real, all three of these must be undone:
 *   1. delete this file (or change `disallow` to allow the site)
 *   2. remove the X-Robots-Tag block from netlify.toml
 *   3. remove the `robots` field from `metadata` in app/layout.tsx
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
