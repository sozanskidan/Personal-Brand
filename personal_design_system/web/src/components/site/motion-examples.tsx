"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTokens, useSpringToken, useExitFade } from "@/lib/token-context";

const PRESETS = ["snappy", "smooth", "bouncy"] as const;
type Preset = (typeof PRESETS)[number];

function Stage({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-(--lift-radius) bg-surface-elevated p-4 shadow-sm">
      <div className="relative h-44 overflow-hidden rounded-md bg-surface-sunken/50">
        {children}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <p className="font-mono text-xs text-ink">{label}</p>
        {hint ? <p className="font-mono text-xs text-slate">{hint}</p> : null}
      </div>
    </div>
  );
}

export function MotionExamples() {
  const { values } = useTokens();
  const [preset, setPreset] = React.useState<Preset>("smooth");
  const spring = useSpringToken(`spring.${preset}`);
  const exit = useExitFade();
  const stiffness = Number(values[`spring.${preset}.stiffness`]);
  const damping = Number(values[`spring.${preset}.damping`]);

  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1700);
    return () => clearInterval(id);
  }, []);
  const phase = tick % 2 === 0;

  const scrollItems = [
    "Lead with the TL;DR",
    "One accent per view",
    "Whitespace is the brand",
    "Right-align numbers",
  ];
  const order = phase ? [0, 1, 2] : [2, 0, 1];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setPreset(p)}
            className={cn(
              "label-caps rounded-(--chip-radius) px-2.5 py-1.5 transition-colors",
              preset === p
                ? "bg-ink text-surface"
                : "bg-surface-sunken text-graphite hover:text-ink",
            )}
          >
            {p}
          </button>
        ))}
        <span className="ml-2 self-center font-mono text-xs text-slate">
          stiffness {stiffness} · damping {damping}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stage label="Slide" hint="position">
          <div className="absolute inset-x-4 top-1/2 h-10 -translate-y-1/2 rounded-sm border border-rule bg-surface-elevated">
            <motion.div
              className="absolute top-1 size-8 rounded-sm bg-ink"
              initial={false}
              animate={{ left: phase ? "calc(100% - 36px)" : "4px" }}
              transition={spring}
            />
          </div>
        </Stage>

        <Stage label="Expand" hint="card to page">
          <motion.div
            layout
            transition={spring}
            className={cn(
              "absolute rounded-md bg-ink",
              phase ? "inset-3" : "left-3 top-3 h-12 w-20",
            )}
          />
        </Stage>

        <Stage label="Scroll" hint="snap to row">
          <motion.div
            className="absolute inset-x-4 top-4"
            initial={false}
            animate={{ y: -(tick % scrollItems.length) * 44 }}
            transition={spring}
          >
            {scrollItems.concat(scrollItems).map((item, i) => (
              <div
                key={i}
                className="mb-2 flex h-9 items-center rounded-sm bg-surface-elevated px-3 text-xs text-graphite"
              >
                {item}
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface-sunken/80 to-transparent" />
        </Stage>

        <Stage label="Pop" hint="enter and exit">
          <div className="flex h-full items-center justify-center">
            <AnimatePresence>
              {phase && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: spring }}
                  exit={{ scale: 0.9, opacity: 0, transition: exit }}
                  className="size-16 rounded-md bg-ink"
                />
              )}
            </AnimatePresence>
          </div>
        </Stage>

        <Stage label="Reorder" hint="shared layout">
          <div className="flex h-full flex-col justify-center gap-2 px-4">
            {order.map((n) => (
              <motion.div
                key={n}
                layout
                transition={spring}
                className={cn(
                  "flex h-9 items-center rounded-sm px-3 text-xs",
                  n === 0
                    ? "bg-ink text-surface"
                    : "bg-surface-elevated text-graphite",
                )}
              >
                {["First", "Second", "Third"][n]}
              </motion.div>
            ))}
          </div>
        </Stage>

        <Stage label="Drag" hint="release to snap back">
          <div className="flex h-full items-center justify-center">
            <motion.div
              drag
              dragSnapToOrigin
              dragTransition={{
                bounceStiffness: stiffness,
                bounceDamping: damping,
              }}
              whileDrag={{ scale: 1.06 }}
              className="flex size-16 cursor-grab items-center justify-center rounded-md bg-ink active:cursor-grabbing"
            >
              <span className="font-mono text-[10px] text-surface">drag</span>
            </motion.div>
          </div>
        </Stage>
      </div>
    </div>
  );
}
