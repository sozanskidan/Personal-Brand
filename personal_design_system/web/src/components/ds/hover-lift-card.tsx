"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";

/** Depth without shadows: lift 2px and shift one tonal step toward white. */
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
      whileHover={{ y: -2, backgroundColor: "#FFFFFF" }}
      transition={springs.quiet}
      className={cn("rounded-md border border-rule p-6", className)}
    >
      {children}
    </motion.div>
  );
}
