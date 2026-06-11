"use client";

import * as React from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { getScope } from "@/lib/defaults";
import { useTokens, useSpringToken } from "@/lib/token-context";
import {
  LIFT_REST_SHADOW,
  LIFT_HOVER_SHADOW,
} from "@/components/ds/hover-lift-card";

const USAGE: Record<string, string> = {
  ink: "Headlines, body text. The voice of the document.",
  graphite: "Sub-headings, strong borders. Quiet authority.",
  slate: "Captions, metadata, secondary labels.",
  rule: "Hairlines, table grids. Should almost disappear.",
  surface: "The page itself. Warm, almost-white, never pure.",
  "surface-elevated": "Cards, slide canvases, table cells.",
  "surface-sunken": "Tonal depth, table headers, code blocks.",
  accent: "Pastel grey-blue. Use it once. Make it count.",
  "accent-muted": "Callout fills and highlight backgrounds.",
  "on-accent": "Text on accent fills.",
};

export function ColorGrid() {
  const { values } = useTokens();
  const spring = useSpringToken("spring.snappy");
  const colors = getScope("colors")?.controls ?? [];

  const copy = async (label: string, hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      toast(`${hex} copied.`, { description: label });
    } catch {
      toast("Couldn't reach the clipboard.");
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {colors.map((c) => {
        const hex = String(values[`colors.${c.key}`]);
        return (
          <motion.button
            key={c.key}
            onClick={() => copy(c.label, hex)}
            title={`Copy ${hex}`}
            initial={{ boxShadow: LIFT_REST_SHADOW }}
            whileHover={{ scale: 1.02, boxShadow: LIFT_HOVER_SHADOW }}
            whileTap={{ scale: 0.99 }}
            transition={spring}
            className="flex h-full cursor-pointer flex-col items-stretch justify-start rounded-(--lift-radius) bg-surface-elevated p-4 text-left"
          >
            <div
              className="h-16 w-full shrink-0 rounded-sm border border-rule"
              style={{ backgroundColor: hex }}
            />
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <p className="text-sm text-ink">{c.label}</p>
              <p className="font-mono text-xs text-slate">{hex}</p>
            </div>
            <p className="mt-1 text-[0.8125rem] leading-normal text-slate">
              {USAGE[c.key] ?? ""}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
