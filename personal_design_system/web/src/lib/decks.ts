/**
 * Presentation templates — reveal.js decks served straight out of public/.
 *
 * Kept separate from the Google Slides surface on purpose. Slides is a
 * shared, editable Workspace artifact. A reveal deck is a self-contained
 * web page built for a projector: keyboard navigation, speaker notes, an
 * overview grid, and PDF export, none of which Slides gives you.
 *
 * Every deck is static HTML. Nothing here is bundled by Next, so a deck
 * keeps working if the app does not.
 */

export type DeckTheme = "stage" | "gallery";

export type Deck = {
  slug: string;
  /**
   * Templates are starting points. Talks are real decks that were given, or
   * are about to be, and they stay in the repo as worked examples.
   */
  kind: "template" | "talk";
  title: string;
  /** Small mono line above the title. */
  eyebrow: string;
  blurb: string;
  theme: DeckTheme;
  /** Which of the eight layouts this template demonstrates. */
  layouts: string[];
  /** Slide count. */
  slides: number;
  /** Talks only: where and when. */
  event?: string;
  date?: string;
};

export const DECK_LAYOUTS = [
  "title-only",
  "statement",
  "split-half",
  "side-by-side",
  "three-col",
  "full-bleed",
  "code",
  "demo",
] as const;

/**
 * Patterns are compositions built out of the layouts, not new layouts.
 * `resources` is the closing reading-list slide: hairline cards, two-up,
 * one accent on the card worth opening first.
 */
export const DECK_PATTERNS = ["resources"] as const;

export const decks: Deck[] = [
  {
    slug: "greater-philly-ai",
    kind: "talk",
    title: "Designing with AI",
    eyebrow: "Talk · August 2026",
    blurb:
      "Slop is a communication failure, not a model failure. Thirty minutes on why AI output looks average, what a DESIGN.md actually fixes, and three years of one real client site.",
    theme: "stage",
    layouts: [...DECK_LAYOUTS, ...DECK_PATTERNS],
    slides: 38,
    event: "Greater Philly AI, Speaker Series #02",
    date: "2026-08-06",
  },
  {
    slug: "stage-dark",
    kind: "template",
    title: "Stage",
    eyebrow: "Template · Dark",
    blurb:
      "The projector template. Ink ground, off-white type, and artifacts floating as lit cards. Built for a dim room where the light surface would read as a glowing rectangle.",
    theme: "stage",
    layouts: [...DECK_LAYOUTS, ...DECK_PATTERNS],
    slides: 11,
  },
  {
    slug: "gallery-light",
    kind: "template",
    title: "Gallery",
    eyebrow: "Template · Light",
    blurb:
      "The same eight layouts on the canonical warm off-white surface. For a bright room, a shared link, or anything that leaves the stage and gets read instead of shown.",
    theme: "gallery",
    layouts: [...DECK_LAYOUTS, ...DECK_PATTERNS],
    slides: 11,
  },
  {
    slug: "case-study",
    kind: "template",
    title: "Case study",
    eyebrow: "Template · Image-led",
    blurb:
      "Full-bleed and side-by-side heavy, for work that argues with pictures. Minimal type, one accent, and a caption rail that stays out of the way.",
    theme: "stage",
    layouts: ["full-bleed", "side-by-side", "split-half", "statement", "title-only"],
    slides: 9,
  },
];

/**
 * Points at index.html rather than the directory. `next dev` serves public/
 * files by exact path with no directory-index resolution, so `/decks/x/`
 * would 404 locally even though it resolves once exported.
 */
export const templates = decks.filter((d) => d.kind === "template");
export const talks = decks.filter((d) => d.kind === "talk");

export const deckHref = (slug: string) => `/decks/${slug}/index.html`;
