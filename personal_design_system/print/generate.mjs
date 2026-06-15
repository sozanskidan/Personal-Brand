/**
 * DOCX proposal generator — Dan Sozanski's design system, Google Docs surface.
 *
 * Emits an 8.5x11 .docx that conforms to the canonical Docs spec in
 * DESIGN.md (Instrument Serif / DM Sans / Roboto Mono, point-based type
 * scale, 1.5 line spacing, grayscale + one grey-blue accent). Styles use
 * Word's built-in IDs (Title, Heading1-5, Normal) so Google Docs maps them
 * straight onto its own named styles on upload — headings stay editable as
 * system styles.
 *
 * Edit the CONTENT block, then `npm run build`. Upload proposal.docx to
 * Google Docs (you may need Font menu -> More fonts to add Instrument Serif
 * + DM Sans the first time; Roboto Mono is already there).
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
  Header,
  Footer,
  PageNumber,
  TabStopType,
  ShadingType,
  VerticalAlign,
  convertInchesToTwip,
} from "docx";
import { writeFileSync } from "node:fs";

/* ─────────────────────────────────────────────────────────────
   Tokens (from DESIGN.md). Colors as hex without #.
   ───────────────────────────────────────────────────────────── */
const COLOR = {
  ink: "0A0A0A",
  graphite: "3D3D3D",
  slate: "6B6B6B",
  rule: "E5E5E5",
  sunken: "F2F1ED",
  accentMuted: "E8EEF4",
  accent: "9BB0C9",
};

const SERIF = "Instrument Serif"; // Davinci's Google-available fallback
const SANS = "DM Sans"; // SF Pro's Workspace fallback
const MONO = "Roboto Mono";

const LINE_15 = 360; // 1.5 line spacing (240 = single)
const LINE_115 = 276; // 1.15, tight list wrap
const PAGE_W = 12240; // US Letter, twips
const MARGIN = convertInchesToTwip(1);
const CONTENT_W = PAGE_W - MARGIN * 2; // right tab stop for footer

const hp = (pt) => pt * 2; // points -> half-points for font size

/* ─────────────────────────────────────────────────────────────
   CONTENT — edit this block, then `npm run build`.
   ───────────────────────────────────────────────────────────── */
const CONTENT = {
  client: "Acme Co.",
  projectKind: "Engagement Proposal",
  title: "A quieter system for how Acme ships.",
  lede: "A proposal to design and build a unified content system across Acme's docs, decks, and dashboards.",
  preparedBy: "Dan Sozanski",
  role: "Design & Build",
  date: "June 2026",

  tldr: "Acme produces a high volume of client-facing collateral with no shared system, so quality drifts and every piece starts from zero. This proposal delivers one design system, a component library, and templates, in three phases over eight weeks.",

  overview: [
    "Acme's teams produce proposals, decks, and reporting dashboards independently. Without shared foundations, each piece is rebuilt by hand, brand consistency erodes, and turnaround stays slow.",
    "This engagement establishes a single design system, applies it across every surface, and hands over templates and documentation so the team can produce on-brand work without a designer in the loop.",
  ],

  scope: [
    {
      heading: "Foundations",
      items: [
        "Color, type, spacing, and motion tokens, documented in one source of truth.",
        "A token playground for live tuning and sign-off.",
      ],
    },
    {
      heading: "Component library",
      items: [
        "A catalog of production components across actions, forms, data, and feedback.",
        "Chart and dashboard widgets for interactive reporting.",
      ],
    },
    {
      heading: "Templates and handover",
      items: [
        "Proposal, deck, dashboard, and one-sheet templates.",
        "Documentation and a working session to hand the system to the team.",
      ],
    },
  ],

  timeline: [
    ["Phase 1", "Foundations and audit", "Weeks 1-2"],
    ["Phase 2", "Component library", "Weeks 3-6"],
    ["Phase 3", "Templates and handover", "Weeks 7-8"],
  ],

  pricing: {
    rows: [
      ["Foundations", "Tokens, audit, playground", "$6,000"],
      ["Component library", "Catalog + chart widgets", "$14,000"],
      ["Templates & handover", "Templates, docs, session", "$8,000"],
    ],
    total: ["Total", "Fixed fee, 50% to start", "$28,000"],
  },

  terms: "Fixed fee, billed 50% on signature and 50% on delivery. Timeline assumes one round of consolidated feedback per phase. Either party may pause with two weeks' notice. Licensed fonts are the client's responsibility.",
};

/* ─────────────────────────────────────────────────────────────
   Reusable run / paragraph helpers
   ───────────────────────────────────────────────────────────── */
const eyebrow = (text, { align } = {}) =>
  new Paragraph({
    alignment: align,
    spacing: { after: 120, line: LINE_15 },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: MONO,
        size: hp(8),
        color: COLOR.slate,
        characterSpacing: 12, // ~0.08em tracking
      }),
    ],
  });

const body = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: 200, line: LINE_15 },
    children: [new TextRun({ text, font: SANS, size: hp(10), color: COLOR.ink })],
    ...opts,
  });

