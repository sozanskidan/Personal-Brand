"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ds/chip";
import { HoverLiftCard } from "@/components/ds/hover-lift-card";
import { registry, CATEGORIES, type Category } from "@/lib/registry";

export function GalleryGrid() {
  const [filter, setFilter] = React.useState<Category | "All">("All");

  const visible =
    filter === "All"
      ? registry
      : registry.filter((entry) => entry.category === filter);

  const chip = (label: Category | "All") => (
    <button
      key={label}
      onClick={() => setFilter(label)}
      className={cn(
        "label-caps rounded-(--chip-radius) px-2.5 py-1.5 transition-colors",
        filter === label
          ? "bg-ink text-surface"
          : "bg-surface-sunken text-graphite hover:text-ink",
      )}
    >
      {label}
      <span className="ml-1.5 opacity-60">
        {label === "All"
          ? registry.length
          : registry.filter((e) => e.category === label).length}
      </span>
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {chip("All")}
        {CATEGORIES.map((c) => chip(c))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((entry) => {
          const { Demo } = entry;
          return (
            <Link key={entry.slug} href={`/components/${entry.slug}`}>
              <HoverLiftCard className="flex h-full flex-col p-4">
                <div className="pointer-events-none relative h-40 select-none overflow-hidden rounded-md bg-surface-sunken/50">
                  <div className="absolute left-1/2 top-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2 scale-[0.62]">
                    <div className="flex items-center justify-center">
                      <Demo />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h2 className="font-serif text-xl tracking-[-0.02em]">
                    {entry.name}
                  </h2>
                  <Chip variant={entry.kind === "dynamic" ? "accent" : "default"}>
                    {entry.category}
                  </Chip>
                </div>
                <p className="mt-2 text-sm text-graphite">{entry.description}</p>
              </HoverLiftCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
