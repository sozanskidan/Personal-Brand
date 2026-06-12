import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Chip } from "./chip";
import { NumberTicker } from "./number-ticker";

/**
 * KPI stat: eyebrow label, large tabular number, delta chip. The delta
 * chip is the card's one accent moment — accent variant only when this
 * is the number the view exists for. Numeric values count up through
 * the spring-driven NumberTicker; strings render as-is.
 */
export function StatCard({
  label,
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  delta,
  accent = false,
  children,
  className,
}: {
  label: string;
  value: string | number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  /** Marks this stat as the view's accent moment. */
  accent?: boolean;
  /** Optional footer content, e.g. a sparkline. */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-(--card-radius) border border-rule bg-surface-elevated p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Eyebrow>{label}</Eyebrow>
        {delta ? (
          <Chip variant={accent ? "accent" : "default"}>{delta}</Chip>
        ) : null}
      </div>
      <p className="mt-3 font-serif text-4xl tracking-[-0.02em] tabular-nums">
        {typeof value === "number" ? (
          <NumberTicker
            value={value}
            decimals={decimals}
            prefix={prefix}
            suffix={suffix}
          />
        ) : (
          value
        )}
      </p>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}
