"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Callout } from "@/components/ds/callout";
import { Chip } from "@/components/ds/chip";
import { Eyebrow } from "@/components/ds/eyebrow";
import { TextLink } from "@/components/ds/text-link";
import { AnimatedDialog } from "@/components/ds/animated-dialog";
import { AnimatedSheet } from "@/components/ds/animated-sheet";
import { AnimatedTabs } from "@/components/ds/animated-tabs";
import { HoverLiftCard } from "@/components/ds/hover-lift-card";
import { TextReveal } from "@/components/ds/text-reveal";
import {
  TokenAreaChart,
  TokenBarChart,
  TokenLineChart,
  TokenDonutChart,
  Sparkline,
} from "@/components/ds/charts";
import { StatCard } from "@/components/ds/stat-card";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-serif text-xl tracking-[-0.02em]">
          Quarterly review
        </CardTitle>
        <CardDescription>
          Three goals, two shipped, one carried forward.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-graphite">
        Cards group related content. Never more than three stacked.
      </CardContent>
    </Card>
  );
}

export function CalloutDemo() {
  return (
    <Callout label="TL;DR" className="max-w-md">
      One accent moment per view. Make it the most important thing on the
      page.
    </Callout>
  );
}

export function TableDemo() {
  const rows = [
    { name: "Docs shipped", q1: "12", q2: "18" },
    { name: "Decks shipped", q1: "4", q2: "7" },
    { name: "Avg. words per slide", q1: "31", q2: "19" },
  ];
  return (
    <Table className="max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead className="text-right">Q1</TableHead>
          <TableHead className="text-right">Q2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell className="text-right tabular-nums">{row.q1}</TableCell>
            <TableCell className="text-right tabular-nums">{row.q2}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function LinkDemo() {
  return (
    <p className="max-w-md text-base">
      Links sit quietly in the body until needed, like{" "}
      <TextLink href="/foundations">this one</TextLink>. No underline at
      rest, underline on hover.
    </p>
  );
}

export function DividerDemo() {
  return (
    <div className="w-full max-w-md">
      <p className="text-sm text-graphite">Above the line.</p>
      <Separator className="my-4" />
      <p className="text-sm text-graphite">Below the line.</p>
    </div>
  );
}

export function EyebrowDemo() {
  return (
    <div className="space-y-2">
      <Eyebrow>Section 02 · Foundations</Eyebrow>
      <h2 className="font-serif text-3xl">The headline it introduces</h2>
    </div>
  );
}

export function ChipDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip>Default</Chip>
      <Chip variant="accent">Accent</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  );
}

export function DialogDemo() {
  return (
    <AnimatedDialog
      trigger={<Button variant="outline">Open dialog</Button>}
      title="A quiet entrance"
      description="Scales in on spring physics. Exits are a fast fade, never a reverse bounce."
    >
      <p className="text-sm text-graphite">
        The overlay is ink at 20% opacity. No blur, no glow.
      </p>
    </AnimatedDialog>
  );
}

export function SheetDemo() {
  return (
    <AnimatedSheet
      trigger={<Button variant="outline">Open sheet</Button>}
      title="Side panel"
      description="Slides in on spring physics and settles without fuss."
    >
      <p className="text-sm text-graphite">
        Use sheets for secondary tasks that should not steal the page.
      </p>
    </AnimatedSheet>
  );
}

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger>Why so much whitespace?</AccordionTrigger>
        <AccordionContent>
          Whitespace is the brand. Density signals panic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Where did the shadows go?</AccordionTrigger>
        <AccordionContent>
          Depth is tonal. Three surfaces and a hairline do the work.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Can I bold a heading?</AccordionTrigger>
        <AccordionContent>No. Size and serif are enough.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function TabsDemo() {
  return (
    <AnimatedTabs
      className="w-full max-w-md"
      items={[
        {
          value: "docs",
          label: "Docs",
          content: (
            <p className="text-sm text-graphite">
              The canonical surface. Title in serif, TL;DR up top.
            </p>
          ),
        },
        {
          value: "slides",
          label: "Slides",
          content: (
            <p className="text-sm text-graphite">
              Mostly visual. Twenty words per slide, max.
            </p>
          ),
        },
        {
          value: "sheets",
          label: "Sheets",
          content: (
            <p className="text-sm text-graphite">
              Numbers right-aligned. Always.
            </p>
          ),
        },
      ]}
    />
  );
}

export function HoverLiftDemo() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <HoverLiftCard>
        <Eyebrow className="mb-2">Hover me</Eyebrow>
        <p className="text-sm text-graphite">
          Scales up 2% while the shadow deepens. Clean lift.
        </p>
      </HoverLiftCard>
      <HoverLiftCard>
        <Eyebrow className="mb-2">Me too</Eyebrow>
        <p className="text-sm text-graphite">
          A stiff, damped spring settles it in a blink.
        </p>
      </HoverLiftCard>
    </div>
  );
}

export function TextRevealDemo() {
  const [runId, setRunId] = React.useState(0);
  const [looping, setLooping] = React.useState(true);

  React.useEffect(() => {
    if (!looping) return;
    const id = setInterval(() => setRunId((n) => n + 1), 2400);
    return () => clearInterval(id);
  }, [looping]);

  return (
    <div className="flex w-full max-w-lg flex-col items-start gap-6">
      <TextReveal
        key={runId}
        as="h2"
        text="Whitespace is the brand."
        className="font-serif text-4xl tracking-[-0.02em]"
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setLooping((l) => !l)}>
          {looping ? "Pause loop" : "Loop"}
        </Button>
        <Button variant="ghost" onClick={() => setRunId((n) => n + 1)}>
          Replay
        </Button>
      </div>
    </div>
  );
}

export function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => toast("Saved.", { description: "Quietly, off to the side." })}
    >
      Show toast
    </Button>
  );
}

export function AreaChartDemo() {
  return (
    <div className="w-full max-w-md">
      <TokenAreaChart />
    </div>
  );
}

export function BarChartDemo() {
  return (
    <div className="w-full max-w-md">
      <TokenBarChart />
    </div>
  );
}

export function LineChartDemo() {
  return (
    <div className="w-full max-w-md">
      <TokenLineChart />
    </div>
  );
}

export function DonutChartDemo() {
  return <TokenDonutChart />;
}

export function SparklineDemo() {
  return (
    <div className="flex items-center gap-8">
      <Sparkline />
      <Sparkline accent />
    </div>
  );
}

export function StatCardDemo() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <StatCard label="Docs shipped" value="22" delta="+38%" accent>
        <Sparkline className="h-8 w-full" accent />
      </StatCard>
      <StatCard label="Words per slide" value="19" delta="-39%">
        <Sparkline className="h-8 w-full" />
      </StatCard>
    </div>
  );
}
