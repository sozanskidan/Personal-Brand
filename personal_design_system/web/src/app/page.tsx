import Link from "next/link";
import { Eyebrow } from "@/components/ds/eyebrow";
import { TextReveal } from "@/components/ds/text-reveal";
import { HoverLiftCard } from "@/components/ds/hover-lift-card";
import { Separator } from "@/components/ui/separator";

const principles = [
  {
    number: "01",
    title: "Whitespace is the brand.",
    body: "When in doubt, remove. Density signals panic.",
  },
  {
    number: "02",
    title: "One accent per view.",
    body: "The grey-blue accent is a scalpel, not a highlighter.",
  },
  {
    number: "03",
    title: "Type does the design.",
    body: "Davinci headings against SF Pro body is the entire mood. Don't decorate it.",
  },
];

const sections = [
  {
    href: "/foundations",
    title: "Foundations",
    body: "Colors, type, spacing, and the spring physics that move everything.",
  },
  {
    href: "/components",
    title: "Components",
    body: "Thirty-one pieces in seven categories, all on the same quiet rules.",
  },
  {
    href: "/templates",
    title: "Templates",
    body: "The components composed: a doc, a slide, a dashboard, a page.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-40 pb-32">
        <Eyebrow className="mb-4">Personal design system</Eyebrow>
        <TextReveal
          as="h1"
          text="Gallery-quiet, professional casual."
          className="font-serif text-6xl leading-[1.05] tracking-[-0.02em] sm:text-7xl"
        />
        <p className="mt-6 max-w-[52ch] text-lg text-graphite">
          Apple-esque restraint on warm off-white. Mostly grayscale, a single
          pastel grey-blue doing the work of ten. Reading it should feel like
          walking into a quiet, well-lit room.
        </p>
      </section>

      <Separator />

      <section className="py-24">
        <Eyebrow className="mb-12">Three principles</Eyebrow>
        <div className="grid gap-12 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.number}>
              <p className="font-mono text-sm text-slate">{p.number}</p>
              <h2 className="mt-3 font-serif text-2xl tracking-[-0.02em]">
                {p.title}
              </h2>
              <p className="mt-3 text-base text-graphite">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section className="py-24">
        <Eyebrow className="mb-12">Explore</Eyebrow>
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.href} href={s.href}>
              <HoverLiftCard className="h-full">
                <h2 className="font-serif text-2xl tracking-[-0.02em]">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm text-graphite">{s.body}</p>
              </HoverLiftCard>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-rule py-12">
        <p className="text-[0.8125rem] text-slate">
          Dan Sozanski · Design System · Light mode only. No shadows were used
          in the making of this site.
        </p>
      </footer>
    </div>
  );
}
