import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TarotCard } from "./TarotCard";
import { Button } from "./ui/Button";
import { useLanguage } from "../i18n/LanguageContext";
import type { Position, ReadingResult } from "../types/tarot";

const POSITIONS: Position[] = ["past", "present", "advice"];
const REVEAL_STEP_MS = 550;

interface Props {
  reading: ReadingResult;
  onAskAgain: () => void;
}

export function ResultStep({ reading, onAskAgain }: Props) {
  const { t } = useLanguage();
  const [revealCount, setRevealCount] = useState(0);
  const texts: Record<Position, string> = {
    past: reading.past,
    present: reading.present,
    advice: reading.advice,
  };

  useEffect(() => {
    if (revealCount >= 3) return;
    const timer = setTimeout(() => setRevealCount((n) => n + 1), REVEAL_STEP_MS);
    return () => clearTimeout(timer);
  }, [revealCount]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 py-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {POSITIONS.map((pos, i) => {
          const revealed = revealCount > i;
          return (
            <div key={pos} className="flex flex-col items-center gap-4 text-center">
              <TarotCard
                card={reading.cards[i]}
                faceUp={revealed}
                animateEntrance
                size="lg"
                positionLabel={t.positionLabels[pos]}
              />
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-64 text-sm leading-relaxed text-starlight-300"
              >
                {texts[pos]}
              </motion.p>
            </div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={revealCount >= 3 ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-xl text-center font-display text-xl text-starlight-50"
      >
        {reading.summary}
      </motion.p>

      <Button onClick={onAskAgain}>{t.askAgain}</Button>
    </div>
  );
}
