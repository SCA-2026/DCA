import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="site-sheet relative z-10 flex flex-1 flex-col bg-[var(--ink)]">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
