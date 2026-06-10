# Personal Design System

Dan's personal visual identity for Google Docs, Slides, and Sheets — and any
coding agent that needs to render in his voice.

## What's here

- **DESIGN.md** — The spec. YAML tokens + markdown rationale, following the
  [google-labs-code/design.md](https://github.com/google-labs-code/design.md)
  format. Hand this to any agent that's making a doc, slide, or sheet for Dan.

## The vibe (1-liner)

Apple-restraint serifs on warm off-white, near-monochrome with a single
pastel grey-blue scalpel cut per view. Davinci headlines (Instrument Serif
fallback) do the emotional work, SF Pro (DM Sans fallback) reads the body,
Roboto Mono whispers the labels.

## How to use

**With an agent:**
> "Use the DESIGN.md at `~/gdrive/02_areas/personal_design_system/DESIGN.md`
> as the visual spec for this document."

**Lint it:**
```bash
npx @google/design.md lint DESIGN.md
```

**Diff against a future revision:**
```bash
npx @google/design.md diff DESIGN.md DESIGN-v2.md
```

## Updating

Treat DESIGN.md as a living doc. When something feels off in practice (a
spacing value, a type rule, a color), update the tokens — don't override
them in individual files.
