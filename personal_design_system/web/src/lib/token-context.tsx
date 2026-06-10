"use client";

import * as React from "react";
import type { Transition } from "motion/react";
import { SCOPES, FACTORY, type ControlDef } from "@/lib/defaults";

type Values = Record<string, string | number>;

const STORAGE_KEY = "pds-overrides-v1";

const CONTROL_INDEX: Record<string, ControlDef> = {};
for (const s of SCOPES) {
  for (const c of s.controls) {
    CONTROL_INDEX[`${s.scope}.${c.key}`] = c;
  }
}

interface TokenContextValue {
  values: Values;
  saved: Values;
  setValue: (key: string, value: string | number) => void;
  cancelScope: (scope: string) => void;
  resetScope: (scope: string) => void;
  saveScope: (scope: string) => void;
  isDirty: (scope: string) => boolean;
}

const TokenContext = React.createContext<TokenContextValue>({
  values: FACTORY,
  saved: FACTORY,
  setValue: () => {},
  cancelScope: () => {},
  resetScope: () => {},
  saveScope: () => {},
  isDirty: () => false,
});

function scopeKeys(scope: string): string[] {
  const prefix = `${scope}.`;
  return Object.keys(FACTORY).filter((k) => k.startsWith(prefix));
}

function pick(source: Values, scope: string): Values {
  const out: Values = {};
  for (const k of scopeKeys(scope)) out[k] = source[k];
  return out;
}

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = React.useState<Values>(FACTORY);
  const [values, setValues] = React.useState<Values>(FACTORY);

  // Load persisted overrides once, client-side. localStorage is an
  // external store that only exists after mount, so a one-time setState
  // in an effect is the correct sync point here.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const overrides = JSON.parse(raw) as Values;
        const merged = { ...FACTORY, ...overrides };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSaved(merged);
        setValues(merged);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Mirror values into CSS variables. Only values that differ from the
  // factory are written, so untouched tokens keep following their
  // var() chains (e.g. button fill follows ink until edited).
  React.useEffect(() => {
    const root = document.documentElement;
    for (const [key, def] of Object.entries(CONTROL_INDEX)) {
      if (!def.cssVar) continue;
      const v = values[key];
      if (v === FACTORY[key]) {
        root.style.removeProperty(def.cssVar);
      } else {
        const cssValue =
          typeof v === "number" && def.unit ? `${v}${def.unit}` : String(v);
        root.style.setProperty(def.cssVar, cssValue);
      }
    }
  }, [values]);

  const persist = React.useCallback((next: Values) => {
    const diff: Values = {};
    for (const k of Object.keys(next)) {
      if (next[k] !== FACTORY[k]) diff[k] = next[k];
    }
    try {
      if (Object.keys(diff).length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(diff));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // storage unavailable; edits stay session-only
    }
  }, []);

  const api = React.useMemo<TokenContextValue>(
    () => ({
      values,
      saved,
      setValue: (key, value) => setValues((v) => ({ ...v, [key]: value })),
      cancelScope: (scope) =>
        setValues((v) => ({ ...v, ...pick(saved, scope) })),
      resetScope: (scope) =>
        setValues((v) => ({ ...v, ...pick(FACTORY, scope) })),
      saveScope: (scope) => {
        setSaved((prev) => {
          const next = { ...prev, ...pick(values, scope) };
          persist(next);
          return next;
        });
      },
      isDirty: (scope) =>
        scopeKeys(scope).some((k) => values[k] !== saved[k]),
    }),
    [values, saved, persist],
  );

  return <TokenContext.Provider value={api}>{children}</TokenContext.Provider>;
}

export function useTokens() {
  return React.useContext(TokenContext);
}

export function useTokenNumber(key: string): number {
  const { values } = useTokens();
  return Number(values[key]);
}

/** Spring transition from a scope's visualDuration/bounce controls. */
export function useSpringToken(prefix: string): Transition {
  const { values } = useTokens();
  return {
    type: "spring",
    visualDuration: Number(values[`${prefix}.visualDuration`]),
    bounce: Number(values[`${prefix}.bounce`]),
  };
}

/** The global exit fade, editable from the Motion panel. */
export function useExitFade(): Transition {
  const { values } = useTokens();
  return { duration: Number(values["springs.exit.duration"]), ease: "easeIn" };
}
