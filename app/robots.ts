import type { MetadataRoute } from "next";

/**
 * STAGING ONLY — this template is deployed to a preview subdomain
 * (next.ubccsss.org) while the rewrite is in progress, so we ask crawlers to
 * stay away from the whole thing.
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
