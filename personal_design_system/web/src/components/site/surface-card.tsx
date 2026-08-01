"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ds/eyebrow";
import { SurfaceMockup } from "@/components/site/surface-mockups";
import type { Surface } from "@/lib/surfaces";

/**
 * The card language, applied to a link. Flat at rest, scales toward the
 * viewer on hover with a soft ink shadow. Nothing translates on the y
 * axis, and the background is never animated, because these cards sit on
 * two different grounds (surface and stage).
 */
const snappy = { type: "spring", stiffness: 700, damping: 50, mass: 1 } as const;

const rest = "0 0 0 rgba(10,10,10,0)";
const lift =
  "0 12px 32px rgba(10,10,10,0.08), 0 4px 10px rgba(10,10,10,0.04)";

export function SurfaceCard({
  surface,
  wide = false,
}: {
  surface: Surface;
  wide?: boolean;
}) {
  const inner = (
    <motion.div
      initial={false}
      animate={{ boxShadow: rest }}
      whileHover={{ scale: 1.02, boxShadow: lift }}
      whileTap={{ scale: 0.98 }}
      transition={snappy}
      className="flex h-full flex-col rounded-lg bg-surface-elevated p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <Eyebrow>{surface.eyebrow}</Eyebrow>
        <ArrowUpRight
          className="size-4 shrink-0 text-slate"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>

      <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em] text-ink">
        {surface.title}
      </h3>

      <p className="mt-3 max-w-[46ch] text-sm text-graphite">{surface.blurb}</p>

      <div className={wide ? "mt-6 grid gap-6 md:grid-cols-2" : "mt-6"}>
        <SurfaceMockup kind={surface.kind} />
        {wide ? (
          <p className="self-end font-serif text-xl tracking-[-0.02em] text-graphite">
            {surface.note}
          </p>
        ) : null}
      </div>

      {wide ? null : (
        <p className="mt-4 text-xs text-slate">{surface.note}</p>
      )}
    </motion.div>
  );

  if (surface.external) {
    return (
      <a
        href={surface.href}
        target="_blank"
        rel="noreferrer"
        className="block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/50"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={surface.href}
      className="block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/50"
    >
      {inner}
    </Link>
  );
}
