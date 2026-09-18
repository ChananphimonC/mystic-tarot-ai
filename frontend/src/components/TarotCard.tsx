import { motion } from "framer-motion";
import { CardArt } from "./cardArt/CardArt";
import { CardBack } from "./cardArt/CardBack";
import { useLanguage } from "../i18n/LanguageContext";
import type { TarotCardMeta } from "../types/tarot";

interface Props {
  card?: TarotCardMeta;
  faceUp: boolean;
  onClick?: () => void;
  disabled?: boolean;
  positionLabel?: string;
  showName?: boolean;
  size?: "sm" | "md" | "lg" | "grid";
  /** Animate the flip transition on mount instead of snapping straight to
   * `faceUp`'s target state — used for the sequential reveal on the result screen. */
  animateEntrance?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<Props["size"]>, string> = {
  sm: "w-16 h-24",
  md: "w-24 h-36",
  lg: "w-36 h-52",
  grid: "w-full aspect-2/3",
};

export function TarotCard({
  card,
  faceUp,
  onClick,
  disabled,
  positionLabel,
  showName = true,
  size = "md",
  animateEntrance = false,
}: Props) {
  const { language } = useLanguage();
  const label = card ? (language === "th" ? card.name_th : card.name) : "";
  const interactive = Boolean(onClick) && !disabled;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={!interactive}
        className={`${SIZE_CLASSES[size]} shrink-0 rounded-lg [perspective:1000px] transition-shadow duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${
          interactive ? "cursor-pointer" : "cursor-default"
        } ${faceUp && card ? "shadow-[0_0_28px_-6px_rgba(244,223,166,0.55)]" : ""}`}
        aria-label={label || "Tarot card, face down"}
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          initial={animateEntrance ? { rotateY: 0 } : false}
          animate={{ rotateY: faceUp ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="pointer-events-none absolute inset-0 [backface-visibility:hidden]">
            <CardBack />
          </div>
          <div className="pointer-events-none absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {card && <CardArt card={card} />}
          </div>
        </motion.div>
      </button>
      {positionLabel && (
        <span className="font-display text-sm tracking-wide text-starlight-300">{positionLabel}</span>
      )}
      {showName && faceUp && card && (
        <span className="font-display text-base text-starlight-50">{label}</span>
      )}
    </div>
  );
}
