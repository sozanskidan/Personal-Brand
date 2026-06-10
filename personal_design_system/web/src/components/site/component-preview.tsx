import { cn } from "@/lib/utils";

/** Demo stage: one tonal step below the page, hairline frame. */
export function ComponentPreview({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-h-40 items-center justify-center rounded-md border border-rule bg-surface-sunken/60 p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
