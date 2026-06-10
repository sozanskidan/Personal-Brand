import { cn } from "@/lib/utils";
import { ParamPanel } from "@/components/playground/param-panel";

/** Demo stage: one tonal step below the page, hairline frame. */
export function ComponentPreview({
  className,
  scope,
  children,
}: {
  className?: string;
  /** When set, renders the parameter cog for this scope in the corner. */
  scope?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-40 items-center justify-center rounded-md border border-rule bg-surface-sunken/60 p-8",
        className,
      )}
    >
      {scope ? <ParamPanel scope={scope} className="absolute right-3 top-3" /> : null}
      {children}
    </div>
  );
}
