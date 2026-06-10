import { cn } from "@/lib/utils";

const chipVariants = {
  default: "bg-surface-sunken text-graphite",
  accent: "bg-accent-muted text-ink",
  outline: "border border-rule text-graphite",
} as const;

export function Chip({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"span"> & { variant?: keyof typeof chipVariants }) {
  return (
    <span
      className={cn(
        "label-caps inline-flex items-center gap-1 rounded-sm px-2 py-1",
        chipVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
