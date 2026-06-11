"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useSpringToken, useTokenNumber } from "@/lib/token-context";

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
  const spring = useSpringToken("text-reveal");
  const stagger = useTokenNumber("text-reveal.staggerMs") / 1000;
  const rise = useTokenNumber("text-reveal.riseEm");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            // pb/-mb extend the rise mask below the baseline so tight
            // line-heights don't clip descenders (y, q, p, g).
            className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]"
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: `${rise}em` }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
          </span>
          {/* the space lives outside the mask so it isn't trimmed */}
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}
