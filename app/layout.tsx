import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Fonts are self-hosted by next/font (no runtime request to Google) and exposed
 * as CSS variables that app/globals.css maps to `font-display` / `font-sans`.
 * Montserrat is the display face (headings, labels); Poppins is body copy.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.title} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // STAGING ONLY — delete this when the rewrite goes live for real. The
  // staging site must not be indexed alongside the real ubccsss.org. See
  // app/robots.ts for the full removal checklist.
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.title} | ${site.name}`,
    description: site.description,
    url: site.url,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
