"use client";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FACTORY } from "@/lib/defaults";
import { useTokens } from "@/lib/token-context";

/**
 * Copies every saved override (vs. factory) as JSON. Paste it to your
 * agent to bake the values into DESIGN.md and the site defaults.
 */
export function ExportTokens() {
  const { saved } = useTokens();

  const handleExport = async () => {
    const diff = Object.fromEntries(
      Object.entries(saved).filter(([key, v]) => v !== FACTORY[key]),
    );
    const count = Object.keys(diff).length;
    if (count === 0) {
      toast("Nothing to export.", {
        description: "Every token is still at its factory value.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(JSON.stringify(diff, null, 2));
      toast(`${count} override${count === 1 ? "" : "s"} copied.`, {
        description:
          "Paste to your agent to bake these into DESIGN.md as the new factory defaults.",
      });
    } catch {
      toast("Couldn't reach the clipboard.");
    }
  };

  return (
    <Button variant="outline" onClick={handleExport}>
      <CopyIcon data-icon="inline-start" /> Export saved overrides
    </Button>
  );
}
