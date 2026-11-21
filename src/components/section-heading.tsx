import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-eastay", className)}>
      <span aria-hidden className="inline-block size-2 bg-eastay" />
      {children}
    </p>
  );
}
