"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Settings2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { uiSpring, fadeExit } from "@/lib/motion";
import { getScope, type ControlDef } from "@/lib/defaults";
import { useTokens } from "@/lib/token-context";
import { Button } from "@/components/ui/button";

// 6-digit #rrggbb, or 8-digit #rrggbbaa when an alpha is set.
const HEX_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;

function splitHex(v: string): { rgb: string; alphaPct: number } {
  const m = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/.exec(v);
  if (!m) return { rgb: "#000000", alphaPct: 100 };
  const alphaPct = m[2]
    ? Math.round((parseInt(m[2], 16) / 255) * 100)
    : 100;
  return { rgb: `#${m[1]}`.toLowerCase(), alphaPct };
}

function joinHex(rgb: string, alphaPct: number): string {
  if (alphaPct >= 100) return rgb.toLowerCase();
  const a = Math.round((Math.max(0, alphaPct) / 100) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${rgb}${a}`.toLowerCase();
}

function clamp(v: number, min?: number, max?: number): number {
  if (min !== undefined && v < min) return min;
  if (max !== undefined && v > max) return max;
  return v;
}

/** Number field with a local buffer so partial input ("0.", "-") types cleanly. */
function NumberField({
  value,
  min,
  max,
  step,
  onCommit,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onCommit: (v: number) => void;
}) {
  const [text, setText] = React.useState(String(value));
  const [lastValue, setLastValue] = React.useState(value);
  const [focused, setFocused] = React.useState(false);
  if (!focused && value !== lastValue) {
    setLastValue(value);
    setText(String(value));
  }

  const commit = (raw: string) => {
    const n = Number(raw);
    if (Number.isFinite(n)) {
      const clamped = clamp(n, min, max);
      onCommit(clamped);
      setText(String(clamped));
    } else {
      setText(String(value));
    }
  };

  return (
    <input
      type="number"
      inputMode="decimal"
      min={min}
      max={max}
      step={step}
      value={text}
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        setText(e.target.value);
        const n = Number(e.target.value);
        if (e.target.value !== "" && Number.isFinite(n)) {
          onCommit(clamp(n, min, max));
        }
      }}
      onBlur={(e) => {
        setFocused(false);
        commit(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
      }}
      className="w-18 rounded-sm border border-rule bg-transparent px-1.5 py-0.5 text-right font-mono text-xs text-ink outline-none focus:border-graphite [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}

/** Hex field with a local buffer; commits only valid #rrggbb. */
function HexField({
  value,
  onCommit,
}: {
  value: string;
  onCommit: (v: string) => void;
}) {
  const [text, setText] = React.useState(value);
  const [lastValue, setLastValue] = React.useState(value);
  const [focused, setFocused] = React.useState(false);
  if (!focused && value !== lastValue) {
    setLastValue(value);
    setText(value);
  }

  return (
    <input
      type="text"
      spellCheck={false}
      value={text}
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        setText(e.target.value);
        if (HEX_RE.test(e.target.value)) onCommit(e.target.value.toLowerCase());
      }}
      onBlur={(e) => {
        setFocused(false);
        if (!HEX_RE.test(e.target.value)) setText(value);
      }}
      className="w-20 rounded-sm border border-rule bg-transparent px-1.5 py-0.5 font-mono text-xs text-ink outline-none focus:border-graphite"
    />
  );
}

function Control({ scope, def }: { scope: string; def: ControlDef }) {
  const { values, setValue } = useTokens();
  const key = `${scope}.${def.key}`;
  const value = values[key];

  if (def.type === "color") {
    const { rgb, alphaPct } = splitHex(String(value));
    return (
      <div className="py-1.5">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm text-graphite">{def.label}</span>
          <span className="flex items-center gap-2">
            <HexField value={String(value)} onCommit={(v) => setValue(key, v)} />
            <input
              type="color"
              value={rgb}
              onChange={(e) => setValue(key, joinHex(e.target.value, alphaPct))}
              className="size-7 cursor-pointer rounded-sm border border-rule bg-transparent p-0.5"
            />
          </span>
        </label>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate">
            A
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={alphaPct}
            onChange={(e) => setValue(key, joinHex(rgb, Number(e.target.value)))}
            className="w-full"
            style={{ accentColor: "var(--color-graphite)" }}
          />
          <span className="w-9 text-right font-mono text-xs text-slate">
            {alphaPct}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-graphite">{def.label}</span>
        <span className="flex items-center gap-1">
          <NumberField
            value={Number(value)}
            min={def.min}
            max={def.max}
            step={def.step}
            onCommit={(v) => setValue(key, v)}
          />
          {def.unit ? (
            <span className="font-mono text-xs text-slate">{def.unit}</span>
          ) : null}
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

const SPRING_PRESETS = ["snappy", "smooth", "bouncy"] as const;
const SPRING_KEYS = ["stiffness", "damping", "mass"] as const;

/**
 * Some scopes carry a companion scope in the same panel — the select's
 * menu motion travels with the shared field styling it sits on.
 */
const SCOPE_SECTIONS: Record<string, string[]> = {
  select: ["select", "forms"],
};

/**
 * The motion block of a panel: preset chips first, physics second.
 * Clicking a preset applies its current values (as tuned on the
 * Foundations page) to this scope and keeps the sliders tucked away;
 * the stiffness/damping/mass sliders only unfold on Custom.
 */
function SpringSection({
  scope,
  controls,
}: {
  scope: string;
  controls: ControlDef[];
}) {
  const { values, setValue } = useTokens();

  const matched = SPRING_PRESETS.find((p) =>
    SPRING_KEYS.every(
      (k) => Number(values[`${scope}.${k}`]) === Number(values[`spring.${p}.${k}`]),
    ),
  );
  // "Custom" stays selected once chosen, even if the numbers happen to
  // land back on a preset; only clicking a preset chip collapses it.
  const [forceCustom, setForceCustom] = React.useState(matched === undefined);
  const isCustom = forceCustom || matched === undefined;

  const apply = (p: (typeof SPRING_PRESETS)[number]) => {
    for (const k of SPRING_KEYS) {
      setValue(`${scope}.${k}`, Number(values[`spring.${p}.${k}`]));
    }
    setForceCustom(false);
  };

  const chip = (label: string, isActive: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className={cn(
        "label-caps rounded-(--chip-radius) px-2 py-1 transition-colors",
        isActive
          ? "bg-ink text-surface"
          : "bg-surface-sunken text-graphite hover:text-ink",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="border-b border-rule pb-3">
      <div className="flex flex-wrap gap-1.5 pt-1.5">
        {SPRING_PRESETS.map((p) => chip(p, !isCustom && matched === p, () => apply(p)))}
        {chip("custom", isCustom, () => setForceCustom(true))}
      </div>
      <AnimatePresence initial={false}>
        {isCustom && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: uiSpring }}
            exit={{ height: 0, opacity: 0, transition: fadeExit }}
            className="overflow-hidden"
          >
            <div className="pt-1.5">
              {controls.map((c) => (
                <Control key={c.key} scope={scope} def={c} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** One scope's slice of the panel: note, motion block, then the rest. */
function ScopeSection({ scope }: { scope: string }) {
  const def = getScope(scope);
  if (!def) return null;

  const hasSpring =
    scope !== "spring" && def.controls.some((c) => c.key === "stiffness");
  const springControls = hasSpring
    ? def.controls.filter((c) => SPRING_KEYS.includes(c.key as never))
    : [];
  const otherControls = hasSpring
    ? def.controls.filter((c) => !SPRING_KEYS.includes(c.key as never))
    : def.controls;

  return (
    <>
      {def.note ? (
        <p className="mb-2 text-[0.8125rem] text-slate">{def.note}</p>
      ) : null}
      {hasSpring ? <SpringSection scope={scope} controls={springControls} /> : null}
      {otherControls.map((c) => (
        <Control key={c.key} scope={scope} def={c} />
      ))}
    </>
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

  const scopes = SCOPE_SECTIONS[scope] ?? [scope];

  return (
    <div className={className}>
      <button
        aria-label={`Edit ${def.title} parameters`}
        title={`Edit ${def.title} parameters`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "rounded-sm p-1.5 transition-colors hover:bg-surface-sunken hover:text-ink",
          scopes.some((s) => isDirty(s)) ? "text-ink" : "text-slate",
        )}
      >
        <Settings2Icon className="size-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0, transition: uiSpring }}
            exit={{ opacity: 0, x: 16, transition: fadeExit }}
            className="fixed right-4 top-20 z-50 flex max-h-[75vh] w-80 flex-col rounded-md border border-rule bg-surface-elevated"
          >
            <div className="flex items-center justify-between border-b border-rule px-5 py-3">
              <p className="label-caps text-graphite">{def.title}</p>
              <button
                aria-label="Close"
                onClick={() => {
                  scopes.forEach(cancelScope);
                  setOpen(false);
                }}
                className="rounded-sm p-1 text-slate transition-colors hover:bg-surface-sunken hover:text-ink"
              >
                <XIcon className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-3">
              {scopes.map((s, i) => (
                <React.Fragment key={s}>
                  {i > 0 ? (
                    <div className="mt-4 border-t border-rule pt-3">
                      <p className="label-caps mb-2 text-graphite">
                        {getScope(s)?.title}
                      </p>
                    </div>
                  ) : null}
                  <ScopeSection scope={s} />
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-rule px-5 py-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  scopes.forEach(cancelScope);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scopes.forEach(resetScope)}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    scopes.forEach(saveScope);
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
