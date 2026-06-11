---
version: alpha
name: Dan Sozanski
description: >
  Personal design system for Dan Sozanski's documents, slides, and sheets.
  Apple-esque, gallery-quiet, professional casual. Mostly grayscale on warm
  off-white, with restrained pastel grey-blue accents. Reading it should feel
  like walking into a quiet, well-lit room.
colors:
  ink: "#0A0A0A"            # near-black, primary text and headlines
  graphite: "#3D3D3D"       # secondary text, strong borders
  slate: "#6B6B6B"           # tertiary text, captions, metadata
  rule: "#E5E5E5"            # hairlines, dividers, table grids
  surface: "#FAFAF7"          # warm off-white background (near pure)
  surface-elevated: "#FFFFFF" # cards, modals, slide canvases
  surface-sunken: "#F2F1ED"   # tonal layer one step below surface
  accent: "#9BB0C9"           # pastel grey-blue — used sparingly, for one thing per view
  accent-muted: "#E8EEF4"     # accent tint for fills, highlights
  on-accent: "#0A0A0A"        # text on accent fills (ink; the pastel is too light for white)
typography:
  display:
    fontFamily: Davinci, Instrument Serif, serif
    fontSize: 4.5rem
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.02em
  h1:
    fontFamily: Davinci, Instrument Serif, serif
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Davinci, Instrument Serif, serif
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.02em
  subtitle:
    fontFamily: Davinci, Instrument Serif, serif
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
    color: "{colors.graphite}"
  h3:
    fontFamily: SF Pro, DM Sans, sans-serif
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lg:
    fontFamily: SF Pro, DM Sans, sans-serif
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  body:
    fontFamily: SF Pro, DM Sans, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  body-sm:
    fontFamily: SF Pro, DM Sans, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  caption:
    fontFamily: SF Pro, DM Sans, sans-serif
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  label-caps:
    fontFamily: Roboto Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase
  mono:
    fontFamily: Roboto Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
motion:
  # Motion (motion.dev) native spring physics: stiffness, damping, mass.
  springs:
    snappy: { type: spring, stiffness: 700, damping: 50, mass: 1 } # micro-interactions: hovers, presses, chevrons
    smooth: { type: spring, stiffness: 300, damping: 28, mass: 1 } # default: entrances, layout shifts, indicator glides
    bouncy: { type: spring, stiffness: 170, damping: 14, mass: 1 } # one hero moment per view, max
  exit: { duration: 0.15s, easing: ease-in }                       # exits never spring; quick opacity fade
components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: 64px
  card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 24px
  divider:
    backgroundColor: "{colors.rule}"
    height: 1px
  link:
    textColor: "{colors.accent}"
    typography: "{typography.body}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: 12px
    typography: "{typography.body-sm}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.sm}"
    padding: 12px
    typography: "{typography.body-sm}"
  callout:
    backgroundColor: "{colors.accent-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 16px
  chip:
    backgroundColor: "{colors.surface-sunken}"   # variants: accent-muted fill, or 1px rule outline
    textColor: "{colors.graphite}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
    typography: "{typography.label-caps}"
  dialog:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.md}"
    padding: 24px
    border: 1px solid {colors.rule}
    overlay: rgba(10, 10, 10, 0.2)               # ink at 20%, no blur
    enter: "{motion.springs.smooth}"             # scale 0.96 -> 1 plus fade
    exit: "{motion.exit}"
  sheet:
    backgroundColor: "{colors.surface-elevated}"
    borderLeft: 1px solid {colors.rule}
    padding: 24px
    enter: "{motion.springs.smooth}"             # slides from the right
    exit: { duration: 0.2s, easing: ease-in }
  tabs:
    indicator: 1px solid {colors.ink}            # hairline underline, not a filled pill
    indicatorMotion: "{motion.springs.smooth}"   # shared-layout glide between tabs
    inactiveColor: "{colors.slate}"
    activeColor: "{colors.ink}"
  toast:
    backgroundColor: "{colors.surface-elevated}"
    border: 1px solid {colors.rule}
    rounded: "{rounded.md}"                      # no shadow, light theme only
  table-header:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.graphite}"
    typography: "{typography.label-caps}"
    padding: 8px
  table-cell:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: 8px
  list:
    # Docs surface (canonical, in points)
    spaceAbove: 12pt                # applied to EVERY list item, not just the first
    spaceBelow: 12pt                # applied to EVERY list item, not just the last
    lineSpacing: 1.15               # tight within-item wrap (multi-line bullets stay tight)
    indentStart: 36pt               # left indent from body
    indentFirstLine: 18pt           # hanging indent for the marker
    # Web surface (equivalent)
    paddingTop: "{spacing.md}"        # 16px breathing room before the block
    paddingBottom: "{spacing.md}"     # 16px breathing room after the block
    itemSpacing: "{spacing.md}"       # 16px between consecutive items (matches 12pt+12pt in Docs)
    indent: "{spacing.lg}"            # 24px hanging indent from body left edge
    nestedIndent: "{spacing.lg}"      # 24px additional indent per nested level
    nestedItemSpacing: "{spacing.xs}" # 4px between nested sub-items
    markerColor: "{colors.slate}"     # quiet markers, never ink-black
    typography: "{typography.body}"
    # The block-level padding (above/below) and the inter-item padding
    # are intentionally equal: every list item carries the same space
    # above and below. This means consecutive bullets get the sum
    # (24pt total of air between them) but isolated bullets and the
    # surrounding paragraphs both get the same 12pt of separation.
    # Simple rule. Easy to reproduce. No first/last edge cases.
