"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";

/**
 * Depth without shadows: scale up 2% and shift one tonal step toward
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
  return (
    <motion.div
      initial={{ backgroundColor: "#FAFAF7" }}
      whileHover={{ scale: 1.02, backgroundColor: "#FFFFFF" }}
      whileTap={{ scale: 0.99 }}
      transition={springs.quiet}
      className={cn("rounded-md border border-rule p-6", className)}
    >
      {children}
    </motion.div>
  );
}
