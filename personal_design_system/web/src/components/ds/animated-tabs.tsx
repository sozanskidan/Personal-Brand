"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSpringToken, useTokenNumber } from "@/lib/token-context";

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export function AnimatedTabs({
  items,
  defaultValue,
  className,
}: {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}) {
  const [active, setActive] = React.useState(defaultValue ?? items[0]?.value);
  const layoutId = React.useId();
  const spring = useSpringToken("tabs");
  const thickness = useTokenNumber("tabs.thickness");

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-6 border-b border-rule">
        {items.map((item) => (
          <button
            key={item.value}
            role="tab"
            aria-selected={active === item.value}
            onClick={() => setActive(item.value)}
            className={cn(
              "relative pb-3 text-sm transition-colors",
              active === item.value
                ? "text-ink"
                : "text-slate hover:text-graphite",
            )}
          >
            {item.label}
            {active === item.value && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-x-0 bg-ink"
                style={{ bottom: -((thickness + 1) / 2), height: thickness }}
                transition={spring}
              />
            )}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-4">
        {items.find((item) => item.value === active)?.content}
      </div>
    </div>
  );
}
