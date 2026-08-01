import { Eyebrow } from "@/components/ds/eyebrow";
import { Callout } from "@/components/ds/callout";
import { Separator } from "@/components/ui/separator";
import { DeckCard } from "@/components/site/deck-card";
import { templates, talks, DECK_LAYOUTS, DECK_PATTERNS } from "@/lib/decks";

export const metadata = { title: "Presentations · Dan Sozanski" };

export default function PresentationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Eyebrow className="mb-4">Presentations · reveal.js</Eyebrow>
      <h1 className="font-serif text-5xl tracking-[-0.02em]">
        Decks that are web pages.
      </h1>
      <p className="mt-4 max-w-[52ch] text-base text-graphite">
        Self-contained reveal.js templates built from the same tokens as
        everything else. Keyboard navigation, speaker notes, an overview grid,
        and PDF export. Nothing here is bundled by the app, so a deck keeps
        working even when nothing else does.
      </p>

      <Callout className="mt-8 max-w-[60ch]">
        <p className="text-sm">
          This is a different surface from Google Slides, not a replacement for
          it. Slides is a shared, editable artifact that lives inside Workspace.
          A reveal deck is a page you present from and hand over as a link.
        </p>
      </Callout>

      <Separator className="mt-20" />

      <section className="py-20">
        <Eyebrow className="mb-4">Talks</Eyebrow>
        <h2 className="font-serif text-4xl tracking-[-0.02em]">Given, or about to be.</h2>
        <p className="mt-4 max-w-[60ch] text-base text-graphite">
          Real decks, kept in the repo as worked examples. Speaker notes are in
          the markup, so press S while presenting and the talk track comes with
          it.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {talks.map((d) => (
            <DeckCard key={d.slug} deck={d} />
          ))}
        </div>
      </section>

      <Separator />

      <section className="py-20">
        <Eyebrow className="mb-4">Templates</Eyebrow>
        <h2 className="font-serif text-4xl tracking-[-0.02em]">
          Start from one of these.
        </h2>
        <p className="mt-4 max-w-[60ch] text-base text-graphite">
          Each template ships every layout it lists, wired and populated, so
          building a talk is deleting slides rather than inventing them.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {templates.map((d) => (
            <DeckCard key={d.slug} deck={d} />
          ))}
        </div>
      </section>

      <Separator />

      <section className="py-20">
        <Eyebrow className="mb-4">The layouts</Eyebrow>
        <h2 className="font-serif text-4xl tracking-[-0.02em]">
          Eight, and no more.
        </h2>
        <p className="mt-4 max-w-[60ch] text-base text-graphite">
          Variety in a deck should come from proportion, never decoration. These
          eight cover every slide worth making. If a slide does not fit one of
          them, the slide is usually the problem.
        </p>

        <dl className="mt-12 grid gap-x-12 gap-y-6 border-t border-rule pt-6 sm:grid-cols-2">
          {LAYOUT_NOTES.map(([name, note]) => (
            <div key={name} className="flex flex-col gap-1">
              <dt className="label-caps text-ink">{name}</dt>
              <dd className="text-sm text-graphite">{note}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-xs text-slate">
          {DECK_LAYOUTS.length} layouts, shared by every template.
        </p>

        <h3 className="mt-16 font-serif text-2xl tracking-[-0.02em]">
          And one pattern.
        </h3>
        <p className="mt-3 max-w-[60ch] text-base text-graphite">
          A pattern is a composition built out of the layouts rather than a new
          one. There is currently {DECK_PATTERNS.length}:{" "}
          <span className="label-caps text-ink">resources</span>, the closing
          reading-list slide. Hairline cards two-up, each with a kind, a name, a
          line of why it is worth your evening, and the bare URL. One accent, on
          the card to open first.
        </p>
      </section>

      <Separator />

      <section className="py-20">
        <Eyebrow className="mb-4">Presenting</Eyebrow>
        <h2 className="font-serif text-4xl tracking-[-0.02em]">
          Keys worth knowing.
        </h2>
        <dl className="mt-10 grid gap-x-12 gap-y-4 border-t border-rule pt-6 sm:grid-cols-2">
          {KEYS.map(([k, note]) => (
            <div key={k} className="flex items-baseline gap-4">
              <dt className="font-mono text-sm text-ink">{k}</dt>
              <dd className="text-sm text-graphite">{note}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

const LAYOUT_NOTES: [string, string][] = [
  ["title-only", "Serif headline, bottom-left. Act openers and section breaks."],
  ["statement", "One line, nothing else. For the sentence the talk hangs on."],
  ["split-half", "Text at 40%, visual at 60%, either side. Explain while showing."],
  ["side-by-side", "Two equal panels, hairline gutter, mono labels. Before and after."],
  ["three-col", "Three cards. Principles, tells, a three-part recipe."],
  ["full-bleed", "Visual to all four edges. Galleries and finished work."],
  ["code", "A sunken panel in mono. One excerpt, never a whole file."],
  ["demo", "Empty ground and a mono eyebrow. You take the room."],
];

const KEYS: [string, string][] = [
  ["Esc", "Overview grid. Also the best proof screenshot you can take."],
  ["S", "Speaker notes in a second window."],
  ["F", "Fullscreen."],
  ["B", "Blank the screen when you want the room looking at you."],
  ["Alt + click", "Zoom into any element."],
  ["?", "Every other shortcut."],
];
