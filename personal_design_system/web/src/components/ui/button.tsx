"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useTokens } from "@/lib/token-context"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-(--btn-radius) border border-transparent bg-clip-padding text-(length:--btn-font-size) font-normal whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-[color-mix(in_oklch,var(--btn-primary-bg),transparent_20%)]",
        accent:
          "bg-(--btn-accent-bg) text-(--btn-accent-text) hover:bg-[color-mix(in_oklch,var(--btn-accent-bg),var(--color-ink)_8%)]",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "gap-1.5 px-(--btn-px) py-(--btn-py) in-data-[slot=button-group]:rounded-md",
        xs: "h-6 gap-1 px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-9",
        "icon-xs":
          "size-6 in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const { values } = useTokens()
  const classes = cn(buttonVariants({ variant, size, className }))

  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={classes}
        {...props}
      />
    )
  }

  const hoverScale = Number(values["button.hoverScale"])
  const pressScale = Number(values["button.pressScale"])

  return (
    <motion.button
      whileHover={hoverScale !== 1 ? { scale: hoverScale } : undefined}
      whileTap={{ scale: pressScale }}
      transition={{
        type: "spring",
        stiffness: Number(values["button.stiffness"]),
        damping: Number(values["button.damping"]),
        mass: Number(values["button.mass"]),
      }}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={classes}
      {...(props as unknown as React.ComponentProps<typeof motion.button>)}
    />
  )
}

export { Button, buttonVariants }
