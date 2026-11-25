import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Conference",
};

export default function ConferencePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-display text-5xl font-extrabold tracking-tight text-navy">
        Research Conference
      </h1>
      {/* TODO */}
    </div>
  );
}
