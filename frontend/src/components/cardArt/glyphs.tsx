import type { JSX } from "react";

/** Hand-authored line-glyphs, one per Major Arcana card, plus one per Minor Arcana
 * suit. Kept to simple primitives (line/circle/path) so every card in the deck
 * reads as an abstract, original mark rather than a copy of any existing deck's
 * illustrations, while still being identifiable at a glance. */

const commonProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const MAJOR_GLYPHS: Record<string, JSX.Element> = {
  fool: (
    <g {...commonProps}>
      <circle cx="68" cy="26" r="9" />
      <line x1="20" y1="78" x2="60" y2="36" />
      <circle cx="18" cy="80" r="3" fill="currentColor" stroke="none" />
    </g>
  ),
  magician: (
    <g {...commonProps}>
      <path d="M20,50 C20,37 38,37 40,50 C42,63 58,63 60,50 C62,37 80,37 80,50 C80,63 62,63 60,50" />
      <line x1="50" y1="16" x2="50" y2="34" />
    </g>
  ),
  high_priestess: (
    <g {...commonProps}>
      <line x1="26" y1="20" x2="26" y2="80" />
      <line x1="74" y1="20" x2="74" y2="80" />
      <path d="M42,42 a10,10 0 1,0 16,0 a7.5,7.5 0 1,1 -16,0" />
    </g>
  ),
  empress: (
    <g {...commonProps}>
      <circle cx="50" cy="34" r="15" />
      <line x1="50" y1="49" x2="50" y2="78" />
      <line x1="36" y1="63" x2="64" y2="63" />
    </g>
  ),
  emperor: (
    <g {...commonProps}>
      <rect x="30" y="42" width="40" height="33" />
      <path d="M34,42 L50,20 L66,42" />
    </g>
  ),
  hierophant: (
    <g {...commonProps}>
      <circle cx="50" cy="26" r="10" />
      <line x1="50" y1="36" x2="50" y2="80" />
      <line x1="37" y1="50" x2="63" y2="50" />
      <line x1="40" y1="62" x2="60" y2="62" />
    </g>
  ),
  lovers: (
    <g {...commonProps}>
      <circle cx="41" cy="50" r="18" />
      <circle cx="59" cy="50" r="18" />
    </g>
  ),
  chariot: (
    <g {...commonProps}>
      <path d="M30,44 L50,24 L70,44" />
      <rect x="30" y="44" width="40" height="21" />
      <circle cx="36" cy="76" r="8" />
      <circle cx="64" cy="76" r="8" />
    </g>
  ),
  strength: (
    <g {...commonProps}>
      <path d="M18,68 Q50,18 82,68" />
      <circle cx="50" cy="40" r="5" fill="currentColor" stroke="none" />
    </g>
  ),
  hermit: (
    <g {...commonProps}>
      <circle cx="50" cy="28" r="9" />
      <line x1="50" y1="10" x2="50" y2="16" />
      <line x1="66" y1="20" x2="61" y2="24" />
      <line x1="34" y1="20" x2="39" y2="24" />
      <line x1="50" y1="42" x2="50" y2="82" />
    </g>
  ),
  wheel_of_fortune: (
    <g {...commonProps}>
      <circle cx="50" cy="50" r="27" />
      <line x1="50" y1="23" x2="50" y2="77" />
      <line x1="23" y1="50" x2="77" y2="50" />
      <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
    </g>
  ),
  justice: (
    <g {...commonProps}>
      <line x1="50" y1="18" x2="50" y2="80" />
      <line x1="24" y1="36" x2="76" y2="36" />
      <line x1="26" y1="36" x2="26" y2="52" />
      <circle cx="26" cy="57" r="6" />
      <line x1="74" y1="36" x2="74" y2="52" />
      <circle cx="74" cy="57" r="6" />
      <line x1="36" y1="80" x2="64" y2="80" />
    </g>
  ),
  hanged_man: (
    <g {...commonProps}>
      <line x1="30" y1="20" x2="70" y2="20" />
      <line x1="50" y1="20" x2="50" y2="62" />
      <line x1="35" y1="48" x2="65" y2="48" />
      <circle cx="50" cy="74" r="9" />
    </g>
  ),
  death: (
    <g {...commonProps}>
      <line x1="15" y1="70" x2="35" y2="70" />
      <path d="M35,70 A15,15 0 1 1 65,70" />
      <line x1="65" y1="70" x2="85" y2="70" />
    </g>
  ),
  temperance: (
    <g {...commonProps}>
      <circle cx="32" cy="60" r="14" />
      <circle cx="68" cy="40" r="14" />
      <path d="M40,50 Q50,34 60,45" />
    </g>
  ),
  devil: (
    <g {...commonProps}>
      <path d="M34,26 L46,42" />
      <path d="M66,26 L54,42" />
      <rect x="34" y="42" width="32" height="33" />
      <circle cx="42" cy="75" r="3" fill="currentColor" stroke="none" />
      <circle cx="58" cy="75" r="3" fill="currentColor" stroke="none" />
      <path d="M42,75 Q50,82 58,75" />
    </g>
  ),
  tower: (
    <g {...commonProps}>
      <path d="M28,12 L44,34 L36,34 L52,16" />
      <rect x="37" y="40" width="26" height="44" />
      <path d="M45,40 L53,60 L48,60 L56,84" />
    </g>
  ),
  star: (
    <g {...commonProps}>
      <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
      <line x1="50" y1="16" x2="50" y2="30" />
      <line x1="50" y1="70" x2="50" y2="84" />
      <line x1="16" y1="50" x2="30" y2="50" />
      <line x1="70" y1="50" x2="84" y2="50" />
      <line x1="27" y1="27" x2="37" y2="37" />
      <line x1="63" y1="63" x2="73" y2="73" />
      <line x1="73" y1="27" x2="63" y2="37" />
      <line x1="37" y1="63" x2="27" y2="73" />
    </g>
  ),
  moon: (
    <g {...commonProps}>
      <path d="M44,24 a18,18 0 1,0 12,0 a13,13 0 1,1 -12,0" />
      <path d="M18,76 Q34,64 50,76 T82,76" />
    </g>
  ),
  sun: (
    <g {...commonProps}>
      <circle cx="50" cy="50" r="16" />
      <line x1="50" y1="12" x2="50" y2="22" />
      <line x1="50" y1="78" x2="50" y2="88" />
      <line x1="12" y1="50" x2="22" y2="50" />
      <line x1="78" y1="50" x2="88" y2="50" />
      <line x1="24" y1="24" x2="31" y2="31" />
      <line x1="69" y1="69" x2="76" y2="76" />
      <line x1="76" y1="24" x2="69" y2="31" />
      <line x1="31" y1="69" x2="24" y2="76" />
    </g>
  ),
  judgement: (
    <g {...commonProps}>
      <path d="M30,58 L56,46 L56,64 L30,64 Z" />
      <line x1="56" y1="55" x2="76" y2="55" />
      <line x1="50" y1="24" x2="50" y2="34" />
      <line x1="38" y1="30" x2="44" y2="38" />
      <line x1="62" y1="30" x2="56" y2="38" />
    </g>
  ),
  world: (
    <g {...commonProps}>
      <circle cx="50" cy="50" r="29" />
      <circle cx="50" cy="50" r="14" />
      <line x1="50" y1="36" x2="50" y2="64" />
      <line x1="36" y1="50" x2="64" y2="50" />
    </g>
  ),
};

export const SUIT_GLYPHS: Record<string, JSX.Element> = {
  Wands: (
    <g {...commonProps}>
      <line x1="30" y1="78" x2="70" y2="22" />
      <line x1="58" y1="30" x2="68" y2="20" />
      <line x1="55" y1="42" x2="43" y2="34" />
    </g>
  ),
  Cups: (
    <g {...commonProps}>
      <path d="M30,28 L30,44 Q30,62 50,62 Q70,62 70,44 L70,28" />
      <line x1="50" y1="62" x2="50" y2="78" />
      <line x1="34" y1="78" x2="66" y2="78" />
    </g>
  ),
  Swords: (
    <g {...commonProps}>
      <path d="M45,18 L50,8 L55,18" />
      <line x1="50" y1="18" x2="50" y2="72" />
      <line x1="37" y1="54" x2="63" y2="54" />
      <line x1="50" y1="72" x2="50" y2="84" />
    </g>
  ),
  Pentacles: (
    <g {...commonProps}>
      <circle cx="50" cy="50" r="26" />
      <polygon points="50,32 54.1,44.3 67.1,44.4 56.7,52.2 60.6,64.6 50,57 39.4,64.6 43.3,52.2 32.9,44.4 45.9,44.3" />
    </g>
  ),
};
