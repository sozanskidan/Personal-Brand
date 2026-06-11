"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSpringToken, useTokens } from "@/lib/token-context";

export const LIFT_REST_SHADOW =
  "0 1px 2px rgba(10,10,10,0.04), 0 2px 6px rgba(10,10,10,0.05)";
export const LIFT_HOVER_SHADOW =
  "0 12px 32px rgba(10,10,10,0.10), 0 4px 10px rgba(10,10,10,0.05)";

/**
 * The card language for interactive surfaces: white, borderless, a soft
 * resting shadow that deepens on hover with a slight scale. Interactive
 * elements never translate on the y axis — movement reads as depth.
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

  return (
    <motion.div
      initial={{ boxShadow: LIFT_REST_SHADOW, backgroundColor: "#FFFFFF" }}
      whileHover={{
        scale: Number(values["hover-lift-card.hoverScale"]),
        boxShadow: LIFT_HOVER_SHADOW,
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
