/**
 * The playground's source of truth. Every tweakable parameter is declared
 * here with its factory default (mirroring DESIGN.md). "Reset" in a panel
 * returns to these values; "Save" persists overrides to localStorage.
 *
 * Springs use Motion's native physics parameters: stiffness, damping, mass.
 */

export type ControlDef = {
  key: string;
  label: string;
  type: "color" | "range";
  def: string | number;
  min?: number;
  max?: number;
  step?: number;
  /** Appended when mirrored into the CSS variable and shown in the readout. */
  unit?: string;
  /** When set, the provider mirrors the value into this CSS variable. */
  cssVar?: string;
};

export type ScopeDef = {
  scope: string;
  title: string;
  note?: string;
  controls: ControlDef[];
};

const springControls = (stiffness: number, damping: number): ControlDef[] => [
  { key: "stiffness", label: "Stiffness", type: "range", def: stiffness, min: 20, max: 1000, step: 5 },
  { key: "damping", label: "Damping", type: "range", def: damping, min: 1, max: 80, step: 1 },
  { key: "mass", label: "Mass", type: "range", def: 1, min: 0.25, max: 3, step: 0.05 },
];

export const SCOPES: ScopeDef[] = [
  {
    scope: "colors",
    title: "Colors",
    note: "Global palette. Everything on the site reads these.",
    controls: [
      { key: "ink", label: "Ink", type: "color", def: "#0a0a0a", cssVar: "--color-ink" },
      { key: "graphite", label: "Graphite", type: "color", def: "#3d3d3d", cssVar: "--color-graphite" },
      { key: "slate", label: "Slate", type: "color", def: "#6b6b6b", cssVar: "--color-slate" },
      { key: "rule", label: "Rule", type: "color", def: "#e5e5e5", cssVar: "--color-rule" },
      { key: "surface", label: "Surface", type: "color", def: "#fafaf7", cssVar: "--color-surface" },
      { key: "surface-elevated", label: "Surface elevated", type: "color", def: "#ffffff", cssVar: "--color-surface-elevated" },
      { key: "surface-sunken", label: "Surface sunken", type: "color", def: "#f2f1ed", cssVar: "--color-surface-sunken" },
      { key: "accent", label: "Accent", type: "color", def: "#9bb0c9", cssVar: "--color-accent" },
      { key: "accent-muted", label: "Accent muted", type: "color", def: "#e8eef4", cssVar: "--color-accent-muted" },
      { key: "on-accent", label: "On accent", type: "color", def: "#0a0a0a", cssVar: "--color-on-accent" },
    ],
  },
  {
    scope: "spring",
    title: "Motion presets",
    note: "Motion's native spring physics. These three presets appear as chips in every motion panel; tune them here and the chips follow.",
    controls: [
      { key: "snappy.stiffness", label: "Snappy · stiffness", type: "range", def: 700, min: 20, max: 1000, step: 5 },
      { key: "snappy.damping", label: "Snappy · damping", type: "range", def: 50, min: 1, max: 80, step: 1 },
      { key: "snappy.mass", label: "Snappy · mass", type: "range", def: 1, min: 0.25, max: 3, step: 0.05 },
      { key: "smooth.stiffness", label: "Smooth · stiffness", type: "range", def: 300, min: 20, max: 1000, step: 5 },
      { key: "smooth.damping", label: "Smooth · damping", type: "range", def: 28, min: 1, max: 80, step: 1 },
      { key: "smooth.mass", label: "Smooth · mass", type: "range", def: 1, min: 0.25, max: 3, step: 0.05 },
      { key: "bouncy.stiffness", label: "Bouncy · stiffness", type: "range", def: 170, min: 20, max: 1000, step: 5 },
      { key: "bouncy.damping", label: "Bouncy · damping", type: "range", def: 14, min: 1, max: 80, step: 1 },
      { key: "bouncy.mass", label: "Bouncy · mass", type: "range", def: 1, min: 0.25, max: 3, step: 0.05 },
      { key: "exitDuration", label: "Exit fade", type: "range", def: 0.15, min: 0.05, max: 0.4, step: 0.01, unit: "s" },
    ],
  },
  {
    scope: "radii",
    title: "Corner radii",
    note: "Gentle, never round.",
    controls: [
      { key: "sm", label: "sm · chips, buttons", type: "range", def: 4, min: 0, max: 12, step: 1, unit: "px", cssVar: "--radius-sm" },
      { key: "md", label: "md · cards, dialogs", type: "range", def: 8, min: 0, max: 24, step: 1, unit: "px", cssVar: "--radius-md" },
      { key: "lg", label: "lg · large containers", type: "range", def: 16, min: 0, max: 32, step: 1, unit: "px", cssVar: "--radius-lg" },
      { key: "xl", label: "xl · hero features", type: "range", def: 24, min: 0, max: 48, step: 1, unit: "px", cssVar: "--radius-xl" },
    ],
  },
  {
    scope: "button",
    title: "Button",
    controls: [
      { key: "radius", label: "Corner radius", type: "range", def: 4, min: 0, max: 24, step: 1, unit: "px", cssVar: "--btn-radius" },
      { key: "fontSize", label: "Text size", type: "range", def: 14, min: 11, max: 18, step: 0.5, unit: "px", cssVar: "--btn-font-size" },
      { key: "paddingX", label: "Padding · horizontal", type: "range", def: 12, min: 4, max: 40, step: 1, unit: "px", cssVar: "--btn-px" },
      { key: "paddingY", label: "Padding · vertical", type: "range", def: 8, min: 2, max: 24, step: 1, unit: "px", cssVar: "--btn-py" },
      { key: "primaryBg", label: "Primary fill", type: "color", def: "#0a0a0a", cssVar: "--btn-primary-bg" },
      { key: "primaryText", label: "Primary text", type: "color", def: "#fafaf7", cssVar: "--btn-primary-text" },
      { key: "accentBg", label: "Accent fill", type: "color", def: "#9bb0c9", cssVar: "--btn-accent-bg" },
      { key: "accentText", label: "Accent text", type: "color", def: "#0a0a0a", cssVar: "--btn-accent-text" },
      { key: "hoverScale", label: "Hover scale", type: "range", def: 1, min: 1, max: 1.15, step: 0.005 },
      { key: "pressScale", label: "Press scale", type: "range", def: 0.98, min: 0.8, max: 1, step: 0.005 },
      ...springControls(700, 50),
    ],
  },
  {
    scope: "card",
    title: "Card",
    controls: [
      { key: "radius", label: "Corner radius", type: "range", def: 8, min: 0, max: 24, step: 1, unit: "px", cssVar: "--card-radius" },
    ],
  },
  {
    scope: "callout",
    title: "Callout",
    controls: [
      { key: "bg", label: "Fill", type: "color", def: "#e8eef4", cssVar: "--callout-bg" },
      { key: "radius", label: "Corner radius", type: "range", def: 8, min: 0, max: 24, step: 1, unit: "px", cssVar: "--callout-radius" },
    ],
  },
  {
    scope: "table",
    title: "Table",
    controls: [
      { key: "headerBg", label: "Header fill", type: "color", def: "#f2f1ed", cssVar: "--table-header-bg" },
      { key: "fontSize", label: "Cell text size", type: "range", def: 14, min: 11, max: 16, step: 0.5, unit: "px", cssVar: "--table-font-size" },
    ],
  },
  {
    scope: "link",
    title: "Link",
    controls: [
      { key: "color", label: "Color", type: "color", def: "#9bb0c9", cssVar: "--link-color" },
      { key: "underlineOffset", label: "Underline offset", type: "range", def: 4, min: 1, max: 10, step: 1, unit: "px", cssVar: "--link-underline-offset" },
    ],
  },
  {
    scope: "divider",
    title: "Divider",
    controls: [
      { key: "color", label: "Color", type: "color", def: "#e5e5e5", cssVar: "--divider-color" },
      { key: "thickness", label: "Thickness", type: "range", def: 1, min: 1, max: 3, step: 1, unit: "px", cssVar: "--divider-thickness" },
    ],
  },
  {
    scope: "eyebrow",
    title: "Eyebrow",
    note: "Edits the label-caps type token everywhere it appears.",
    controls: [
      { key: "fontSize", label: "Text size", type: "range", def: 12, min: 9, max: 16, step: 0.5, unit: "px", cssVar: "--label-caps-size" },
      { key: "tracking", label: "Tracking", type: "range", def: 0.08, min: 0, max: 0.2, step: 0.01, unit: "em", cssVar: "--label-caps-tracking" },
    ],
  },
  {
    scope: "chip",
    title: "Chip",
    controls: [
      { key: "radius", label: "Corner radius", type: "range", def: 4, min: 0, max: 16, step: 1, unit: "px", cssVar: "--chip-radius" },
    ],
  },
  {
    scope: "dialog",
    title: "Dialog",
    controls: [
      ...springControls(300, 28),
      { key: "initialScale", label: "Enter from scale", type: "range", def: 0.96, min: 0.8, max: 1, step: 0.01 },
      { key: "overlayOpacity", label: "Overlay opacity", type: "range", def: 20, min: 0, max: 60, step: 1, unit: "%" },
      { key: "radius", label: "Corner radius", type: "range", def: 8, min: 0, max: 24, step: 1, unit: "px", cssVar: "--dialog-radius" },
    ],
  },
  {
    scope: "sheet",
    title: "Sheet",
    controls: [
      ...springControls(300, 28),
      { key: "width", label: "Panel width", type: "range", def: 384, min: 280, max: 520, step: 8, unit: "px" },
    ],
  },
  {
    scope: "accordion",
    title: "Accordion",
    controls: [
      { key: "chevronMs", label: "Chevron rotation", type: "range", def: 200, min: 80, max: 500, step: 10, unit: "ms", cssVar: "--accordion-chevron-ms" },
    ],
  },
  {
    scope: "tabs",
    title: "Animated Tabs",
    controls: [
      ...springControls(300, 28),
      { key: "thickness", label: "Indicator thickness", type: "range", def: 1, min: 1, max: 4, step: 1, unit: "px" },
    ],
  },
  {
    scope: "hover-lift-card",
    title: "Hover-lift Card",
    controls: [
      { key: "hoverScale", label: "Hover scale", type: "range", def: 1.02, min: 1, max: 1.15, step: 0.005 },
      { key: "tapScale", label: "Press scale", type: "range", def: 0.99, min: 0.8, max: 1, step: 0.005 },
      { key: "radius", label: "Corner radius", type: "range", def: 16, min: 0, max: 32, step: 1, unit: "px", cssVar: "--lift-radius" },
      { key: "hoverBg", label: "Hover fill", type: "color", def: "#ffffff" },
      ...springControls(700, 50),
    ],
  },
  {
    scope: "text-reveal",
    title: "Text Reveal",
    controls: [
      { key: "staggerMs", label: "Word stagger", type: "range", def: 50, min: 0, max: 150, step: 5, unit: "ms" },
      { key: "riseEm", label: "Rise distance", type: "range", def: 0.4, min: 0, max: 0.8, step: 0.05, unit: "em" },
      ...springControls(300, 28),
    ],
  },
  {
    scope: "toast",
    title: "Toast",
    controls: [
      { key: "radius", label: "Corner radius", type: "range", def: 8, min: 0, max: 24, step: 1, unit: "px", cssVar: "--toast-radius" },
    ],
  },
];

/** Flat `${scope}.${key}` -> factory default. */
export const FACTORY: Record<string, string | number> = {};
for (const s of SCOPES) {
  for (const c of s.controls) {
    FACTORY[`${s.scope}.${c.key}`] = c.def;
  }
}

export function getScope(scope: string): ScopeDef | undefined {
  return SCOPES.find((s) => s.scope === scope);
}
