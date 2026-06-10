import { Eyebrow } from "@/components/ds/eyebrow";
import { Separator } from "@/components/ui/separator";
import { SpringDemo } from "@/components/site/spring-demo";
import { ColorGrid } from "@/components/playground/color-grid";
import { RadiiGrid } from "@/components/playground/radii-grid";
import { ParamPanel } from "@/components/playground/param-panel";

export const metadata = { title: "Foundations · Dan Sozanski" };

const spacing = [
  { name: "xs", px: 4 },
  { name: "sm", px: 8 },
  { name: "md", px: 16 },
  { name: "lg", px: 24 },
  { name: "xl", px: 32 },
  { name: "xxl", px: 48 },
  { name: "xxxl", px: 64 },
];

function Section({
  eyebrow,
  title,
  lede,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
          <h2 className="font-serif text-4xl tracking-[-0.02em]">{title}</h2>
        </div>
        {action}
      </div>
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
        Every value on this page comes from DESIGN.md. Click a swatch to copy
        it; use the cogs to play with the tokens. Saved edits become your
        defaults in this browser.
      </p>

      <Separator className="mt-20" />

      <Section
        eyebrow="01 · Color"
        title="Grayscale, one scalpel"
        lede="No secondary brand color, no gradients. The accent appears at most once per view. Click any swatch to copy its hex."
        action={<ParamPanel scope="colors" />}
      >
        <ColorGrid />
      </Section>

      <Separator />

      <Section
        eyebrow="02 · Typography"
        title="Two families do the work"
        lede="Davinci (Instrument Serif fallback) carries the emotion. SF Pro (DM Sans fallback) carries the information. Roboto Mono marks the structure."
        action={<ParamPanel scope="eyebrow" />}
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
        lede="Margins, paddings, and gaps come from the scale. Nothing improvised, so nothing to tweak here."
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
        action={<ParamPanel scope="radii" />}
      >
        <RadiiGrid />
      </Section>

      <Separator />

      <Section
        eyebrow="05 · Motion"
        title="Second-order dynamics"
        lede="Three named springs move everything. Bounce is capped at 0.15 in the spec and exits never spring. Copy a preset with the icon, or open the cog and tune the physics live."
        action={<ParamPanel scope="springs" />}
      >
        <SpringDemo />
      </Section>
    </div>
  );
}
