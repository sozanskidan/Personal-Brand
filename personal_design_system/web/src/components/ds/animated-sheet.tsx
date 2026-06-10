"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { springs, fadeExit } from "@/lib/motion";

interface AnimatedSheetProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function AnimatedSheet({
  trigger,
  title,
  description,
  children,
  className,
}: AnimatedSheetProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-ink/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: springs.quiet }}
                exit={{ opacity: 0, transition: fadeExit }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className={cn(
                  "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-rule bg-surface-elevated p-6",
                  className,
                )}
                initial={{ x: "100%" }}
                animate={{ x: 0, transition: springs.standard }}
                exit={{ x: "100%", transition: { duration: 0.2, ease: "easeIn" } }}
              >
                <DialogPrimitive.Title className="font-serif text-2xl font-normal tracking-[-0.02em] text-ink">
                  {title}
                </DialogPrimitive.Title>
                {description ? (
                  <DialogPrimitive.Description className="mt-2 text-sm text-slate">
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
                {children ? <div className="mt-4 flex-1 overflow-y-auto">{children}</div> : null}
                <DialogPrimitive.Close asChild>
                  <button
                    aria-label="Close"
                    className="absolute right-4 top-4 rounded-sm p-1 text-slate transition-colors hover:bg-surface-sunken hover:text-ink"
                  >
                    <XIcon className="size-4" />
                  </button>
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
