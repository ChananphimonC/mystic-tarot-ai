import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "rounded-full px-7 py-3 font-display text-lg bg-gold-400 text-void-950 hover:bg-gold-300 disabled:bg-void-700 disabled:text-starlight-500",
  secondary:
    "rounded-full px-5 py-2 border border-void-600 text-starlight-300 hover:border-nebula-400 hover:text-starlight-50 disabled:border-void-700 disabled:text-starlight-700",
  ghost: "text-sm text-starlight-500 underline-offset-4 hover:text-starlight-300 hover:underline",
};

export function Button({ variant = "primary", className = "", disabled, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
