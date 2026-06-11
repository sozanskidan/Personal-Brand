"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useTokens } from "@/lib/token-context";

/**
 * Spring-animated number: the digits chase the target on real physics.
 * Pairs with StatCard values and dashboard KPIs.
 */
export function NumberTicker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { values } = useTokens();
  const stiffness = Number(values["number-ticker.stiffness"]);
  const damping = Number(values["number-ticker.damping"]);
  const mass = Number(values["number-ticker.mass"]);

  const target = useMotionValue(value);
  const sprung = useSpring(target, { stiffness, damping, mass });
  const text = useTransform(
    sprung,
    (v) => `${prefix}${v.toFixed(decimals)}${suffix}`,
  );

  React.useEffect(() => {
    target.set(value);
  }, [value, target]);

  return (
    <motion.span className={cn("tabular-nums", className)}>{text}</motion.span>
  );
}
