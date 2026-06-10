import Link from "next/link";
import { cn } from "@/lib/utils";

export function TextLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "text-(--link-color) no-underline decoration-1 underline-offset-(--link-underline-offset) transition-colors hover:underline hover:text-[color-mix(in_oklch,var(--color-accent),var(--color-ink)_25%)]",
        className,
      )}
      {...props}
    />
  );
}
