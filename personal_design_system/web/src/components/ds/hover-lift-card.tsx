"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSpringToken, useTokens } from "@/lib/token-context";

/**
 * Shadow pair built from the lift tokens. Rest and hover share the same
 * two-layer structure so the spring interpolates instead of popping.
 * Resting shadow defaults to 0% — flat until touched.
 */
export function useLiftShadows() {
  const { values } = useTokens();
  const y = Number(values["hover-lift-card.shadowY"]);
  const blur = Number(values["hover-lift-card.shadowBlur"]);
  const op = Number(values["hover-lift-card.shadowOpacity"]) / 100;
  const restOp = Number(values["hover-lift-card.restShadowOpacity"]) / 100;

  const layers = (opacity: number) =>
    `0 ${y}px ${blur}px rgba(10,10,10,${opacity}), 0 ${Math.round(y / 3)}px ${Math.round(blur / 3.2)}px rgba(10,10,10,${opacity / 2})`;

  return { rest: layers(restOp), hover: layers(op) };
}

/**
 * The card language for interactive surfaces: white and borderless,
 * flat at rest — tonal separation only. On hover a soft shadow appears
 * with a slight scale. Interactive elements never translate on the
 * y axis — movement reads as depth.
 */
export function HoverLiftCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { values } = useTokens();
  const spring = useSpringToken("hover-lift-card");
  const { rest, hover } = useLiftShadows();

  return (
    <motion.div
      initial={false}
      animate={{ boxShadow: rest, backgroundColor: "#FFFFFF" }}
      whileHover={{
        scale: Number(values["hover-lift-card.hoverScale"]),
        boxShadow: hover,
        backgroundColor: String(values["hover-lift-card.hoverBg"]),
      }}
      whileTap={{ scale: Number(values["hover-lift-card.tapScale"]) }}
      transition={spring}
      className={cn("rounded-(--lift-radius) p-6", className)}
    >
      {children}
    </motion.div>
  );
}
