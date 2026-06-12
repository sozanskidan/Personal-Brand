import { Eyebrow } from "@/components/ds/eyebrow";
import { Callout } from "@/components/ds/callout";
import { Chip } from "@/components/ds/chip";
import { TextLink } from "@/components/ds/text-link";
import { HoverLiftCard } from "@/components/ds/hover-lift-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "@/components/ds/stat-card";
import {
  TokenAreaChart,
  TokenBarChart,
  Sparkline,
} from "@/components/ds/charts";

export const metadata = { title: "Templates · Dan Sozanski" };

function TemplateSection({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20">
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h2 className="font-serif text-4xl tracking-[-0.02em]">{title}</h2>
      <p className="mt-4 max-w-[60ch] text-base text-graphite">{lede}</p>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function DocTemplate() {
  return (
    <div className="rounded-md border border-rule bg-surface-elevated p-10 sm:p-16">
      <Eyebrow className="mb-3">Product · One-pager</Eyebrow>
      <h3 className="font-serif text-4xl leading-[1.1] tracking-[-0.02em]">
        Fewer documents, better documents
      </h3>
      <p className="mt-3 font-serif text-xl text-graphite">
        A proposal for cutting our doc count in half without losing a thing.
      </p>

      <Callout label="TL;DR" className="mt-8">
        We write 40 docs a quarter and read 12. This proposal merges templates,
        kills three recurring docs, and gives every doc a one-line job.
      </Callout>

      <div className="copy mt-8 max-w-[70ch] text-base text-ink">
        <p>
          Every document should earn its reader. The ones that do share three
          habits worth standardizing:
        </p>
        <ul>
          <li>They lead with the conclusion, not the journey.</li>
          <li>They fit one screen before the first scroll.</li>
          <li>They name an owner and a decision date.</li>
        </ul>
      </div>

      <Separator className="my-8" />

      <div className="flex items-center justify-between">
        <p className="text-[0.8125rem] text-slate">Dan Sozanski · June 2026</p>
        <p className="text-[0.8125rem] text-slate">
          Full doc: <TextLink href="/components/callout">defrag-q3</TextLink>
        </p>
      </div>
    </div>
  );
}

function SlideTemplate() {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border border-rule bg-surface-elevated">
      <div className="absolute left-10 top-10">
        <Eyebrow>Q3 Review · 04</Eyebrow>
      </div>
      <div className="absolute bottom-10 left-10 right-10">
        <h3 className="max-w-[16ch] font-serif text-4xl leading-[1.1] tracking-[-0.02em] sm:text-5xl">
          Ship less, land more.
        </h3>
        <p className="mt-3 text-sm text-slate">
          Eighteen words on this slide, including these ones.
        </p>
      </div>
    </div>
  );
}

function DashboardTemplate() {
  const rows = [
    { area: "Docs", owner: "Dan", status: "On track", q2: "18", delta: "+6" },
    { area: "Decks", owner: "Dan", status: "On track", q2: "7", delta: "+3" },
    { area: "Sheets", owner: "Leo", status: "At risk", q2: "3", delta: "-1" },
    { area: "Site", owner: "Rip", status: "On track", q2: "1", delta: "0" },
  ];
  return (
    <div className="rounded-md border border-rule bg-surface-elevated p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Eyebrow className="mb-2">Output · Q2</Eyebrow>
          <h3 className="font-serif text-2xl tracking-[-0.02em]">
            Shipping summary
          </h3>
        </div>
        <Button variant="outline">Export</Button>
      </div>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Shipped</TableHead>
            <TableHead className="text-right">Δ vs Q1</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.area}>
              <TableCell>{row.area}</TableCell>
              <TableCell className="text-slate">{row.owner}</TableCell>
              <TableCell>
                <Chip variant={row.status === "At risk" ? "accent" : "default"}>
                  {row.status}
                </Chip>
              </TableCell>
              <TableCell className="text-right tabular-nums">{row.q2}</TableCell>
              <TableCell className="text-right tabular-nums">{row.delta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 text-[0.8125rem] text-slate">
        The accent chip is the one accent moment: it marks the row that needs a
        decision.
      </p>
    </div>
  );
}

function LandingTemplate() {
  return (
    <div className="rounded-md border border-rule bg-surface-elevated px-8 py-16 sm:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow className="mb-4">Introducing</Eyebrow>
        <h3 className="font-serif text-5xl leading-[1.05] tracking-[-0.02em]">
          A quieter way to ship
        </h3>
        <p className="mx-auto mt-5 max-w-[44ch] text-base text-graphite">
          One surface for docs, decks, and dashboards. Same tokens, same calm,
          everywhere your work lands.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button variant="accent">Get started</Button>
          <Button variant="ghost">Read the spec</Button>
        </div>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Tonal depth", body: "Three surfaces and a hairline. No shadows." },
          { title: "Spring motion", body: "Real physics: stiffness, damping, mass. Settles naturally." },
          { title: "Type-led", body: "Serif carries emotion, sans carries information." },
        ].map((f) => (
          <HoverLiftCard key={f.title}>
            <h4 className="font-serif text-xl tracking-[-0.02em]">{f.title}</h4>
            <p className="mt-2 text-sm text-graphite">{f.body}</p>
          </HoverLiftCard>
        ))}
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Eyebrow className="mb-4">Templates</Eyebrow>
      <h1 className="font-serif text-5xl tracking-[-0.02em]">
        The components, composed.
      </h1>
      <p className="mt-4 max-w-[52ch] text-base text-graphite">
        Five compositions, one system. Each template uses only the components in
        the catalog and only the tokens in DESIGN.md.
      </p>

      <Separator className="mt-20" />

      <TemplateSection
        eyebrow="01 · Doc"
        title="The one-pager"
        lede="Eyebrow, serif title, TL;DR callout, breathing lists, hairline footer. The canonical surface."
      >
        <DocTemplate />
      </TemplateSection>

      <Separator />

      <TemplateSection
        eyebrow="02 · Slide"
        title="The title slide"
        lede="16:9, mostly empty. Title bottom-left, eyebrow top-left, twenty words max."
      >
        <SlideTemplate />
      </TemplateSection>

      <Separator />

      <TemplateSection
        eyebrow="03 · Sheet"
        title="The dashboard"
        lede="Sunken header, hairline grid, right-aligned numbers, and a single accent on the row that matters."
      >
        <DashboardTemplate />
      </TemplateSection>

      <Separator />

      <TemplateSection
        eyebrow="04 · Web"
        title="The landing section"
        lede="One accent button, hover-lift cards, and a headline doing all the talking."
      >
        <LandingTemplate />
      </TemplateSection>

      <Separator />

      <TemplateSection
        eyebrow="05 · Dashboard"
        title="The analytics view"
        lede="KPI stat cards over charts on hairline grids. Grayscale series, with the accent reserved for the number and the series that matter."
      >
        <AnalyticsTemplate />
      </TemplateSection>
    </div>
  );
}

