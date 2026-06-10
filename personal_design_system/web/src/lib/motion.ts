import type { Transition } from "motion/react";

/**
 * Spring tokens (second-order dynamics).
 * quiet    — micro-interactions: hovers, presses, chevrons. No overshoot.
 * standard — the default: entrances, layout shifts, shared-layout glides.
 * playful  — one hero moment per view, max. Bounce is capped at 0.15.
 */
export const springs = {
  quiet: { type: "spring", visualDuration: 0.18, bounce: 0 },
  standard: { type: "spring", visualDuration: 0.3, bounce: 0.1 },
  playful: { type: "spring", visualDuration: 0.45, bounce: 0.15 },
} as const satisfies Record<string, Transition>;

/** Exits never spring. Quick opacity fade, ease-in. */
export const fadeExit: Transition = { duration: 0.15, ease: "easeIn" };
