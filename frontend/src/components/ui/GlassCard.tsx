import type { HTMLAttributes } from "react";

export function GlassCard({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border border-void-600/60 bg-void-900/50 shadow-[0_0_40px_-14px_rgba(109,90,168,0.45)] backdrop-blur-sm ${className}`}
      {...props}
    />
  );
}
