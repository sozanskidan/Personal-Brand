"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-(--divider-color) data-horizontal:h-(--divider-thickness) data-horizontal:w-full data-vertical:w-(--divider-thickness) data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
