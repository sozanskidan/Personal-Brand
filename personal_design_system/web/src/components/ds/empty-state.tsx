import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The nothing-here state: quiet, centered, one suggested action.
 * Empty is calm, not an error.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-(--card-radius) border border-dashed border-rule px-8 py-12 text-center",
        className,
      )}
    >
      <div className="text-slate">
        {icon ?? <InboxIcon className="size-6" strokeWidth={1.5} />}
      </div>
      <h3 className="mt-4 font-serif text-2xl tracking-[-0.02em]">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-[36ch] text-sm text-slate">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
