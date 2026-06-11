"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useTokenNumber } from "@/lib/token-context";

/**
 * Charts speak the same language as the rest of the system: hairline
 * grids, grayscale series, the accent reserved for the one series that
 * matters, tooltips on surface-elevated with a 1px rule. Colors come
 * from the --chart-* tokens (editable in the Charts panel).
 */

const axisStyle = {
  tickLine: false,
  axisLine: false,
  tick: {
    fill: "var(--color-slate)",
    fontSize: 11,
    fontFamily: "var(--font-mono)",
  },
} as const;

const gridStyle = {
  vertical: false,
  stroke: "var(--chart-grid)",
  strokeWidth: 1,
} as const;

export const MONTHS = [
  { month: "Jan", docs: 12, decks: 4 },
  { month: "Feb", docs: 16, decks: 6 },
  { month: "Mar", docs: 11, decks: 5 },
  { month: "Apr", docs: 19, decks: 9 },
  { month: "May", docs: 15, decks: 7 },
  { month: "Jun", docs: 22, decks: 8 },
];

const twoSeriesConfig = {
  docs: { label: "Docs", color: "var(--chart-1)" },
  decks: { label: "Decks", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function TokenAreaChart({ className }: { className?: string }) {
  const strokeWidth = useTokenNumber("charts.strokeWidth");
  return (
    <ChartContainer config={twoSeriesConfig} className={className ?? "min-h-44 w-full"}>
      <AreaChart data={MONTHS} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="month" {...axisStyle} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="docs"
          type="natural"
          stroke="var(--chart-1)"
          strokeWidth={strokeWidth}
          fill="var(--chart-5)"
          fillOpacity={0.5}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export function TokenBarChart({ className }: { className?: string }) {
  return (
    <ChartContainer config={twoSeriesConfig} className={className ?? "min-h-44 w-full"}>
      <BarChart data={MONTHS} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="month" {...axisStyle} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="docs" fill="var(--chart-1)" radius={[2, 2, 0, 0]} maxBarSize={28} />
        <Bar dataKey="decks" fill="var(--chart-2)" radius={[2, 2, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ChartContainer>
  );
}

export function TokenLineChart({ className }: { className?: string }) {
  const strokeWidth = useTokenNumber("charts.strokeWidth");
  return (
    <ChartContainer config={twoSeriesConfig} className={className ?? "min-h-44 w-full"}>
      <LineChart data={MONTHS} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="month" {...axisStyle} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="docs"
          type="natural"
          stroke="var(--chart-1)"
          strokeWidth={strokeWidth}
          dot={false}
        />
        <Line
          dataKey="decks"
          type="natural"
          stroke="var(--chart-2)"
          strokeWidth={strokeWidth}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

const DONUT_DATA = [
  { kind: "docs", value: 48, fill: "var(--chart-1)" },
  { kind: "decks", value: 27, fill: "var(--chart-2)" },
  { kind: "sheets", value: 15, fill: "var(--chart-3)" },
  { kind: "sites", value: 10, fill: "var(--chart-5)" },
];

const donutConfig = {
  value: { label: "Share" },
  docs: { label: "Docs", color: "var(--chart-1)" },
  decks: { label: "Decks", color: "var(--chart-2)" },
  sheets: { label: "Sheets", color: "var(--chart-3)" },
  sites: { label: "Sites", color: "var(--chart-5)" },
} satisfies ChartConfig;

export function TokenDonutChart({ className }: { className?: string }) {
  return (
    <ChartContainer
      config={donutConfig}
      className={className ?? "mx-auto aspect-square min-h-44"}
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="kind" />} />
        <Pie
          data={DONUT_DATA}
          dataKey="value"
          nameKey="kind"
          innerRadius={52}
          outerRadius={72}
          paddingAngle={2}
          strokeWidth={0}
        />
      </PieChart>
    </ChartContainer>
  );
}

const SPARK = [4, 7, 5, 9, 8, 12, 10, 14].map((v, i) => ({ i, v }));

export function Sparkline({
  className,
  accent = false,
}: {
  className?: string;
  accent?: boolean;
}) {
  const strokeWidth = useTokenNumber("charts.strokeWidth");
  return (
    <ChartContainer
      config={{ v: { label: "Value" } }}
      className={className ?? "h-10 w-28"}
    >
      <LineChart data={SPARK} margin={{ left: 2, right: 2, top: 4, bottom: 4 }}>
        <Line
          dataKey="v"
          type="natural"
          stroke={accent ? "var(--chart-2)" : "var(--chart-1)"}
          strokeWidth={strokeWidth}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
