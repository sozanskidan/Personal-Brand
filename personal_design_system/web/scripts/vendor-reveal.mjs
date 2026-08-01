/**
 * Vendors reveal.js into public/vendor/reveal/ so decks present offline.
 *
 *   npm run vendor:reveal
 *
 * Prefers a local node_modules copy (if reveal.js is installed) and falls
 * back to downloading from jsDelivr. Run it once; commit the result if you
 * want the decks to survive a fresh clone with no network.
 */
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const VERSION = "5.2.1";
const OUT = resolve(process.cwd(), "public/vendor/reveal");
const FILES = [
  "dist/reveal.css",
  "dist/reveal.js",
  "plugin/notes/notes.js",
  "plugin/notes/speaker-view.html",
];

const exists = (p) => access(p).then(() => true).catch(() => false);

async function fromNodeModules(rel) {
  const p = resolve(process.cwd(), "node_modules/reveal.js", rel);
  return (await exists(p)) ? readFile(p) : null;
}

async function fromCdn(rel) {
  const url = `https://cdn.jsdelivr.net/npm/reveal.js@${VERSION}/${rel}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

let local = 0;
let remote = 0;

for (const rel of FILES) {
  let buf = await fromNodeModules(rel);
  if (buf) local++;
  else {
    buf = await fromCdn(rel);
    remote++;
  }
  const dest = join(OUT, rel);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log(`  ${rel}  ${(buf.length / 1024).toFixed(1)} KB`);
}

console.log(
  `\nreveal.js ${VERSION} vendored to public/vendor/reveal/ (${local} local, ${remote} downloaded).`,
);
console.log("Decks now present with the network off.");