function AnalyticsTemplate() {
  return (
    <div className="rounded-md border border-rule bg-surface-elevated p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Eyebrow className="mb-2">Side gig · Q2</Eyebrow>
          <h3 className="font-serif text-2xl tracking-[-0.02em]">
            Shipping velocity
          </h3>
        </div>
        <Button variant="outline">Share</Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Docs shipped" value={95} delta="+24%" accent>
          <Sparkline className="h-8 w-full" accent />
        </StatCard>
        <StatCard label="Decks shipped" value={39} delta="+11%">
          <Sparkline className="h-8 w-full" />
        </StatCard>
        <StatCard label="Median turnaround" value={2.4} decimals={1} suffix="d" delta="-18%">
          <Sparkline className="h-8 w-full" />
        </StatCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-(--card-radius) border border-rule p-5">
          <Eyebrow className="mb-4">Docs per month</Eyebrow>
          <TokenAreaChart />
        </div>
        <div className="rounded-(--card-radius) border border-rule p-5">
          <Eyebrow className="mb-4">Docs vs decks</Eyebrow>
          <TokenBarChart />
        </div>
      </div>

      <p className="mt-4 text-[0.8125rem] text-slate">
        One accent moment: the docs number and its series. Everything else
        stays grayscale.
      </p>
    </div>
  );
}
