import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ds/eyebrow";
import { Chip } from "@/components/ds/chip";
import { ComponentPreview } from "@/components/site/component-preview";
import { ComponentSwitcher } from "@/components/site/component-switcher";
import { registry, getEntry } from "@/lib/registry";

export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const entry = getEntry((await params).slug);
  return { title: entry ? `${entry.name} · Dan Sozanski` : "Component" };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const { Demo } = entry;
  const items = registry.map((e) => ({ slug: e.slug, name: e.name }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <ComponentSwitcher items={items} current={entry.slug} />

      <div className="mt-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-5xl tracking-[-0.02em]">
            {entry.name}
          </h1>
          <p className="mt-4 max-w-[52ch] text-base text-graphite">
            {entry.description}
          </p>
        </div>
        <Chip variant={entry.category === "Dynamic" ? "accent" : "default"}>
          {entry.category}
        </Chip>
      </div>

      <ComponentPreview scope={entry.slug} className="mt-12 min-h-64">
        <Demo />
      </ComponentPreview>

      <section className="mt-12 max-w-xl">
        <Eyebrow className="mb-4">Rules</Eyebrow>
        <ul className="copy space-y-0">
          {entry.notes.map((note) => (
            <li key={note} className="text-sm text-graphite">
              {note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
