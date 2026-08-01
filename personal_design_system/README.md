# Personal Design System

Dan's personal visual identity for documents, slides, sheets, presentations,
and the web, plus any coding agent that needs to render in his voice.

## The spec

**`DESIGN.md`** is the source of truth. YAML tokens plus markdown rationale,
following the [google-labs-code/design.md](https://github.com/google-labs-code/design.md)
format. Hand this to any agent making anything for Dan.

## The vibe (1-liner)

Apple-restraint serifs on warm off-white, near-monochrome with a single pastel
grey-blue scalpel cut per view. Davinci headlines (Instrument Serif fallback)
do the emotional work, SF Pro (DM Sans fallback) reads the body, Roboto Mono
whispers the labels.

## Layout

    DESIGN.md              the spec, and the only source of truth
    web/                   the canonical implementation (Next.js, static export)
      src/app/foundations    tokens, live and tunable
      src/app/components     the catalog
      src/app/templates      compositions, plus the clickable surface cards
      src/app/presentations  reveal.js deck templates
      public/examples/       faithful per-surface examples (doc, slides, sheets, web)
      public/decks/          static reveal.js templates, see its README
    print/                 .docx generator for Google Docs collateral
    fonts/                 licensed and fallback type
    summer-plan/           an artifact built with the system, not a surface of it
    preview.html           superseded by web/, kept for reference
    site/                  superseded by web/, kept for reference
    templates/             superseded by web/public/examples/, kept for reference

## Surfaces

Five contexts, one personality: Google Docs, Google Slides, Google Sheets, the
web, and Presentations (reveal.js). Presentations is deliberately separate from
Google Slides. Slides is a shared editable artifact inside Workspace, a reveal
deck is a self-contained page you present from and hand over as a link.

Open `/templates` in the web app for a clickable example of each.

## Running the web app

    cd web
    npm install
    npm run dev            # localhost:3000
    npm run build          # static HTML into web/out/
    npm run vendor:reveal  # once, so decks present with the network off

## Consolidation note

`web/` is canonical. `preview.html`, `site/index.html`, and `templates/*.html`
are earlier implementations of the same design system and are no longer
maintained. Their content lives in the app: the surface cards came from
`preview.html`, and the four faithful examples now live in
`web/public/examples/`. Move the three into an `archive/` folder when you are
sure nothing links to them.

## Updating

Treat DESIGN.md as a living doc. When something feels off in practice, update
the tokens rather than overriding them in individual files, and write down the
reason next to the value. The stage variant under Presentations is the worked
example: a rule got an exception because a projector pushed back, and the
reason sits beside the token.

## Linting

    npx @google/design.md lint DESIGN.md
    npx @google/design.md diff DESIGN.md DESIGN-v2.md
