# Print / DOCX collateral

Generates 8.5x11 Word documents that conform to the Google Docs surface in
`../DESIGN.md`, for upload into Google Docs.

## Use

```bash
npm install      # once
npm run build    # writes proposal.docx
```

Edit the `CONTENT` block at the top of `generate.mjs`, rebuild, then upload
`proposal.docx` to Google Docs (File -> Open -> Upload).

## Why DOCX

Davinci and SF Pro are not in Google Workspace, so the generator uses the
canonical fallbacks the Docs surface already specifies: **Instrument Serif**
(headings), **DM Sans** (body), **Roboto Mono** (labels). Headings use Word's
built-in style IDs (Title, Heading 1-5, Normal), so Google Docs maps them onto
its own named styles on import — the headings stay editable as system styles.

## First-time font note

Roboto Mono is in Google Docs by default. The first time you open the uploaded
doc, add **Instrument Serif** and **DM Sans** via the font menu -> *More fonts*
if they are not already in your list; the text is tagged with those names, so
once added they render correctly everywhere.
