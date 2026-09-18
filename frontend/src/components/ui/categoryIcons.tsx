import type { JSX } from "react";
import type { Category } from "../../types/tarot";

const common = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Small line-art icons, one per question category — drawn in the same thin
 * gold-linework language as the tarot glyphs instead of pulling in an icon font. */
export const CATEGORY_ICONS: Record<Category, JSX.Element> = {
  love: (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 20s-7-4.2-9.3-8.4C1.2 8.7 2.3 5.4 5.4 5.4c1.9 0 3.3 1.3 3.9 2.4.6 -1.1 2-2.4 3.9-2.4 3.1 0 4.2 3.3 2.7 6.2C19 15.8 12 20 12 20Z" />
    </svg>
  ),
  career: (
    <svg viewBox="0 0 24 24" {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.5 12.8 12.8 9.5 14.5 11.2 11.2Z" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 4v16M6 8h12M6 8 4 12.5a2.5 2.5 0 0 0 5 0L6 8ZM18 8l-2 4.5a2.5 2.5 0 0 0 5 0L18 8ZM9 20h6" />
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 3c-4 4-4.5 8.5-4.5 8.5a4.5 4.5 0 0 0 9 0S16 7 12 3Z" />
      <path d="M12 12.5V21" />
    </svg>
  ),
  general: (
    <svg viewBox="0 0 24 24" {...common}>
      <circle cx="12" cy="12" r="2.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-18 12 12)" />
    </svg>
  ),
};
