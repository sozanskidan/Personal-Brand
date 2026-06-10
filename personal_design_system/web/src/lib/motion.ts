import type { Transition } from "motion/react";

/**
 * Springs are Motion's native physics: stiffness, damping, mass.
 * Component springs are tunable live from the playground panels; the
 * factory values live in lib/defaults.ts. These constants animate the
 * playground's own chrome.
 */
export const uiSpring: Transition = {
  type: "spring",
  stiffness: 550,
  damping: 45,
  mass: 1,
};

/** Exits never spring. Quick opacity fade, ease-in. */
export const fadeExit: Transition = { duration: 0.15, ease: "easeIn" };
