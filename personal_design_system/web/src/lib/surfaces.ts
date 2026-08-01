/**
 * Artifact surfaces — the registry behind the clickable surface cards.
 *
 * Same tokens, five contexts. The personality stays constant. Each entry
 * links to a faithful, system-native example rather than describing one.
 *
 * `Presentations` (reveal.js) and `Google Slides` are deliberately separate
 * surfaces. They are both decks, but they are different mediums with
 * different constraints: Slides is a shared editable artifact inside
 * Workspace, reveal.js is a self-contained web deck built for a projector.
 */

export type SurfaceKind = "doc" | "slides" | "sheets" | "web" | "deck";

export type Surface = {
  kind: SurfaceKind;
  /** Small mono line above the title. */
  eyebrow: string;
  title: string;
  /** One or two sentences. What the surface is for and what it obeys. */
  blurb: string;
  href: string;
  /** Static HTML examples live in public/ and open in their own tab. */
  external: boolean;
  /** The rule this surface exists to demonstrate. */
  note: string;
};

export const surfaces: Surface[] = [
  {
    kind: "doc",
    eyebrow: "Google Docs",
    title: "The one-pager",
    blurb:
      "The canonical surface, and the most specified. Title in display serif, a TL;DR at the top, sections in h2, and every list item carrying 12pt above and below.",
    href: "/examples/doc.html",
    external: true,
    note: "One accent moment per document.",
  },
  {
    kind: "slides",
    eyebrow: "Google Slides",
    title: "The review deck",
    blurb:
      "16:9, mostly visual, under twenty words a slide. Titles left-aligned in serif, top or bottom corner. Cuts only, no transitions, no bullet animations.",
    href: "/examples/slides.html",
    external: true,
    note: "If a slide needs more than twenty words, it is the wrong slide.",
  },
  {
    kind: "sheets",
    eyebrow: "Google Sheets",
    title: "The tracker",
    blurb:
      "No banded rows, no default blue. Header row in mono caps, body in small sans, numbers right-aligned, hairline grid or none at all.",
    href: "/examples/sheets.html",
    external: true,
    note: "The one accent is a conditional highlight on the row that matters.",
  },
  {
    kind: "web",
    eyebrow: "Web",
    title: "The case study",
    blurb:
      "Single column under 720px, warm off-white ground, eyebrow into headline into body. Depth is tonal, motion is spring physics, exits fade.",
    href: "/examples/web.html",
    external: true,
    note: "Most pages use the accent zero times above the fold.",
  },
  {
    kind: "deck",
    eyebrow: "Presentations · reveal.js",
    title: "The stage deck",
    blurb:
      "Self-contained web decks for a projector. Eight layouts, keyboard navigation, speaker notes, and a documented dark stage variant for rooms where warm off-white would glow.",
    href: "/presentations",
    external: false,
    note: "The stage is dark, the work is light.",
  },
];

export const surfaceByKind = (kind: SurfaceKind) =>
  surfaces.find((s) => s.kind === kind);
