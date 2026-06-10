import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { davinci, instrumentSerif, dmSans, robotoMono } from "@/lib/fonts";
import { SiteHeader } from "@/components/site/site-header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Dan Sozanski · Design System",
  description:
    "A personal design system. Apple-esque restraint, gallery-quiet, professional casual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans",
        davinci.variable,
        instrumentSerif.variable,
        dmSans.variable,
        robotoMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <MotionConfig reducedMotion="user">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Toaster />
        </MotionConfig>
      </body>
    </html>
  );
}
