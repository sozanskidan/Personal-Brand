"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { animate } from "motion/react"

import { cn } from "@/lib/utils"
import { useSpringToken } from "@/lib/token-context"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const spring = useSpringToken("slider")
  const springRef = React.useRef(spring)
  springRef.current = spring

  // The target is where the pointer/keyboard put the value; the display
  // is what we render, chasing the target on the scope's spring.
  const [internal, setInternal] = React.useState<number[]>(() =>
    Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]
  )
  const target = Array.isArray(value) ? value : internal
  const [display, setDisplay] = React.useState<number[]>(target)
  const displayRef = React.useRef(display)
  displayRef.current = display

  const targetKey = target.join("|")
  React.useEffect(() => {
    const next = targetKey.split("|").map(Number)
    const controls = next.map((to, i) =>
      animate(displayRef.current[i] ?? to, to, {
        ...springRef.current,
        onUpdate: (v) =>
          setDisplay((prev) => {
            if (prev[i] === v) return prev
            const copy = [...prev]
            copy[i] = v
            return copy
          }),
      })
    )
    return () => controls.forEach((c) => c.stop())
  }, [targetKey])

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={display}
      onValueChange={(next) => {
        setInternal(next)
        onValueChange?.(next)
      }}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: target.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] select-none hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
