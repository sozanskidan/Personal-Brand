# Presentation templates

Static reveal.js decks, served straight out of `public/`. Nothing here is
bundled by Next, so a deck keeps working when the app does not.

| Folder           | Theme   | For                                                    |
| ---------------- | ------- | ------------------------------------------------------ |
| `stage-dark/`    | stage   | A projector in a dim room. Ink ground, light artifacts. |
| `gallery-light/` | gallery | Bright rooms, shared links, anything read not shown.    |
| `case-study/`    | stage   | Image-led work. Full-bleed and side-by-side heavy.      |

## Starting a talk

    cp -r public/decks/stage-dark public/decks/my-talk

Then edit `index.html` and delete what you do not need. Register it in
`src/lib/decks.ts` so it appears on `/presentations`.

## Layouts

Set `data-layout` on each `<section>`. Eight of them, no more:
`title-only`, `statement`, `split-half` (add `data-flip="true"` to mirror),
`side-by-side`, `three-col`, `full-bleed`, `code`, `demo`. One pattern so far:
`resources`.

Variety comes from proportion, never decoration. If a slide fits none of the
eight, the slide is usually the problem.

## Themes

`data-theme` on `<html>`: `stage` or `gallery`. The stage variant is the one
documented exception to DESIGN.md's light-mode-only rule. Type inverts,
nothing else does, and artifacts stay light inside `.artifact` cards. See
Presentations under Surface Conventions in `DESIGN.md`.

## Presenting offline

    npm run vendor:reveal

Downloads reveal.js into `public/vendor/reveal/` so the deck works with the
network off. Until you run it, `_shared/deck-boot.js` falls back to jsDelivr.
Do this before you present anywhere with venue wifi.

## One file for the stage

    npm run bundle:deck greater-philly-ai

Writes `standalone.html` next to the deck with reveal, the theme, and every
font inlined as data URIs. Zero external requests, so it presents from a thumb
drive, an email attachment, or a borrowed laptop with the wifi off. Re-run it
after you replace the placeholder art. It reports any `img src` still pointing
at a path, since inlining big images would push the file past what email takes.

## Keys

`Esc` overview grid, `S` speaker notes, `F` fullscreen, `B` blank the screen,
`?` everything else. Speaker notes go in `<aside class="notes">`.
