"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { springs } from "@/lib/motion";

const presets = [
  {
    key: "quiet" as const,
    label: "quiet",
    detail: "visualDuration 0.18 · bounce 0 — hovers, presses, chevrons",
  },
  {
    key: "standard" as const,
    label: "standard",
    detail: "visualDuration 0.3 · bounce 0.1 — entrances, layout shifts",
  },
  {
    key: "playful" as const,
    label: "playful",
    detail: "visualDuration 0.45 · bounce 0.15 — one hero moment per view",
  },
];

export function SpringDemo() {
  const [side, setSide] = React.useState(false);

  return (
    <div className="rounded-md border border-rule bg-surface-sunken/60 p-8">
      <div className="space-y-6">
        {presets.map((preset) => (
          <div key={preset.key}>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <span className="font-mono text-sm text-ink">{preset.label}</span>
              <span className="hidden font-mono text-xs text-slate sm:inline">
                {preset.detail}
              </span>
            </div>
            <div className="relative h-8 rounded-sm border border-rule bg-surface-elevated">
              <motion.div
                className="absolute top-1 size-6 rounded-sm bg-ink"
                initial={false}
                animate={{ left: side ? "calc(100% - 28px)" : "4px" }}
                transition={springs[preset.key]}
              />
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-8" onClick={() => setSide((s) => !s)}>
        Play
      </Button>
    </div>
  );
}
