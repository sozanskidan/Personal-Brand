"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CopyIcon, PauseIcon, PlayIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTokens } from "@/lib/token-context";

const PRESETS = [
  { key: "snappy", usage: "hovers, presses, chevrons" },
  { key: "smooth", usage: "entrances, layout shifts" },
  { key: "bouncy", usage: "one hero moment per view" },
] as const;

export function SpringDemo() {
  const { values } = useTokens();
  const [side, setSide] = React.useState(false);
  const [looping, setLooping] = React.useState(true);

  React.useEffect(() => {
    if (!looping) return;
    const id = setInterval(() => setSide((s) => !s), 1400);
    return () => clearInterval(id);
  }, [looping]);

  const copyPreset = async (key: string) => {
    const s = values[`spring.${key}.stiffness`];
    const d = values[`spring.${key}.damping`];
    const m = values[`spring.${key}.mass`];
    const snippet = `{ type: "spring", stiffness: ${s}, damping: ${d}, mass: ${m} }`;
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
          const stiffness = Number(values[`spring.${preset.key}.stiffness`]);
          const damping = Number(values[`spring.${preset.key}.damping`]);
          const mass = Number(values[`spring.${preset.key}.mass`]);
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
                  stiffness {stiffness} · damping {damping} · mass {mass} —{" "}
                  {preset.usage}
                </span>
              </div>
              <div className="relative h-8 rounded-sm border border-rule bg-surface-elevated">
                <motion.div
                  className="absolute top-1 size-6 rounded-sm bg-ink"
                  initial={false}
                  animate={{ left: side ? "calc(100% - 28px)" : "4px" }}
                  transition={{ type: "spring", stiffness, damping, mass }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex items-center gap-2">
        <Button variant="outline" onClick={() => setLooping((l) => !l)}>
          {looping ? (
            <>
              <PauseIcon data-icon="inline-start" /> Pause loop
            </>
          ) : (
            <>
              <PlayIcon data-icon="inline-start" /> Loop
            </>
          )}
        </Button>
        {!looping ? (
          <Button variant="ghost" onClick={() => setSide((s) => !s)}>
            Play once
          </Button>
        ) : null}
      </div>
    </div>
  );
}
