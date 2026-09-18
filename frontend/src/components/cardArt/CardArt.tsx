import { useMemo } from "react";
import { MAJOR_GLYPHS, SUIT_GLYPHS } from "./glyphs";
import { createSeededRandom } from "../../utils/seededRandom";
import { rankBadge, toRomanNumeral } from "../../utils/cardDisplay";
import { MAJOR_ARCANA_ORDER } from "../../data/majorArcanaOrder";
import type { TarotCardMeta } from "../../types/tarot";

interface Props {
  card: TarotCardMeta;
}

function useConstellation(seed: string, count: number) {
  return useMemo(() => {
    const rand = createSeededRandom(seed);
    return Array.from({ length: count }, () => ({
      x: 6 + rand() * 88,
      y: 6 + rand() * 88,
      r: 0.5 + rand() * 1,
    }));
  }, [seed, count]);
}

/** Procedurally generated card-face art: a deterministic starfield (unique per
 * card id) behind a hand-authored glyph, so all 78 cards feel like one family
 * without needing 78 hand-illustrated images. */
export function CardArt({ card }: Props) {
  const stars = useConstellation(card.id, 16);
  const glyph = card.arcana === "major" ? MAJOR_GLYPHS[card.id] : SUIT_GLYPHS[card.suit ?? ""];
  const badge = card.arcana === "major" ? toRomanNumeral(MAJOR_ARCANA_ORDER[card.id] ?? 0) : rankBadge(card.name);

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <radialGradient id={`bg-${card.id}`} cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#1c2150" />
          <stop offset="100%" stopColor="#0b1026" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="98" height="98" rx="8" fill={`url(#bg-${card.id})`} />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f8e8c0" opacity={0.5} />
      ))}
      <g transform="translate(18,20) scale(0.64)" style={{ color: "#f8e8c0" }}>
        {glyph}
      </g>
      <circle cx="14" cy="14" r="8" fill="none" stroke="#b99a55" strokeWidth="1.2" />
      <text x="14" y="17.5" fontSize="8" textAnchor="middle" fill="#f8e8c0" fontFamily="Cormorant Garamond, serif">
        {badge}
      </text>
    </svg>
  );
}
