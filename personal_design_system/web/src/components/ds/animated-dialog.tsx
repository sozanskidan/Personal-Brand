"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpringToken, useExitFade, useTokenNumber } from "@/lib/token-context";

interface AnimatedDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function AnimatedDialog({
  trigger,
  title,
  description,
  children,
  className,
}: AnimatedDialogProps) {
  const [open, setOpen] = React.useState(false);
  const spring = useSpringToken("dialog");
  const exit = useExitFade();
  const initialScale = useTokenNumber("dialog.initialScale");
  const overlayOpacity = useTokenNumber("dialog.overlayOpacity") / 100;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50"
                style={{ backgroundColor: "var(--color-ink)" }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: overlayOpacity,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
                exit={{ opacity: 0, transition: exit }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-md rounded-(--dialog-radius) border border-rule bg-surface-elevated p-6",
                  className,
                )}
                initial={{ opacity: 0, scale: initialScale, x: "-50%", y: "-50%" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: "-50%",
                  y: "-50%",
                  transition: spring,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  x: "-50%",
                  y: "-50%",
                  transition: exit,
                }}
              >
                <DialogPrimitive.Title className="font-serif text-2xl font-normal tracking-[-0.02em] text-ink">
                  {title}
                </DialogPrimitive.Title>
                {description ? (
                  <DialogPrimitive.Description className="mt-2 text-sm text-slate">
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
                {children ? <div className="mt-4">{children}</div> : null}
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
