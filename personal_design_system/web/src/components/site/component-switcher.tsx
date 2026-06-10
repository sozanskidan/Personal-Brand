"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
  slug: string;
  name: string;
}

/**
 * Component-to-component navigation: prev/next, a jump dropdown, and
 * left/right arrow keys (ignored while typing in panel inputs).
 */
export function ComponentSwitcher({
  items,
  current,
}: {
  items: Item[];
  current: string;
}) {
  const router = useRouter();
  const index = items.findIndex((i) => i.slug === current);
  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") router.push(`/components/${next.slug}/`);
      if (e.key === "ArrowLeft") router.push(`/components/${prev.slug}/`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prev.slug, next.slug]);

  const arrow = (item: Item, dir: "prev" | "next") => (
    <Link
      href={`/components/${item.slug}/`}
      aria-label={`${dir === "prev" ? "Previous" : "Next"} component: ${item.name}`}
      title={item.name}
      className="rounded-sm p-1.5 text-slate transition-colors hover:bg-surface-sunken hover:text-ink"
    >
      {dir === "prev" ? (
        <ChevronLeftIcon className="size-4" />
      ) : (
        <ChevronRightIcon className="size-4" />
      )}
    </Link>
  );

  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href="/components"
        className="text-sm text-slate transition-colors hover:text-ink"
      >
        ← Components
      </Link>
      <div className="flex items-center gap-1">
        {arrow(prev, "prev")}
        <select
          value={current}
          onChange={(e) => router.push(`/components/${e.target.value}/`)}
          aria-label="Jump to component"
          className={cn(
            "h-8 cursor-pointer rounded-sm border border-rule bg-surface-elevated px-2 text-sm text-ink",
            "outline-none focus-visible:border-graphite",
          )}
        >
          {items.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.name}
            </option>
          ))}
        </select>
        {arrow(next, "next")}
        <span className="ml-2 hidden font-mono text-xs text-slate md:inline">
          ← → keys work too
        </span>
      </div>
    </div>
  );
}