const bullet = (text) =>
  new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 240, after: 240, line: LINE_115 },
    children: [new TextRun({ text, font: SANS, size: hp(10), color: COLOR.ink })],
  });

const spacer = (pts = 12) =>
  new Paragraph({ spacing: { after: pts * 20 }, children: [] });

/* ─────────────────────────────────────────────────────────────
   Hairline pricing table
   ───────────────────────────────────────────────────────────── */
const hairline = { style: BorderStyle.SINGLE, size: 6, color: COLOR.rule };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

const cell = (children, { width, align, fill, vAlign } = {}) =>
  new TableCell({
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    shading: fill ? { type: ShadingType.CLEAR, fill, color: "auto" } : undefined,
    verticalAlign: vAlign,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: Array.isArray(children) ? children : [children],
  });

const cellText = (text, { font = SANS, size = 10, color = COLOR.ink, bold, caps, align } = {}) =>
  new Paragraph({
    alignment: align,
    spacing: { line: LINE_15 },
    children: [
      new TextRun({
        text: caps ? text.toUpperCase() : text,
        font,
        size: hp(size),
        color,
        bold,
        characterSpacing: caps ? 12 : undefined,
      }),
    ],
  });

function pricingTable() {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      cell(cellText("Item", { font: MONO, size: 8, color: COLOR.graphite, caps: true }), { width: 32, fill: COLOR.sunken }),
      cell(cellText("Detail", { font: MONO, size: 8, color: COLOR.graphite, caps: true }), { width: 44, fill: COLOR.sunken }),
      cell(cellText("Amount", { font: MONO, size: 8, color: COLOR.graphite, caps: true, align: AlignmentType.RIGHT }), { width: 24, fill: COLOR.sunken }),
    ],
  });

  const bodyRows = CONTENT.pricing.rows.map(
    ([item, detail, amount]) =>
      new TableRow({
        children: [
          cell(cellText(item, { size: 10 }), { width: 32 }),
          cell(cellText(detail, { size: 10, color: COLOR.graphite }), { width: 44 }),
          cell(cellText(amount, { size: 10, align: AlignmentType.RIGHT }), { width: 24 }),
        ],
      }),
  );

  const [tItem, tDetail, tAmount] = CONTENT.pricing.total;
  const totalRow = new TableRow({
    children: [
      cell(cellText(tItem, { size: 10, bold: true }), { width: 32 }),
      cell(cellText(tDetail, { size: 10, color: COLOR.slate }), { width: 44 }),
      cell(cellText(tAmount, { size: 10, bold: true, align: AlignmentType.RIGHT }), { width: 24 }),
    ],
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: hairline,
      bottom: hairline,
      left: noBorder,
      right: noBorder,
      insideHorizontal: hairline,
      insideVertical: noBorder,
    },
    rows: [headerRow, ...bodyRows, totalRow],
  });
}

/* ─────────────────────────────────────────────────────────────
   Sign-off block (two borderless columns with signature lines)
   ───────────────────────────────────────────────────────────── */
const signatureLine = () =>
  new Paragraph({
    spacing: { before: 480, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR.rule, space: 1 } },
    children: [],
  });

const sigCell = (who) =>
  cell(
    [
      signatureLine(),
      cellText(who, { font: MONO, size: 8, color: COLOR.slate, caps: true }),
      cellText("Signature, name, date", { size: 9, color: COLOR.slate }),
    ],
    { width: 50 },
  );

function signOff() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
      insideHorizontal: noBorder, insideVertical: noBorder,
    },
    columnWidths: [CONTENT_W / 2, CONTENT_W / 2],
    rows: [
      new TableRow({
        children: [
          sigCell("For " + CONTENT.client),
          sigCell("For " + CONTENT.preparedBy),
        ],
      }),
    ],
  });
}

/* ─────────────────────────────────────────────────────────────
   Section helpers
   ───────────────────────────────────────────────────────────── */
const h2 = (text) =>
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
const h3 = (text) =>
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(text)] });

/* ── Cover page (section 1) ───────────────────────────────────── */
const coverChildren = [
  eyebrow(`${CONTENT.client} · ${CONTENT.projectKind}`),
  spacer(8),
  new Paragraph({
    heading: HeadingLevel.TITLE,
    spacing: { after: 200, line: LINE_15 },
    children: [new TextRun(CONTENT.title)],
  }),
  new Paragraph({
    style: "Subtitle",
    spacing: { after: 200, line: LINE_15 },
    children: [new TextRun({ text: CONTENT.lede, font: SERIF, size: hp(16), color: COLOR.graphite })],
  }),
  spacer(280),
  new Paragraph({
    spacing: { after: 40, line: LINE_15 },
    children: [
      new TextRun({ text: "Prepared by  ", font: MONO, size: hp(8), color: COLOR.slate, characterSpacing: 12 }),
      new TextRun({ text: CONTENT.preparedBy, font: SANS, size: hp(10), color: COLOR.ink }),
    ],
  }),
  new Paragraph({
    spacing: { after: 40, line: LINE_15 },
    children: [
      new TextRun({ text: CONTENT.role + "   ·   " + CONTENT.date, font: SANS, size: hp(10), color: COLOR.slate }),
    ],
  }),
];

