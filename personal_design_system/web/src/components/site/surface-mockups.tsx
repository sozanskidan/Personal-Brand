/**
 * Abstract surface mockups. Deliberately unreadable: mock bars in token
 * colors, standing in for the shape of each artifact rather than its
 * content. Same idea as a skeleton, used as a preview.
 *
 * No text, no imagery, no shadows. Every fill comes from the palette.
 */

import { cn } from "@/lib/utils";
import type { SurfaceKind } from "@/lib/surfaces";

function Bar({
  w,
  h = 4,
  tone = "rule",
  className,
}: {
  w: string;
  h?: number;
  tone?: "ink" | "graphite" | "slate" | "rule" | "accent" | "accent-muted" | "sunken";
  className?: string;
}) {
  const bg = {
    ink: "bg-ink",
    graphite: "bg-graphite",
    slate: "bg-slate",
    rule: "bg-rule",
    accent: "bg-accent",
    "accent-muted": "bg-accent-muted",
    sunken: "bg-surface-sunken",
  }[tone];

  return (
    <div
      className={cn("rounded-sm", bg, className)}
      style={{ width: w, height: h }}
    />
  );
}

/** The frame every mockup sits in: sunken ground, hairline, 4:3-ish. */
function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-rule bg-surface-elevated p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DocMock() {
  return (
    <Frame className="flex min-h-[220px] flex-col gap-2">
      <Bar w="22%" h={3} tone="slate" />
      <Bar w="62%" h={10} tone="ink" className="mt-1" />
      <Bar w="100%" h={26} tone="accent-muted" className="mt-3 rounded-md" />
      <div className="mt-3 flex flex-col gap-2">
        <Bar w="100%" />
        <Bar w="94%" />
        <Bar w="97%" />
      </div>
      <Bar w="34%" h={6} tone="graphite" className="mt-4" />
      <div className="mt-2 flex flex-col gap-2">
        <Bar w="88%" />
        <Bar w="72%" />
      </div>
    </Frame>
  );
}

function SlidesMock() {
  return (
    <Frame className="flex min-h-[220px] flex-col justify-between">
      <div className="flex flex-col gap-2">
        <Bar w="18%" h={3} tone="slate" />
        <Bar w="70%" h={14} tone="ink" className="mt-1" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="aspect-[4/3] rounded-md bg-surface-sunken" />
        <div className="aspect-[4/3] rounded-md bg-surface-sunken" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Bar w="20%" h={3} tone="rule" />
        <Bar w="8%" h={3} tone="rule" />
      </div>
    </Frame>
  );
}

function SheetsMock() {
  const rows = [0, 1, 2, 3, 4];
  return (
    <Frame className="min-h-[220px] p-0">
      <div className="flex items-center gap-4 rounded-t-md bg-surface-sunken px-4 py-3">
        <Bar w="26%" h={3} tone="graphite" />
        <Bar w="18%" h={3} tone="graphite" />
        <Bar w="14%" h={3} tone="graphite" className="ml-auto" />
      </div>
      {rows.map((r) => (
        <div
          key={r}
          className="flex items-center gap-4 border-t border-rule px-4 py-3"
        >
          <Bar w="30%" h={3} tone="slate" />
          <Bar w="16%" h={3} tone="rule" />
          <Bar
            w="12%"
            h={3}
            tone={r === 2 ? "accent" : "rule"}
            className="ml-auto"
          />
        </div>
      ))}
    </Frame>
  );
}

function WebMock() {
  return (
    <Frame className="min-h-[220px] p-0">
      <div className="flex items-center justify-between border-b border-rule px-4 py-3">
        <Bar w="22%" h={3} tone="graphite" />
        <div className="flex gap-2">
          <Bar w="24px" h={3} tone="rule" />
          <Bar w="24px" h={3} tone="rule" />
          <Bar w="24px" h={3} tone="rule" />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4 py-5">
        <Bar w="16%" h={3} tone="slate" />
        <Bar w="76%" h={12} tone="ink" className="mt-1" />
        <Bar w="90%" className="mt-2" />
        <Bar w="64%" />
        <div className="mt-4 aspect-[16/9] rounded-md bg-surface-sunken" />
      </div>
    </Frame>
  );
}

/**
 * The deck mockup is the only one on the stage ground, because that is
 * the surface it documents. The work inside it stays light.
 */
function DeckMock() {
  return (
    <div className="rounded-md border border-rule bg-stage p-5">
      <div className="flex min-h-[220px] flex-col justify-between">
        <div
          className="rounded-sm"
          style={{ width: "18%", height: 3, background: "var(--color-accent)" }}
        />
        <div className="flex flex-col gap-2">
          <div
            className="rounded-sm"
            style={{ width: "64%", height: 16, background: "var(--color-on-stage)" }}
          />
          <div
            className="rounded-sm"
            style={{ width: "42%", height: 16, background: "var(--color-on-stage)" }}
          />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="aspect-[4/3] rounded-md bg-surface-elevated" />
          <div className="aspect-[4/3] rounded-md bg-surface-elevated" />
          <div className="aspect-[4/3] rounded-md bg-surface-elevated" />
        </div>
      </div>
    </div>
  );
}

export function SurfaceMockup({ kind }: { kind: SurfaceKind }) {
  switch (kind) {
    case "doc":
      return <DocMock />;
    case "slides":
      return <SlidesMock />;
    case "sheets":
      return <SheetsMock />;
    case "web":
      return <WebMock />;
    case "deck":
      return <DeckMock />;
  }
}
