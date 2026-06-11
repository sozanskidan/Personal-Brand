import { Eyebrow } from "@/components/ds/eyebrow";
import { GalleryGrid } from "@/components/site/gallery-grid";

export const metadata = { title: "Components · Dan Sozanski" };

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Eyebrow className="mb-4">Catalog</Eyebrow>
      <h1 className="font-serif text-5xl tracking-[-0.02em]">Components</h1>
      <p className="mt-4 max-w-[52ch] text-base text-graphite">
        Twenty-one pieces in six categories. The static ones hold the page
        together; the dynamic ones move on real spring physics — stiffness,
        damping, mass — and exit on a fast fade.
      </p>

      <div className="mt-16">
        <GalleryGrid />
      </div>
    </div>
  );
}
