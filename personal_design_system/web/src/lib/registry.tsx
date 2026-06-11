import type * as React from "react";
import {
  ButtonDemo,
  CardDemo,
  CalloutDemo,
  TableDemo,
  LinkDemo,
  DividerDemo,
  EyebrowDemo,
  ChipDemo,
  DialogDemo,
  SheetDemo,
  AccordionDemo,
  TabsDemo,
  HoverLiftDemo,
  TextRevealDemo,
  ToastDemo,
  AreaChartDemo,
  BarChartDemo,
  LineChartDemo,
  DonutChartDemo,
  SparklineDemo,
  StatCardDemo,
} from "@/components/demos";

export const CATEGORIES = [
  "Actions",
  "Navigation",
  "Overlays",
  "Feedback",
  "Data",
  "Motion",
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface RegistryEntry {
  slug: string;
  name: string;
  category: Category;
  /** Drives the accent chip: dynamic pieces move on spring physics. */
  kind: "static" | "dynamic";
  /** Param panel scope; defaults to the slug. Charts share one scope. */
  paramScope?: string;
  description: string;
  notes: string[];
  Demo: React.ComponentType;
}

export const registry: RegistryEntry[] = [
  // ── Actions ────────────────────────────────────────────────
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    kind: "static",
    description: "Ink fill for primary, accent at most once per view.",
    notes: [
      "Primary is ink on surface; accent is the grey-blue, used once per view.",
      "4px corners, regular weight, press feedback is a scale to 0.98.",
    ],
    Demo: ButtonDemo,
  },
  {
    slug: "link",
    name: "Link",
    category: "Actions",
    kind: "static",
    description: "Accent text, underline only on hover.",
    notes: [
      "Often the single accent moment on a page.",
      "Darkens toward ink on hover for contrast.",
    ],
    Demo: LinkDemo,
  },

  // ── Navigation ─────────────────────────────────────────────
  {
    slug: "tabs",
    name: "Animated Tabs",
    category: "Navigation",
    kind: "dynamic",
    description: "A 1px ink underline glides between tabs.",
    notes: [
      "Shared-layout underline gliding on the smooth spring.",
      "The indicator is a hairline, not a filled pill.",
    ],
    Demo: TabsDemo,
  },

  // ── Overlays ───────────────────────────────────────────────
  {
    slug: "dialog",
    name: "Dialog",
    category: "Overlays",
    kind: "dynamic",
    description: "Scales in on spring physics, exits on a fast fade.",
    notes: [
      "Enter: scale 0.96 to 1 plus fade on the smooth spring.",
      "Exit: 150ms opacity fade. Exits never spring.",
      "Overlay is ink at 20%. No blur.",
    ],
    Demo: DialogDemo,
  },
  {
    slug: "sheet",
    name: "Sheet",
    category: "Overlays",
    kind: "dynamic",
    description: "A side panel that slides in on spring physics.",
    notes: [
      "Slides from the right, settles on the smooth spring.",
      "Border-left hairline separates it from the page.",
    ],
    Demo: SheetDemo,
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Overlays",
    kind: "dynamic",
    description: "Quiet confirmation, off to the side.",
    notes: [
      "surface-elevated, hairline border, no shadow.",
      "Light theme only, like everything else.",
    ],
    Demo: ToastDemo,
  },

  // ── Feedback ───────────────────────────────────────────────
  {
    slug: "callout",
    name: "Callout",
    category: "Feedback",
    kind: "static",
    description: "The accent-muted block for the one key insight per document.",
    notes: [
      "accent-muted fill, ink text, optional Roboto Mono label.",
      "One per document or slide. It marks the most important thing.",
    ],
    Demo: CalloutDemo,
  },

  // ── Data ───────────────────────────────────────────────────
  {
    slug: "card",
    name: "Card",
    category: "Data",
    kind: "static",
    description: "Elevated surface with a hairline. Never more than three stacked.",
    notes: [
      "surface-elevated background, 1px rule border, 8px corners.",
      "Static cards stay tonal; shadows belong to interactive lift.",
    ],
    Demo: CardDemo,
  },
  {
    slug: "table",
    name: "Table",
    category: "Data",
    kind: "static",
    description: "Sunken header, hairline grid, numbers right-aligned.",
    notes: [
      "Header row in surface-sunken with label-caps type.",
      "No banded rows. Numbers right-aligned, always.",
    ],
    Demo: TableDemo,
  },
  {
    slug: "chip",
    name: "Chip",
    category: "Data",
    kind: "static",
    description: "Small status labels for data views.",
    notes: [
      "4px corners. Sunken, accent-muted, or outline fills.",
      "Pills are reserved for inline status inside data views only.",
    ],
    Demo: ChipDemo,
  },
  {
    slug: "divider",
    name: "Divider",
    category: "Data",
    kind: "static",
    description: "A 1px rule. It replaces most visual decoration.",
    notes: ["Full-width or content-width. Never thicker than 1px."],
    Demo: DividerDemo,
  },
  {
    slug: "eyebrow",
    name: "Eyebrow",
    category: "Data",
    kind: "static",
    description: "Roboto Mono caps that introduce a section.",
    notes: [
      "0.75rem, uppercase, 0.08em tracking, slate color.",
      "The only place all-caps is allowed.",
    ],
    Demo: EyebrowDemo,
  },
  {
    slug: "stat-card",
    name: "Stat Card",
    category: "Data",
    kind: "static",
    paramScope: "charts",
    description: "KPI: eyebrow, serif tabular number, delta chip, sparkline.",
    notes: [
      "The delta chip is the card's accent moment — accent variant only on the number the view exists for.",
      "Numbers are tabular and serif. The sparkline is optional.",
    ],
    Demo: StatCardDemo,
  },
  {
    slug: "area-chart",
    name: "Area Chart",
    category: "Data",
    kind: "dynamic",
    paramScope: "charts",
    description: "One series, accent-muted fill, hairline grid.",
    notes: [
      "Recharts via the shadcn chart layer, themed by the --chart-* tokens.",
      "Horizontal hairline grid only. Axis ticks in Roboto Mono slate.",
      "Tooltips ride on surface-elevated with a 1px rule.",
    ],
    Demo: AreaChartDemo,
  },
  {
    slug: "bar-chart",
    name: "Bar Chart",
    category: "Data",
    kind: "dynamic",
    paramScope: "charts",
    description: "Ink bars with the accent reserved for the comparison series.",
    notes: [
      "2px bar corners, max 28px wide. No banded backgrounds.",
      "Series 1 is ink; the accent series is the one that matters.",
    ],
    Demo: BarChartDemo,
  },
  {
    slug: "line-chart",
    name: "Line Chart",
    category: "Data",
    kind: "dynamic",
    paramScope: "charts",
    description: "Thin natural curves, no dots, grayscale plus one accent.",
    notes: [
      "Stroke width is a chart token (default 1.5px).",
      "No dots at rest; the tooltip carries the detail.",
    ],
    Demo: LineChartDemo,
  },
  {
    slug: "donut-chart",
    name: "Donut Chart",
    category: "Data",
    kind: "dynamic",
    paramScope: "charts",
    description: "A thin ring, never a full pie.",
    notes: [
      "Grayscale segments with one accent. 2° padding between segments.",
      "No labels on the ring; the tooltip does the naming.",
    ],
    Demo: DonutChartDemo,
  },
  {
    slug: "sparkline",
    name: "Sparkline",
    category: "Data",
    kind: "dynamic",
    paramScope: "charts",
    description: "A bare trend line for stat cards and table cells.",
    notes: [
      "No axes, no grid, no dots. Ink by default, accent when it is the moment.",
    ],
    Demo: SparklineDemo,
  },

  // ── Motion ─────────────────────────────────────────────────
  {
    slug: "accordion",
    name: "Accordion",
    category: "Motion",
    kind: "dynamic",
    description: "Hairline rows, rotating chevron, quiet height animation.",
    notes: [
      "Chevron rotates 180° in 200ms ease-out.",
      "Markers and icons recede; text carries the weight.",
    ],
    Demo: AccordionDemo,
  },
  {
    slug: "hover-lift-card",
    name: "Hover-lift Card",
    category: "Motion",
    kind: "dynamic",
    description: "White card, soft shadow that deepens on hover with a slight scale.",
    notes: [
      "whileHover: scale 1.02, shadow deepens. No borders, 16px corners.",
      "Snappy spring — stiff and damped, no overshoot on micro-interactions.",
    ],
    Demo: HoverLiftDemo,
  },
  {
    slug: "text-reveal",
    name: "Text Reveal",
    category: "Motion",
    kind: "dynamic",
    description: "Per-word serif reveal for the headline that matters.",
    notes: [
      "Words stagger 50ms apart on the smooth spring.",
      "One per view. Spend the bouncy spring here if anywhere.",
    ],
    Demo: TextRevealDemo,
  },
];

export function getEntry(slug: string) {
  return registry.find((entry) => entry.slug === slug);
}
