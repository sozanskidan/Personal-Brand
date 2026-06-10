"use client";

import { motion } from "motion/react";
import { springs } from "@/lib/motion";

/** Per-word serif reveal. One per view, on the headline that matters. */
export function TextReveal({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.4em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.standard, delay: delay + i * 0.05 }}
          >
            {word}
            {i < words.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
