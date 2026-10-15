import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-blue">
        404
      </p>
      <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
        That URL doesn&rsquo;t exist on this site.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block bg-navy px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-blue-deep"
      >
        Back to home
      </Link>
    </div>
  );
}
