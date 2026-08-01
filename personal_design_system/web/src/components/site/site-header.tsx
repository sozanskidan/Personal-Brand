import Link from "next/link";
import { Logo } from "@/components/site/logo";

const nav = [
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Components" },
  { href: "/templates", label: "Templates" },
  { href: "/presentations", label: "Presentations" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" aria-label="Dan Sozanski — home" className="text-ink transition-opacity hover:opacity-70">
          <Logo className="h-6 w-6" />
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