---

## Overview

Apple-esque restraint, in the lineage of Alan Dye's design language: confident
serifs, generous whitespace, near-monochrome surfaces, and a single restrained
accent doing the work of ten. The vibe is **professional casual** — serious
about the craft, warm about the reader. Reading something built in this
system should leave the audience feeling **relieved, informed, motivated**.

This system applies to **Google Docs, Slides, Sheets, and the web**. Same
tokens, four surfaces. The personality stays constant.

**Three principles**

1. **Whitespace is the brand.** When in doubt, remove. Density signals panic.
2. **One accent per view.** The grey-blue accent is a scalpel, not a
   highlighter.
3. **Type does the design.** Davinci headings against SF Pro body is the
   entire mood. Don't decorate it.

## Colors

The palette is grayscale with a single accent. There is no secondary brand
color, no expressive palette, no gradient backgrounds. The accent (a pastel
grey-blue) appears at most once per view — typically in a link, a single highlighted
data point, or a CTA.

- **Ink (#0A0A0A)** — Headlines, body text. The voice of the document.
- **Graphite (#3D3D3D)** — Sub-headings, strong borders. Quiet authority.
- **Slate (#6B6B6B)** — Captions, metadata, secondary labels.
- **Rule (#E5E5E5)** — Hairlines, table grids. Should almost disappear.
- **Surface (#FAFAF7)** — The page itself. Warm, almost-white, never pure.
- **Surface elevated (#FFFFFF)** — Cards, slide canvases, table cells.
- **Surface sunken (#F2F1ED)** — Tonal depth, table headers, code blocks.
- **Accent (#9BB0C9)** — Pastel grey-blue. Use it once. Make it count.
- **Accent muted (#E8EEF4)** — Callout fills and highlight backgrounds.

**Dark mode is not supported.** This system lives in light surfaces only.

## Typography

Two type families do all the work.

- **Davinci** for display, h1, h2. Tight tracking (-0.02em), regular weight,
  large size, generous leading. It carries the emotion. **Instrument Serif**
  is the public fallback when Davinci is not available (web pages, agent
  output, anywhere the licensed file isn't loaded).
- **SF Pro** (Apple's system face) for h3, body, and captions. Quiet,
  readable, trustworthy. On Apple platforms and the web it loads via
  `-apple-system`. Where SF Pro isn't available — Google Workspace
  (Docs / Slides / Sheets), non-Apple devices — fall back to **DM Sans**,
  which is available in Google Fonts and Workspace.
- **Roboto Mono** for labels, captions, code, and tabular figures. Used
  sparingly, often in uppercase with 0.08em tracking for section eyebrows.

**Rules**

- Headings are tight (-0.02em) and never bold. Weight comes from size and
  serif, not from `font-weight: 700`.
- Body copy is `1rem`, line-height `1.55`, with measure capped at ~70
  characters per line.
- All-caps is reserved for `label-caps` only. Never for body, never for h1-h3.
- Italics are allowed for emphasis, never for whole paragraphs.

## Layout

Everything is on an **8px grid**, with `4px` available for fine adjustments.
Margins, paddings, and gaps come from the spacing scale. Nothing improvised.

- **Spacing scale:** 4, 8, 16, 24, 32, 48, 64.
- **Page margins:** 64px on desktop docs; 48px on Slides edges.
- **Vertical rhythm:** Section breaks use `xxl` (48px); paragraph spacing
  uses `md` (16px); every list item carries `12pt` space-above and
  `12pt` space-below (so consecutive bullets get `24pt` between them, and
  the list block has `12pt` of breathing room from surrounding paragraphs).
- **Measure:** Cap body text width near 65–75 characters. Long lines kill
  the calm.

## Elevation & Depth

Subtle tonal layers at rest. Depth comes from three things:

1. **Tonal shift** — `surface` (page) → `surface-elevated` (card) →
   `surface-sunken` (table header / code block).
2. **Hairlines** — 1px `rule` color borders, never thicker than 1px.
3. **Whitespace** — More breathing room around an element is its own
   form of elevation.

**Shadows are reserved for lift.** Interactive cards carry a soft,
diffuse resting shadow that deepens on hover, paired with a slight
scale — white, borderless, clean. Shadows are ink-based and low-alpha
(4-12%), never hard-edged, never decorative on static content. No
gradients. No glows.

## Motion

Second-order dynamics, expressed in Motion's native spring physics:
**stiffness**, **damping**, and **mass**. No duration curves, no easing
names — the physics is the spec. Three presets do all the work; nothing
animates outside them.

- **snappy** (stiffness 700, damping 50, mass 1) — micro-interactions:
  hovers, presses, chevron rotations. Heavily damped; no overshoot, ever.
- **smooth** (stiffness 300, damping 28, mass 1) — the default:
  entrances, layout shifts, tab-indicator glides. A whisper of settle.
- **bouncy** (stiffness 170, damping 14, mass 1) — one hero moment per
  view, max. The text reveal on a landing headline, and that's about it.

**Rules**

- Visible overshoot is seasoning, not flavor. Only `bouncy` carries it.
- Exits never spring. They fade out in 150ms ease-in. A dialog that
  bounces on the way out overstays its welcome.
- Respect `prefers-reduced-motion`, always. On the web this is
  `MotionConfig reducedMotion="user"` at the root.
- Implemented with Motion (motion.dev) only, imported from `motion/react`.
  Factory values live in `web/src/lib/defaults.ts`; the presets are
  tunable live from the site's Motion panel and surface as quick-apply
  chips in every motion panel.

## States & Interaction

- **Hover** — tonal shift, one step (`surface` -> `surface-sunken` for
  ghost fills, toward white for cards), or text color toward `ink`.
  May pair with a scale up to 1.02. Animated on `snappy`.
- **Press** — scale 0.98 on `snappy`. Physical, tiny, quiet.
- **Interactive elements never translate.** No y-axis lifts, no nudges.
  Movement on hover and press reads as depth (scale toward or away from
  the viewer), never as displacement. Translation is reserved for
  entrances and exits (dialogs, sheets, reveals).
- **Focus** — visible focus ring in `accent` at ~50% opacity, 3px. The
  one place the accent may repeat. Never remove focus styles.
- **Disabled** — 50% opacity, no pointer events. No grayed-out custom
  palettes.
- **Selected / active** — `ink` text plus a 1px `ink` underline or
  `surface-sunken` fill. Never an accent fill.

## Layering

Layers are few and fixed. Tonal surfaces handle depth inside the page;
z-index handles depth above it.

- `0` — page content.
- `40` — sticky chrome (site header), `surface` at 90% with light blur.
- `50` — overlays and modals (dialog, sheet, toast). Overlay scrim is
  ink at 20%, no backdrop blur.

## Shapes

Corners are gentle but never round. Default is `8px`. Small chips and tags
use `4px`. Large hero containers and feature callouts may use `16–24px`.
Pills (full-radius) are not used in docs; reserved for inline status chips
inside data views only.

## Components

- **Page** — `surface` background, `ink` text, `body` typography, 64px
  padding. Every doc starts here.
- **Card** — `surface-elevated` background, `md` rounded, `lg` padding.
  Group related content; never more than 3 cards stacked.
- **Divider** — 1px `rule`, full-width or content-width. Replaces most
  visual decoration.
- **Link** — `accent` text color, no underline at rest, underline on hover.
- **Button (primary)** — `ink` fill, `surface` text, `sm` rounded. Used for
  primary actions in interactive prototypes.
- **Button (accent)** — `accent` fill, white text. Reserved for the single
  most important action per view.
- **Callout** — `accent-muted` background, `ink` text, `md` rounded. Used
  to highlight a single key insight per document or slide.
- **Table** — `table-header` row in `surface-sunken` with `label-caps`
  type; `table-cell` rows in `surface-elevated` with `body-sm`. No banded
  rows. 1px `rule` hairlines only.
- **Chip** — `sm` rounded, `label-caps` type. Sunken, accent-muted, or
  1px-outline fills. For status in data views; the accent variant can be
  the view's one accent moment.
- **Dialog** — `surface-elevated`, `md` rounded, 1px `rule` border.
  Enters on `smooth` (scale 0.96 to 1 plus fade), exits on a 150ms
  fade. Overlay is ink at 20%, no blur.
- **Sheet** — side panel on `surface-elevated` with a 1px `rule` left
  border. Slides in on `smooth`, exits 200ms ease-in. For secondary
  tasks that shouldn't steal the page.
- **Tabs** — inactive labels in `slate`, active in `ink`, with a 1px
  `ink` underline that glides between tabs on `smooth`. The indicator
  is a hairline, never a filled pill.
- **Accordion** — hairline-divided rows, chevron rotates 180° on
  `snappy`-equivalent timing. Content height animates quietly.
- **Hover-lift card** — the interactive card language: white,
  borderless, 16px corners, soft resting shadow. On hover it scales to
  1.02 and the shadow deepens, on `snappy`. Nothing moves on the y axis.
- **Text reveal** — per-word serif reveal, 50ms stagger on `smooth`.
  One per view; this is the `bouncy` budget spent.
- **Toast** — `surface-elevated`, 1px `rule`, no shadow, bottom corner.
  Quiet confirmations only; errors deserve a dialog.
- **List (bulleted or numbered)** — Lists breathe. They are not paragraphs
  with bullets glued on. The rule is uniform: every list item gets the same
  space-above and the same space-below. Consecutive bullets sum to a real
  gap; isolated bullets and the surrounding paragraphs all share the same
  separation. No first/last edge cases.
  - **Per-item spacing (canonical, Docs):** `12pt` space-above, `12pt`
    space-below on every list item. Renders as `24pt` between bullets and
    `12pt` between the list and any neighboring paragraph.
  - **Per-item spacing (web equivalent):** `margin: 16px 0` on every
    `li` (collapsing margins should sum to ~16px between items, ~16px
    around the block).
  - **Within-item line spacing:** `1.15`. Multi-line bullets stay tight
    so wrapped text reads as one thought.
  - **Indent:** `36pt` left indent with `18pt` first-line indent for the
    marker (hanging indent). Wrapped text aligns with itself.
  - **Nested levels:** additional `24pt` indent per level, with `xs` (4px)
    between nested sub-items (tighter than the parent list).
  - **Markers:** `slate` (#6B6B6B) color, never `ink`. Markers should
    recede, not compete with the text. Bullets are filled circles; ordered
    lists use plain numerals followed by a period, no parentheses.
  - **Type:** Same body face as surrounding copy. Never bold an entire list
    item; emphasis comes from the lead phrase being followed by a period
    or em-equivalent punctuation (commas, periods).
  - **Maximum length:** 7 items per list. If you need more, you need
    sub-headings, not a longer list.

## Surface Conventions

**Web**
- Background `surface` (`#FAFAF7`), never pure white. Body in SF Pro
  (DM Sans fallback), headlines in Davinci (Instrument Serif fallback),
  labels in Roboto Mono uppercase with 0.08em tracking.
- **Lists in CSS:** `ul, ol { margin: 16px 0; padding-left: 24px; }`,
  `li { margin-bottom: 8px; color: inherit; }`, `li::marker { color:
  var(--slate); }`, `li:last-child { margin-bottom: 0; }`, and for nested
  lists `ul ul, ol ol, ul ol, ol ul { margin: 8px 0 0 0; }` with
  `li li { margin-bottom: 4px; }`. Never collapse list margins to zero.
- Single column reading at <=720px content width. Generous gutters at
  larger viewports (>=64px page padding desktop, 24px mobile).
- Section eyebrows use `label-caps`. Section headlines use `h1` or `h2`.
- One accent moment per scroll-viewport. Most pages use the accent zero
  times above the fold and once below it.
- Shadows only on interactive lift and floating layers, soft and
  ink-based. No gradients or glows. Depth at rest is tonal (`surface` ->
  `surface-elevated` -> `surface-sunken`) plus 1px `rule` hairlines.
- No dark mode. Light surfaces only.
- Motion uses spring physics (`stiffness` / `damping` / `mass`) via the
  three presets (`snappy` / `smooth` / `bouncy`); exits are 150ms opacity
  fades. See the Motion section.
- Respect `prefers-reduced-motion`. No autoplay video above the fold.
- The web surface is implemented in `personal_design_system/web/`:
  Next.js (App Router, TypeScript), Tailwind CSS v4 with `@theme` tokens
  generated from this file, shadcn/ui restyled to these tokens, and
  Motion via `motion/react`. Spring presets: `web/src/lib/motion.ts`.
- Em-dashes banned in copy. Use commas, periods, or parentheses.

**Google Docs**

This is the canonical surface and the most specified. Use these exact
values; they are derived from the live playbook template.

*Type scale (Docs, in points):*

| Level                  | Family                     | Size  | Weight  | Line spacing | Notes                                          |
| ---------------------- | -------------------------- | ----- | ------- | ------------ | ---------------------------------------------- |
| Title                  | Davinci / Instrument Serif | 32pt  | Regular | 1.5          | Applied via Docs `Title` named style.          |
| Eyebrow (above title)  | Roboto Mono                | 8pt   | Regular | 1.5          | Uppercase, 0.08em tracking.                    |
| Subtitle / lede        | Davinci / Instrument Serif | 16pt  | Regular | 1.5          | Short serif paragraph beneath the H1.          |
| H1 (page title)        | Davinci / Instrument Serif | 24pt  | Regular | 1.5          | Used once per doc.                             |
| H2 (major section)     | Davinci / Instrument Serif | 20pt  | Regular | 1.5          | Color `#0A0A0A`. Saved as the H2 named style.  |
| H3 (sub-section)       | DM Sans                    | 12pt  | Regular | 1.5          | Quiet sans label, sits inside an H2.           |
| H4 (question grouping) | DM Sans                    | 11pt  | Medium  | 1.5          | Inline labels grouping clusters of bullets.    |
| H5 (callout label)     | Roboto Mono                | 8pt   | Regular | 1.5          | Uppercase, 0.08em tracking. e.g. `NOTES`.      |
| Body                   | DM Sans                    | 10pt  | Regular | 1.5          | Default reading text.                          |
| List item              | DM Sans                    | 10pt  | Regular | **1.15**     | Tight wrap inside the bullet, see list rules.  |
| TL;DR accent           | DM Sans                    | 10pt  | Bold    | 1.5          | Color `#9BB0C9`. One per doc.                  |

Serif levels use Davinci where the licensed font is installed and Instrument
Serif otherwise. SF Pro is not available in Google Workspace, so DM Sans is
the body face on Docs / Slides / Sheets.

*Structure rules:*
- Title in Docs `Title` named style. Optional Roboto Mono eyebrow above it.
- TL;DR at the top of the body, bold + `#9BB0C9` accent on the `TL;DR`
  glyph, regular body on the rest of the line.
- One accent moment per doc — usually the TL;DR label, a link cluster, or
  a single highlighted callout.
- Save heading definitions as the doc's default styles
  (*Format → Paragraph styles → Update Heading X to match*, then
  *Options → Save as my default styles*) so new docs inherit automatically.

*Lists in Google Docs (canonical):*
- Select all list items, then *Format → Line & paragraph spacing →
  Custom spacing*. Set:
  - **Line spacing: 1.15**
  - **Space before paragraph: 12pt**
  - **Space after paragraph: 12pt**
- Apply uniformly to every item in every list. No first/last differentiation.
- This yields `24pt` of air between consecutive bullets and `12pt` of
  separation between the list block and surrounding paragraphs.

**Google Slides**
- 16:9 only. Always.
- Slides are **mostly visual**, very clean, minimal text. If a slide has
  more than ~20 words, it's the wrong slide.
- Title-only and image-only slides are encouraged.
- Slide title in Davinci (Instrument Serif fallback), left-aligned,
  top-left or bottom-left.
- One accent color use per deck section, max.
- No transitions. No bullet animations. Cuts only.

**Google Sheets**
- Minimal: no banded rows, no color-coded headers beyond `surface-sunken`.
- Header row uses `label-caps` (Roboto Mono uppercase, 0.08em tracking).
- Body cells in `body-sm` (DM Sans in Sheets).
- 1px `rule` gridlines, or none — never default Google blue.
- Numbers right-aligned, text left-aligned, headers left-aligned.
- The single accent moment in a sheet is a conditional-format highlight on
  the row or cell that matters most.

## Do's and Don'ts

**Do**
- Lead every document with a TL;DR.
- Use one accent moment per view. Make it the most important thing.
- Default to whitespace. Strip until it feels too sparse, then add one
  thing back.
- Let Davinci (or Instrument Serif) headlines carry the emotional weight.
- Right-align numbers. Always.

**Don't**
- Use em-dashes. Use commas, periods, or parentheses instead. (Dan's voice
  rule, em-dashes read as AI-authored.)
- Mix more than two type families on a single surface.
- Use the accent more than once per slide or section.
- Add gradients or glows. Shadows are allowed only as soft lift on
  interactive cards and floating layers, never as static decoration.
- Use banded rows in tables.
- Bold a heading. Size and serif are enough.
- Center-align body copy.

## Agent Prompt Guide

For any agent (Henry, Leo, Rip, future bots, or any coding assistant)
building artifacts in Dan's system, follow this guide.

**Quick reference**
- Surface: `#FAFAF7` warm off-white. Never pure white.
- Ink: `#0A0A0A`. Accent: `#9BB0C9` pastel grey-blue, used once per view.
- Headlines: Davinci, fallback Instrument Serif, weight 400, tracking -0.02em.
- Body: SF Pro via `-apple-system` (fallback DM Sans), 1rem, line-height 1.55.
- Labels: Roboto Mono uppercase, 0.08em tracking.
- Spacing: 4, 8, 16, 24, 32, 48, 64. Page padding 64px desktop, 24-48px mobile.
- Corners: 8px default, 4px for chips, 16-24px for hero containers. No pills in docs.
- Depth: tonal layers and hairlines at rest; soft ink-based shadows
  (4-12% alpha) for interactive lift and floating layers. No gradients,
  no glows.
- Motion: spring physics only — snappy (700/50/1), smooth (300/28/1),
  bouncy (170/14/1, once per view) as stiffness/damping/mass. Exits fade
  150ms ease-in. Respect `prefers-reduced-motion`.
- Light mode only. No dark theme.

**Ready-to-use prompts**

*One-pager (Google Doc)*
> Build a one-page doc using Dan's design system at
> `~/gdrive/02_areas/personal_design_system/DESIGN.md`. Lead with a TL;DR in
> a callout. Title in Davinci (Instrument Serif fallback) display size,
> eyebrow in Roboto Mono uppercase, body in SF Pro (DM Sans fallback).
> One accent moment, max. No em-dashes.

*Deck (Google Slides)*
> Build a 16:9 deck using Dan's design system. Mostly visual slides, <=20
> words per slide. Davinci/Instrument Serif titles left-aligned, top or
> bottom corner. Cuts only, no transitions, no bullet animations. One
> accent color use per section, max.

*Web page or prototype*
> Build a web page using the tokens and rules in
> `~/gdrive/02_areas/personal_design_system/DESIGN.md`. Load Davinci if
> available, fall back to Instrument Serif from Google Fonts. Background
> `#FAFAF7`. Single column <=720px reading width. One grey-blue accent
> moment per viewport. Tonal depth only. Respect `prefers-reduced-motion`.

**Pre-flight checklist**
- [ ] Background is `#FAFAF7`, not pure white.
- [ ] Accent `#9BB0C9` appears at most once per visible viewport.
- [ ] Headings use Davinci or Instrument Serif. Never bolded.
- [ ] Spacing values come from the 8px scale.
- [ ] Shadows appear only as soft lift on interactive cards and
      floating layers. No gradients or glows anywhere.
- [ ] No em-dashes in any copy.
- [ ] Tables have no banded rows. Numbers right-aligned.
- [ ] Body measure capped near 65-75 characters.
- [ ] Light mode only. No dark theme variants.
- [ ] Every list item has `12pt` space-above and `12pt` space-below
      (Docs) or `margin: 16px 0` (web). No first/last edge cases.
- [ ] List items use `1.15` line spacing inside each bullet so wraps
      stay tight.
- [ ] List indent: `36pt` left, `18pt` first-line (hanging) in Docs;
      `24px` left in web.
- [ ] All spacing applied via style definitions, never via blank lines
      or hard returns.
- [ ] All animation uses the named spring tokens; nothing animates on
      ad-hoc durations or easings.
- [ ] Exits fade (150ms ease-in); nothing springs on the way out.
- [ ] `bouncy` (the only visible overshoot) appears at most once per view.
- [ ] Focus rings are visible on every interactive element.