/* ── Body (section 2) ─────────────────────────────────────────── */
const bodyChildren = [
  // TL;DR inline lead-in — the doc's one accent moment.
  new Paragraph({
    spacing: { after: 240, line: LINE_15 },
    children: [
      new TextRun({ text: "TL;DR  ", font: SANS, size: hp(10), bold: true, color: COLOR.accent }),
      new TextRun({ text: CONTENT.tldr, font: SANS, size: hp(10), color: COLOR.ink }),
    ],
  }),

  h2("Overview"),
  ...CONTENT.overview.map((p) => body(p)),

  h2("Scope of work"),
  ...CONTENT.scope.flatMap((group) => [h3(group.heading), ...group.items.map(bullet)]),

  h2("Timeline"),
  ...CONTENT.timeline.map(
    ([phase, what, when]) =>
      new Paragraph({
        spacing: { after: 160, line: LINE_15 },
        children: [
          new TextRun({ text: phase + "  ", font: SANS, size: hp(10), bold: true, color: COLOR.ink }),
          new TextRun({ text: what, font: SANS, size: hp(10), color: COLOR.graphite }),
          new TextRun({ text: "   " + when, font: MONO, size: hp(8), color: COLOR.slate }),
        ],
      }),
  ),

  h2("Investment"),
  pricingTable(),
  spacer(8),
  new Paragraph({
    spacing: { before: 120, line: LINE_15 },
    children: [new TextRun({ text: "Fixed fee. The amount above is the whole engagement, not an estimate.", font: SANS, size: hp(9), color: COLOR.slate })],
  }),

  h2("Terms"),
  body(CONTENT.terms),

  h2("Sign-off"),
  spacer(8),
  signOff(),
];

/* ─────────────────────────────────────────────────────────────
   Named styles — Word built-in IDs so Google Docs maps them.
   ───────────────────────────────────────────────────────────── */
const styles = {
  default: {
    document: {
      run: { font: SANS, size: hp(10), color: COLOR.ink },
      paragraph: { spacing: { line: LINE_15 } },
    },
  },
  paragraphStyles: [
    {
      id: "Title",
      name: "Title",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SERIF, size: hp(32), color: COLOR.ink },
      paragraph: { spacing: { line: LINE_15, after: 200 } },
    },
    {
      id: "Subtitle",
      name: "Subtitle",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SERIF, size: hp(16), color: COLOR.graphite },
      paragraph: { spacing: { line: LINE_15, after: 200 } },
    },
    {
      id: "Heading1",
      name: "Heading 1",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SERIF, size: hp(24), color: COLOR.ink },
      paragraph: { spacing: { before: 360, after: 160, line: LINE_15 } },
    },
    {
      id: "Heading2",
      name: "Heading 2",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SERIF, size: hp(20), color: COLOR.ink },
      paragraph: { spacing: { before: 360, after: 120, line: LINE_15 } },
    },
    {
      id: "Heading3",
      name: "Heading 3",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SANS, size: hp(12), color: COLOR.ink },
      paragraph: { spacing: { before: 200, after: 80, line: LINE_15 } },
    },
    {
      id: "Heading4",
      name: "Heading 4",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: SANS, size: hp(11), color: COLOR.ink, bold: true },
      paragraph: { spacing: { before: 160, after: 60, line: LINE_15 } },
    },
    {
      id: "Heading5",
      name: "Heading 5",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: { font: MONO, size: hp(8), color: COLOR.slate, allCaps: true, characterSpacing: 12 },
      paragraph: { spacing: { before: 160, after: 60, line: LINE_15 } },
    },
  ],
};

/* ── Footer with page number (body section only) ─────────────── */
const bodyFooter = new Footer({
  children: [
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
      children: [
        new TextRun({ text: `${CONTENT.preparedBy} · ${CONTENT.client} ${CONTENT.projectKind}`, font: MONO, size: hp(8), color: COLOR.slate, characterSpacing: 12 }),
        new TextRun({ text: "\t", font: MONO }),
        new TextRun({ children: [PageNumber.CURRENT], font: MONO, size: hp(8), color: COLOR.slate }),
      ],
    }),
  ],
});

const pageProps = {
  size: { width: PAGE_W, height: 15840 },
  margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
};

const doc = new Document({
  creator: CONTENT.preparedBy,
  title: `${CONTENT.client} ${CONTENT.projectKind}`,
  styles,
  sections: [
    {
      properties: { page: pageProps, titlePage: true },
      children: coverChildren,
    },
    {
      properties: { page: { ...pageProps, pageNumbers: { start: 1 } } },
      footers: { default: bodyFooter },
      children: bodyChildren,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync(new URL("./proposal.docx", import.meta.url), buffer);
console.log("Wrote proposal.docx (" + buffer.length + " bytes)");
