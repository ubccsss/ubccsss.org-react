/**
 * Placeholder home page — scaffolding, not content.
 *
 * Replace this wholesale when the first real page is designed. It exists so the
 * shell (fonts, tokens, header, footer, metadata) can be verified end to end.
 */

const startHere = [
  { file: "app/layout.tsx", purpose: "Root layout: fonts, metadata, header/footer" },
  { file: "app/globals.css", purpose: "Design tokens — the only place colours live" },
  { file: "lib/site.ts", purpose: "Site identity and navigation" },
  { file: "components/", purpose: "Shared UI. Colocate page-specific components instead" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-blue">
        Starter
      </p>

      <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-navy sm:text-6xl">
        UBC Computer Science Student Society
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Blank React template for the next ubccsss.org. The shell is wired up and the CSSS brand
        tokens are in place; every page still has to be built.
      </p>

      <section className="mt-14 max-w-2xl border-t border-ink/15 pt-8">
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-navy">
          Start here
        </h2>
        <dl className="mt-5 space-y-3 text-sm">
          {startHere.map((entry) => (
            <div key={entry.file} className="flex flex-wrap gap-x-4">
              <dt className="font-mono text-blue">{entry.file}</dt>
              <dd className="text-ink/70">{entry.purpose}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
