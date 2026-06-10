import Link from "next/link";
import { Eyebrow } from "@/components/ds/eyebrow";
import { Chip } from "@/components/ds/chip";
import { HoverLiftCard } from "@/components/ds/hover-lift-card";
import { registry } from "@/lib/registry";

export const metadata = { title: "Components · Dan Sozanski" };

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Eyebrow className="mb-4">Catalog</Eyebrow>
      <h1 className="font-serif text-5xl tracking-[-0.02em]">Components</h1>
      <p className="mt-4 max-w-[52ch] text-base text-graphite">
        Fifteen pieces. The static ones hold the page together; the dynamic
        ones move on spring tokens — quiet, standard, playful — and exit on a
        fast fade.
      </p>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {registry.map((entry) => (
          <Link key={entry.slug} href={`/components/${entry.slug}`}>
            <HoverLiftCard className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-xl tracking-[-0.02em]">
                  {entry.name}
                </h2>
                <Chip variant={entry.category === "Dynamic" ? "accent" : "default"}>
                  {entry.category}
                </Chip>
              </div>
              <p className="mt-3 text-sm text-graphite">{entry.description}</p>
            </HoverLiftCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
