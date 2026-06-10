"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSpringToken, useTokens } from "@/lib/token-context";

/**
 * Depth without shadows: scale up and shift one tonal step toward
 * white. Interactive elements never translate on the y axis — movement
 * reads as depth (scale), not displacement.
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
      initial={{ backgroundColor: "#FAFAF7" }}
      whileHover={{
        scale: Number(values["hover-lift-card.hoverScale"]),
        backgroundColor: String(values["hover-lift-card.hoverBg"]),
      }}
      whileTap={{ scale: Number(values["hover-lift-card.tapScale"]) }}
      transition={spring}
      className={cn("rounded-(--card-radius) border border-rule p-6", className)}
    >
      {children}
    </motion.div>
  );
}
