/**
 * Bundles a deck into one self-contained HTML file.
 *
 *   npm run bundle:deck greater-philly-ai
 *
 * Inlines reveal's CSS and JS, the shared deck.css, and every font as a data
 * URI, then rewrites the boot script into a direct Reveal.initialize call. The
 * result has zero external requests, so it presents from a thumb drive, an
 * email attachment, or a borrowed laptop with the wifi off.
 *
 * Run this again after you fill in the placeholder art. Any <img src> still
 * pointing at a relative or absolute path will be reported and left alone,
 * since inlining large images would bloat the file past what email accepts.
 *
 * Requires public/vendor/reveal/ first: npm run vendor:reveal
 */
import { readFile, writeFile, access } from "node:fs/promises";
import { resolve, extname } from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("usage: node scripts/bundle-deck.mjs <deck-slug>");
  process.exit(1);
}

const PUB = resolve(process.cwd(), "public");
const src = resolve(PUB, "decks", slug, "index.html");
const out = resolve(PUB, "decks", slug, "standalone.html");

const exists = (p) => access(p).then(() => true).catch(() => false);

if (!(await exists(src))) {
  console.error(`no deck at public/decks/${slug}/index.html`);
  process.exit(1);
}
if (!(await exists(resolve(PUB, "vendor/reveal/dist/reveal.js")))) {
  console.error("reveal.js is not vendored yet. Run: npm run vendor:reveal");
  process.exit(1);
}

const MIME = { ".otf": "font/otf", ".ttf": "font/ttf", ".woff": "font/woff", ".woff2": "font/woff2" };

let html = await readFile(src, "utf8");
let deckCss = await readFile(resolve(PUB, "decks/_shared/deck.css"), "utf8");
const revealCss = await readFile(resolve(PUB, "vendor/reveal/dist/reveal.css"), "utf8");
const revealJs = await readFile(resolve(PUB, "vendor/reveal/dist/reveal.js"), "utf8");
const notesJs = await readFile(resolve(PUB, "vendor/reveal/plugin/notes/notes.js"), "utf8");

// Fonts referenced from deck.css, as data URIs.
for (const [, url] of deckCss.matchAll(/url\("(\/vendor\/fonts\/[^"]+)"\)/g)) {
  const file = resolve(PUB, url.slice(1));
  if (!(await exists(file))) {
    console.warn(`  missing font, left as-is: ${url}`);
    continue;
  }
  const buf = await readFile(file);
  const mime = MIME[extname(file)] ?? "application/octet-stream";
  deckCss = deckCss.replaceAll(url, `data:${mime};base64,${buf.toString("base64")}`);
}

// reveal.css must precede deck.css so the theme wins equal-specificity ties.
html = html.replace(
  '<link rel="stylesheet" href="../_shared/deck.css" />',
  `<style>\n/* reveal.js core */\n${revealCss}\n</style>\n<style>\n/* deck.css, fonts inlined */\n${deckCss}\n</style>`,
);

html = html.replace(
  '<script src="../_shared/deck-boot.js"></script>',
  `<script>${revealJs}</script>\n<script>${notesJs}</script>\n<script>
  Reveal.initialize({
    width: 1280, height: 720, margin: 0, minScale: 0.2, maxScale: 2.0,
    transition: "none", backgroundTransition: "none",
    controls: true, controlsLayout: "edges", progress: true,
    slideNumber: false, hash: true,
    plugins: typeof RevealNotes !== "undefined" ? [RevealNotes] : [],
  });
</script>`,
);

const leftovers = [...html.matchAll(/(?:src|href)="((?:\.\.\/|\/)[^"]+)"/g)].map((m) => m[1]);
if (leftovers.length) {
  console.warn("\n  still external, inline or embed these by hand:");
  for (const l of new Set(leftovers)) console.warn(`    ${l}`);
}

await writeFile(out, html);
const kb = Math.round(Buffer.byteLength(html) / 1024);
console.log(`\npublic/decks/${slug}/standalone.html  ${kb} KB`);
console.log("Zero external requests. Presents with the network off.");
