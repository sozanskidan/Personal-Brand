"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Settings2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { springs, fadeExit } from "@/lib/motion";
import { getScope, type ControlDef } from "@/lib/defaults";
import { useTokens } from "@/lib/token-context";
import { Button } from "@/components/ui/button";

function formatValue(def: ControlDef, v: string | number): string {
  if (def.type === "color") return String(v);
  return `${v}${def.unit ?? ""}`;
}

function Control({ scope, def }: { scope: string; def: ControlDef }) {
  const { values, setValue } = useTokens();
  const key = `${scope}.${def.key}`;
  const value = values[key];

  if (def.type === "color") {
    return (
      <label className="flex items-center justify-between gap-3 py-1.5">
        <span className="text-sm text-graphite">{def.label}</span>
        <span className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate">{String(value)}</span>
          <input
            type="color"
            value={String(value)}
            onChange={(e) => setValue(key, e.target.value)}
            className="size-7 cursor-pointer rounded-sm border border-rule bg-transparent p-0.5"
          />
        </span>
      </label>
    );
  }

  return (
    <div className="py-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-graphite">{def.label}</span>
        <span className="font-mono text-xs text-slate">
          {formatValue(def, value)}
        </span>
      </div>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={Number(value)}
        onChange={(e) => setValue(key, Number(e.target.value))}
        className="mt-1 w-full"
        style={{ accentColor: "var(--color-graphite)" }}
      />
    </div>
  );
}

export function ParamPanel({
  scope,
  className,
}: {
  scope: string;
  className?: string;
}) {
  const def = getScope(scope);
  const { cancelScope, resetScope, saveScope, isDirty } = useTokens();
  const [open, setOpen] = React.useState(false);

  if (!def) return null;

  return (
    <div className={className}>
      <button
        aria-label={`Edit ${def.title} parameters`}
        title={`Edit ${def.title} parameters`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "rounded-sm p-1.5 transition-colors hover:bg-surface-sunken hover:text-ink",
          isDirty(scope) ? "text-ink" : "text-slate",
        )}
      >
        <Settings2Icon className="size-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0, transition: springs.standard }}
            exit={{ opacity: 0, x: 16, transition: fadeExit }}
            className="fixed right-4 top-20 z-50 flex max-h-[75vh] w-80 flex-col rounded-md border border-rule bg-surface-elevated"
          >
            <div className="flex items-center justify-between border-b border-rule px-5 py-3">
              <p className="label-caps text-graphite">{def.title}</p>
              <button
                aria-label="Close"
                onClick={() => {
                  cancelScope(scope);
                  setOpen(false);
                }}
                className="rounded-sm p-1 text-slate transition-colors hover:bg-surface-sunken hover:text-ink"
              >
                <XIcon className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-3">
              {def.note ? (
                <p className="mb-2 text-[0.8125rem] text-slate">{def.note}</p>
              ) : null}
              {def.controls.map((c) => (
                <Control key={c.key} scope={scope} def={c} />
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-rule px-5 py-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  cancelScope(scope);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => resetScope(scope)}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    saveScope(scope);
                    setOpen(false);
                    toast("Saved.", {
                      description: `${def.title} is now your default in this browser.`,
                    });
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
