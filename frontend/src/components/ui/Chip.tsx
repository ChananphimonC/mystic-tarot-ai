import type { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active = false, className = "", ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
        active
          ? "border-gold-400 bg-gold-400/10 text-gold-300"
          : "border-void-600 text-starlight-300 hover:border-nebula-400/70"
      } ${className}`}
      {...props}
    />
  );
}
