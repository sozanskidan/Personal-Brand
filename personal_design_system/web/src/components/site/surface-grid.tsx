import { Eyebrow } from "@/components/ds/eyebrow";
import { SurfaceCard } from "@/components/site/surface-card";
import { surfaces } from "@/lib/surfaces";

/**
 * Surface conventions, as clickable cards. Four Workspace-and-web surfaces
 * in a two-up grid, then Presentations across the full measure because it
 * is the one surface that opens onto a set rather than a single example.
 */
export function SurfaceGrid() {
  const classic = surfaces.filter((s) => s.kind !== "deck");
  const deck = surfaces.find((s) => s.kind === "deck");

  return (
    <section className="py-20">
      <Eyebrow className="mb-4">Surface conventions</Eyebrow>
      <h2 className="font-serif text-4xl tracking-[-0.02em]">
        Same tokens, five contexts.
      </h2>
      <p className="mt-4 max-w-[60ch] text-base text-graphite">
        The personality stays constant across every medium. Open any card for a
        faithful, system-native example rather than a description of one.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {classic.map((s) => (
          <SurfaceCard key={s.kind} surface={s} />
        ))}
      </div>

      {deck ? (
        <div className="mt-6">
          <SurfaceCard surface={deck} wide />
        </div>
      ) : null}
    </section>
  );
}
