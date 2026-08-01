"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useSpringToken, useTokenNumber } from "@/lib/token-context"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  const spring = useSpringToken("radio")
  const popScale = useTokenNumber("radio.popScale")
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          initial={{ scale: popScale, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: spring }}
          className="size-2 rounded-full bg-primary-foreground"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
