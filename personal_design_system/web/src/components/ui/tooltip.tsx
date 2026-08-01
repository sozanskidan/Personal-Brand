"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useSpringToken, useTokenNumber } from "@/lib/token-context"

function TooltipProvider({
  delayDuration,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  const tokenDelay = useTokenNumber("tooltip.delayMs")
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration ?? tokenDelay}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  const spring = useSpringToken("tooltip")
  const initialScale = useTokenNumber("tooltip.initialScale")
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        asChild
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: initialScale }}
          animate={{ opacity: 1, scale: 1, transition: spring }}
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-(--tooltip-radius) border border-rule bg-surface-elevated px-3 py-1.5 text-xs text-ink has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-closed:animate-out data-closed:fade-out-0",
            className
          )}
        >
          {children}
        </motion.div>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
