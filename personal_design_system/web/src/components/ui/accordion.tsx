"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useSpringToken } from "@/lib/token-context"
import { ChevronDownIcon } from "lucide-react"

// Motion needs to know each item's open state as data, not a CSS
// attribute, so the root mirrors Radix's value into context and each
// item tells its content which value it is.
const OpenValuesContext = React.createContext<string[]>([])
const ItemValueContext = React.createContext<string>("")

function toArray(v: string | string[] | undefined): string[] {
  return Array.isArray(v) ? v : v ? [v] : []
}

function Accordion({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  const [internal, setInternal] = React.useState<string[]>(() =>
    toArray(props.value ?? props.defaultValue)
  )
  const open = props.value !== undefined ? toArray(props.value) : internal

  const handleChange = (next: string | string[]) => {
    setInternal(toArray(next))
    ;(props.onValueChange as ((v: string | string[]) => void) | undefined)?.(next)
  }

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      {...props}
      onValueChange={handleChange as never}
      className={cn("flex w-full flex-col", className)}
    >
      <OpenValuesContext.Provider value={open}>
        {children}
      </OpenValuesContext.Provider>
    </AccordionPrimitive.Root>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <ItemValueContext.Provider value={props.value}>
      <AccordionPrimitive.Item
        data-slot="accordion-item"
        className={cn("not-last:border-b", className)}
        {...props}
      />
    </ItemValueContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left text-sm font-normal transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 transition-transform duration-(--accordion-chevron-ms) ease-out group-aria-expanded/accordion-trigger:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const spring = useSpringToken("accordion")
  const itemValue = React.useContext(ItemValueContext)
  const open = React.useContext(OpenValuesContext).includes(itemValue)

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      asChild
      {...props}
    >
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={spring}
        className="overflow-hidden text-sm"
        // Radix hides forced-mounted closed content with the hidden
        // attribute, which would cut the collapse animation short.
        style={{ display: "block" }}
      >
        <div
          className={cn(
            "pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
            className
          )}
        >
          {children}
        </div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
