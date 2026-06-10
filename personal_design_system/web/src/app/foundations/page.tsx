import { Eyebrow } from "@/components/ds/eyebrow";
import { Separator } from "@/components/ui/separator";
import { SpringDemo } from "@/components/site/spring-demo";

export const metadata = { title: "Foundations · Dan Sozanski" };

const colors = [
  { name: "Ink", hex: "#0A0A0A", usage: "Headlines, body text. The voice of the document.", className: "bg-ink" },
  { name: "Graphite", hex: "#3D3D3D", usage: "Sub-headings, strong borders. Quiet authority.", className: "bg-graphite" },
  { name: "Slate", hex: "#6B6B6B", usage: "Captions, metadata, secondary labels.", className: "bg-slate" },
  { name: "Rule", hex: "#E5E5E5", usage: "Hairlines, table grids. Should almost disappear.", className: "bg-rule" },
  { name: "Surface", hex: "#FAFAF7", usage: "The page itself. Warm, almost-white, never pure.", className: "bg-surface border border-rule" },
  { name: "Surface elevated", hex: "#FFFFFF", usage: "Cards, slide canvases, table cells.", className: "bg-surface-elevated border border-rule" },
  { name: "Surface sunken", hex: "#F2F1ED", usage: "Tonal depth, table headers, code blocks.", className: "bg-surface-sunken border border-rule" },
  { name: "Accent", hex: "#9BB0C9", usage: "Pastel grey-blue. Use it once. Make it count.", className: "bg-accent" },
  { name: "Accent muted", hex: "#E8EEF4", usage: "Callout fills and highlight backgrounds.", className: "bg-accent-muted border border-rule" },
];

const spacing = [
  { name: "xs", px: 4 },
  { name: "sm", px: 8 },
  { name: "md", px: 16 },
  { name: "lg", px: 24 },
  { name: "xl", px: 32 },
  { name: "xxl", px: 48 },
  { name: "xxxl", px: 64 },
];

const radii = [
  { name: "sm", px: 4, usage: "Buttons, chips" },
  { name: "md", px: 8, usage: "Cards, callouts, dialogs" },
  { name: "lg", px: 16, usage: "Large containers" },
  { name: "xl", px: 24, usage: "Hero features" },
];

function Section({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20">
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h2 className="font-serif text-4xl tracking-[-0.02em]">{title}</h2>
      {lede ? (
        <p className="mt-4 max-w-[60ch] text-base text-graphite">{lede}</p>
      ) : null}
      <div className="mt-12">{children}</div>
    </section>
  );
}

export default function FoundationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Eyebrow className="mb-4">Foundations</Eyebrow>
      <h1 className="font-serif text-5xl tracking-[-0.02em]">
        Tokens, not taste.
      </h1>
      <p className="mt-4 max-w-[52ch] text-base text-graphite">
        Every value on this page comes from DESIGN.md. Nothing improvised.
      </p>

      <Separator className="mt-20" />

      <Section
        eyebrow="01 · Color"
        title="Grayscale, one scalpel"
        lede="No secondary brand color, no gradients. The accent appears at most once per view."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((c) => (
            <div key={c.name} className="rounded-md border border-rule bg-surface-elevated p-4">
              <div className={`h-16 rounded-sm ${c.className}`} />
              <div className="mt-3 flex items-baseline justify-between">
                <p className="text-sm text-ink">{c.name}</p>
                <p className="font-mono text-xs text-slate">{c.hex}</p>
              </div>
              <p className="mt-1 text-[0.8125rem] text-slate">{c.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section
        eyebrow="02 · Typography"
        title="Two families do the work"
        lede="Davinci (Instrument Serif fallback) carries the emotion. SF Pro (DM Sans fallback) carries the information. Roboto Mono marks the structure."
      >
        <div className="space-y-10">
          <div>
            <p className="font-mono text-xs text-slate">Display · serif · 4.5rem · -0.02em</p>
            <p className="mt-2 font-serif text-7xl leading-[1.05] tracking-[-0.02em]">Quietly confident</p>
          </div>
          <div>
            <p className="font-mono text-xs text-slate">Heading 1 · serif · 3rem</p>
            <p className="mt-2 font-serif text-5xl leading-[1.1] tracking-[-0.02em]">Never bolded, ever</p>
          </div>
          <div>
            <p className="font-mono text-xs text-slate">Heading 2 · serif · 2rem</p>
            <p className="mt-2 font-serif text-3xl leading-[1.15] tracking-[-0.02em]">Size and serif are enough</p>
          </div>
          <div>
            <p className="font-mono text-xs text-slate">Body · sans · 1rem · 1.55</p>
            <p className="mt-2 max-w-[70ch] text-base">
              Body copy reads in SF Pro at one rem with generous leading,
              measure capped near seventy characters so long lines never kill
              the calm.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-slate">Caption · sans · 0.8125rem · slate</p>
            <p className="mt-2 text-[0.8125rem] text-slate">
              Captions and metadata recede to the background.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-slate">Label caps · mono · 0.75rem · 0.08em</p>
            <p className="label-caps mt-2 text-slate">The only all-caps allowed</p>
          </div>
        </div>
      </Section>

      <Separator />

      <Section
        eyebrow="03 · Spacing"
        title="The 8px grid"
        lede="Margins, paddings, and gaps come from the scale. Nothing improvised."
      >
        <div className="space-y-3">
          {spacing.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="w-10 font-mono text-xs text-slate">{s.name}</span>
              <div className="h-4 bg-accent-muted" style={{ width: s.px * 4 }} />
              <span className="font-mono text-xs text-slate">{s.px}px</span>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section
        eyebrow="04 · Shape"
        title="Gentle, never round"
        lede="Default 8px. Pills are reserved for inline status chips inside data views only."
      >
        <div className="grid gap-4 sm:grid-cols-4">
          {radii.map((r) => (
            <div key={r.name} className="text-center">
              <div
                className="mx-auto size-20 border border-graphite bg-surface-elevated"
                style={{ borderRadius: r.px }}
              />
              <p className="mt-3 font-mono text-xs text-slate">
                {r.name} · {r.px}px
              </p>
              <p className="text-[0.8125rem] text-slate">{r.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section
        eyebrow="05 · Motion"
        title="Second-order dynamics"
        lede="Three named springs move everything. Bounce is capped at 0.15 and exits never spring — they fade in 150ms. Reduced motion is always respected."
      >
        <SpringDemo />
      </Section>
    </div>
  );
}
