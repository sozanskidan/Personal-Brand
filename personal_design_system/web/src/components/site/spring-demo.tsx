"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTokens } from "@/lib/token-context";

const PRESETS = [
  { key: "quiet", usage: "hovers, presses, chevrons" },
  { key: "standard", usage: "entrances, layout shifts" },
  { key: "playful", usage: "one hero moment per view" },
] as const;

export function SpringDemo() {
  const { values } = useTokens();
  const [side, setSide] = React.useState(false);

  const copyPreset = async (key: string) => {
    const vd = values[`springs.${key}.visualDuration`];
    const bounce = values[`springs.${key}.bounce`];
    const snippet = `{ type: "spring", visualDuration: ${vd}, bounce: ${bounce} }`;
    try {
      await navigator.clipboard.writeText(snippet);
      toast(`${key} spring copied.`, { description: snippet });
    } catch {
      toast("Couldn't reach the clipboard.");
    }
  };

  return (
    <div className="rounded-md border border-rule bg-surface-sunken/60 p-8">
      <div className="space-y-6">
        {PRESETS.map((preset) => {
          const vd = Number(values[`springs.${preset.key}.visualDuration`]);
          const bounce = Number(values[`springs.${preset.key}.bounce`]);
          return (
            <div key={preset.key}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <span className="flex items-center gap-2">
                  <span className="font-mono text-sm text-ink">
                    {preset.key}
                  </span>
                  <button
                    aria-label={`Copy ${preset.key} spring`}
                    title="Copy spring transition"
                    onClick={() => copyPreset(preset.key)}
                    className="rounded-sm p-1 text-slate transition-colors hover:bg-surface-sunken hover:text-ink"
                  >
                    <CopyIcon className="size-3.5" />
                  </button>
                </span>
                <span className="hidden font-mono text-xs text-slate sm:inline">
                  {vd}s · bounce {bounce} — {preset.usage}
                </span>
              </div>
              <div className="relative h-8 rounded-sm border border-rule bg-surface-elevated">
                <motion.div
                  className="absolute top-1 size-6 rounded-sm bg-ink"
                  initial={false}
                  animate={{ left: side ? "calc(100% - 28px)" : "4px" }}
                  transition={{
                    type: "spring",
                    visualDuration: vd,
                    bounce,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Button variant="outline" className="mt-8" onClick={() => setSide((s) => !s)}>
        Play
      </Button>
    </div>
  );
}
