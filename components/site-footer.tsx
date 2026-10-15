import Image from "next/image";
import Link from "next/link";

import { footerNav, site } from "@/lib/site";

/**
 * Site footer. Server component.
 *
 * `"use cache"` is required here: this repo runs with Cache Components enabled
 * (see next.config.ts), and a bare `new Date()` in a prerendered tree is an
 * unstable value that fails the build. Caching the component means the year is
 * resolved once at build time and refreshes on the next deploy.
 */
export async function SiteFooter() {
  "use cache";

  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy-deep text-sky">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo-mono.svg" alt="" width={26} height={26} unoptimized />
          <p className="text-sm">
            &copy; {year} {site.name}. Built by CSSS volunteers.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
