import Image from "next/image";
import Link from "next/link";

import { mainNav, site } from "@/lib/site";

/**
 * Site header. Server component — no client JS unless a real interactive
 * menu (mobile drawer) is added later.
 *
 * TODO(mobile): the nav wraps onto extra rows at narrow widths. Replace with
 * a proper disclosure menu before launch.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-navy-deep/50 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/logo.svg" alt="" width={26} height={31} unoptimized />
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.18em]">
            {site.shortName}
          </span>
        </Link>

        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {mainNav.map((item) =>
            item.subMenu ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 text-sky transition-colors group-hover:text-white">
                  {item.label}
                </button>
                <div className="invisible absolute left-0 top-full z-50 pt-2 min-w-[12rem] rounded-md border border-white/10 bg-navy p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block rounded px-3 py-2 text-sky transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href!} className="text-sky transition-colors hover:text-white">
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
