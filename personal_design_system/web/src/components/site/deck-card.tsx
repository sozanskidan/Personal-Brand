"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ds/eyebrow";
import { Chip } from "@/components/ds/chip";
import { deckHref, type Deck } from "@/lib/decks";

const snappy = { type: "spring", stiffness: 700, damping: 50, mass: 1 } as const;
const rest = "0 0 0 rgba(10,10,10,0)";
const lift =
  "0 12px 32px rgba(10,10,10,0.08), 0 4px 10px rgba(10,10,10,0.04)";

/**
 * A 16:9 thumbnail rendered live from tokens rather than screenshotted, so
 * it can never drift from the theme it advertises. Stage decks preview on
 * the ink ground, gallery decks on the warm off-white.
 */
function DeckThumb({ theme }: { theme: Deck["theme"] }) {
  const stage = theme === "stage";
  const ground = stage ? "var(--color-stage)" : "var(--color-surface)";
  const type = stage ? "var(--color-on-stage)" : "var(--color-ink)";
  const hair = stage ? "var(--color-rule-stage)" : "var(--color-rule)";

  return (
    <div
      className="flex aspect-[16/9] flex-col justify-between rounded-md p-6"
      style={{ background: ground, border: `1px solid ${hair}` }}
    >
      <div
        className="rounded-sm"
        style={{ width: "16%", height: 3, background: "var(--color-accent)" }}
      />
      <div className="flex flex-col gap-2">
        <div
          className="rounded-sm"
          style={{ width: "68%", height: 14, background: type }}
        />
        <div
          className="rounded-sm"
          style={{ width: "44%", height: 14, background: type }}
        />
      </div>
      <div className="flex items-center gap-3">
        <div
          className="rounded-sm"
          style={{ width: "22%", height: 3, background: hair }}
        />
        <div
          className="ml-auto rounded-sm"
          style={{ width: "6%", height: 3, background: hair }}
        />
      </div>
    </div>
  );
}

export function DeckCard({ deck }: { deck: Deck }) {
  return (
    <a
      href={deckHref(deck.slug)}
      target="_blank"
      rel="noreferrer"
      className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/50"
    >
      <motion.div
        initial={false}
        animate={{ boxShadow: rest }}
        whileHover={{ scale: 1.02, boxShadow: lift }}
        whileTap={{ scale: 0.98 }}
        transition={snappy}
        className="rounded-lg bg-surface-elevated p-6"
      >
        <DeckThumb theme={deck.theme} />

        <div className="mt-6 flex items-start justify-between gap-4">
          <Eyebrow>{deck.eyebrow}</Eyebrow>
          <ArrowUpRight
            className="size-4 shrink-0 text-slate"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>

        <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em] text-ink">
          {deck.title}
        </h3>
        <p className="mt-3 max-w-[46ch] text-sm text-graphite">{deck.blurb}</p>

        {deck.event ? (
          <p className="mt-3 font-mono text-xs text-slate">
            {deck.event}
            {deck.date ? ` · ${deck.date}` : null}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Chip>{deck.slides} slides</Chip>
          {deck.layouts.slice(0, 4).map((l) => (
            <Chip key={l}>{l}</Chip>
          ))}
          {deck.layouts.length > 4 ? (
            <Chip>+{deck.layouts.length - 4}</Chip>
          ) : null}
        </div>
      </motion.div>
    </a>
  );
}
