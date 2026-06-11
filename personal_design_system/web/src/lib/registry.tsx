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
} from "@/components/demos";

export interface RegistryEntry {
  slug: string;
  name: string;
  category: "Static" | "Dynamic";
  description: string;
  notes: string[];
  Demo: React.ComponentType;
}

export const registry: RegistryEntry[] = [
  {
    slug: "button",
    name: "Button",
    category: "Static",
    description: "Ink fill for primary, accent at most once per view.",
    notes: [
      "Primary is ink on surface; accent is the grey-blue, used once per view.",
      "4px corners, regular weight, press feedback is a scale to 0.98.",
    ],
    Demo: ButtonDemo,
  },
  {
    slug: "card",
    name: "Card",
    category: "Static",
    description: "Elevated surface with a hairline. Never more than three stacked.",
    notes: [
      "surface-elevated background, 1px rule border, 8px corners.",
      "Static cards stay tonal; shadows belong to interactive lift.",
    ],
    Demo: CardDemo,
  },
  {
    slug: "callout",
    name: "Callout",
    category: "Static",
    description: "The accent-muted block for the one key insight per document.",
    notes: [
      "accent-muted fill, ink text, optional Roboto Mono label.",
      "One per document or slide. It marks the most important thing.",
    ],
    Demo: CalloutDemo,
  },
  {
    slug: "table",
    name: "Table",
    category: "Static",
    description: "Sunken header, hairline grid, numbers right-aligned.",
    notes: [
      "Header row in surface-sunken with label-caps type.",
      "No banded rows. Numbers right-aligned, always.",
    ],
    Demo: TableDemo,
  },
  {
    slug: "link",
    name: "Link",
    category: "Static",
    description: "Accent text, underline only on hover.",
    notes: [
      "Often the single accent moment on a page.",
      "Darkens toward ink on hover for contrast.",
    ],
    Demo: LinkDemo,
  },
  {
    slug: "divider",
    name: "Divider",
    category: "Static",
    description: "A 1px rule. It replaces most visual decoration.",
    notes: ["Full-width or content-width. Never thicker than 1px."],
    Demo: DividerDemo,
  },
  {
    slug: "eyebrow",
    name: "Eyebrow",
    category: "Static",
    description: "Roboto Mono caps that introduce a section.",
    notes: [
      "0.75rem, uppercase, 0.08em tracking, slate color.",
      "The only place all-caps is allowed.",
    ],
    Demo: EyebrowDemo,
  },
  {
    slug: "chip",
    name: "Chip",
    category: "Static",
    description: "Small status labels for data views.",
    notes: [
      "4px corners. Sunken, accent-muted, or outline fills.",
      "Pills are reserved for inline status inside data views only.",
    ],
    Demo: ChipDemo,
  },
  {
    slug: "dialog",
    name: "Dialog",
    category: "Dynamic",
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
    category: "Dynamic",
    description: "A side panel that slides in on spring physics.",
    notes: [
      "Slides from the right, settles on the smooth spring.",
      "Border-left hairline separates it from the page.",
    ],
    Demo: SheetDemo,
  },
  {
    slug: "accordion",
    name: "Accordion",
    category: "Dynamic",
    description: "Hairline rows, rotating chevron, quiet height animation.",
    notes: [
      "Chevron rotates 180° in 200ms ease-out.",
      "Markers and icons recede; text carries the weight.",
    ],
    Demo: AccordionDemo,
  },
  {
    slug: "tabs",
    name: "Animated Tabs",
    category: "Dynamic",
    description: "A 1px ink underline glides between tabs.",
    notes: [
      "Shared-layout underline gliding on the smooth spring.",
      "The indicator is a hairline, not a filled pill.",
    ],
    Demo: TabsDemo,
  },
  {
    slug: "hover-lift-card",
    name: "Hover-lift Card",
    category: "Dynamic",
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
    category: "Dynamic",
    description: "Per-word serif reveal for the headline that matters.",
    notes: [
      "Words stagger 50ms apart on the smooth spring.",
      "One per view. Spend the bouncy spring here if anywhere.",
    ],
    Demo: TextRevealDemo,
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Dynamic",
    description: "Quiet confirmation, off to the side.",
    notes: [
      "surface-elevated, hairline border, no shadow.",
      "Light theme only, like everything else.",
    ],
    Demo: ToastDemo,
  },
];

export function getEntry(slug: string) {
  return registry.find((entry) => entry.slug === slug);
}
