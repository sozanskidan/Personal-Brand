"use client";

import { useTokens } from "@/lib/token-context";

const USAGE: Record<string, string> = {
  sm: "Buttons, chips",
  md: "Cards, callouts, dialogs",
  lg: "Large containers",
  xl: "Hero features",
};

export function RadiiGrid() {
  const { values } = useTokens();
  const names = ["sm", "md", "lg", "xl"] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {names.map((name) => {
        const px = Number(values[`radii.${name}`]);
        return (
          <div key={name} className="text-center">
            <div
              className="mx-auto size-20 border border-graphite bg-surface-elevated"
              style={{ borderRadius: px }}
            />
            <p className="mt-3 font-mono text-xs text-slate">
              {name} · {px}px
            </p>
            <p className="text-[0.8125rem] text-slate">{USAGE[name]}</p>
          </div>
        );
      })}
    </div>
  );
}
