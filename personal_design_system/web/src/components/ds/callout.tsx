import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

export function Callout({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"aside"> & { label?: string }) {
  return (
    <aside
      className={cn("rounded-(--callout-radius) bg-(--callout-bg) p-4 text-ink", className)}
      {...props}
    >
      {label ? <Eyebrow className="mb-2 text-graphite">{label}</Eyebrow> : null}
      <div className="text-base leading-[1.55]">{children}</div>
    </aside>
  );
}
