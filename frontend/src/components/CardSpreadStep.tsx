import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TarotCard } from "./TarotCard";
import { Button } from "./ui/Button";
import { GlassCard } from "./ui/GlassCard";
import { HandCursor } from "./HandCursor";
import { fetchCards } from "../services/api";
import { useLanguage } from "../i18n/LanguageContext";
import { useHandTracking } from "../hooks/useHandTracking";
import type { Position, TarotCardMeta } from "../types/tarot";

const POSITIONS: Position[] = ["past", "present", "advice"];
// A plain grid (13 columns × 6 rows = 78) instead of a fanned arc/circle: with
// cards this large, any overlapping layout makes it genuinely ambiguous which
// card the gold hover-glow belongs to. A grid has real gaps between every
// card by construction, so that ambiguity can't happen. Fewer columns on
// small screens keep individual cards from shrinking to illegibility.
const GRID_COLS_RESPONSIVE = "grid-cols-[repeat(5,minmax(0,1fr))] sm:grid-cols-[repeat(8,minmax(0,1fr))] md:grid-cols-[repeat(10,minmax(0,1fr))] lg:grid-cols-[repeat(13,minmax(0,1fr))]";

interface Props {
  onComplete: (cardIds: [string, string, string]) => void;
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function CardSpreadStep({ onComplete }: Props) {
  const { t } = useLanguage();
  const [deck, setDeck] = useState<TarotCardMeta[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [staged, setStaged] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const handTracking = useHandTracking();
  const wasPinchingRef = useRef(false);
  const hoveredCardIdRef = useRef<string | null>(null);

  useEffect(() => {
    fetchCards().then((cards) => setDeck(shuffled(cards)));
  }, []);

  // The hand-tracking cursor acts as a plain virtual mouse: on a pinch's
  // rising edge, click whatever real <button> sits under the fingertip. This
  // needs no per-component wiring — it works for cards, confirm/cancel,
  // shuffle/reset, and the predict button alike, and never replaces mouse/touch.
  // It also drives the same hover-glow state that real mouse hover uses below.
  useEffect(() => {
    if (!handTracking.frame) {
      if (hoveredCardIdRef.current !== null) {
        hoveredCardIdRef.current = null;
        setHoveredCardId(null);
      }
      return;
    }
    const { x, y, pinching } = handTracking.frame;
    const px = x * window.innerWidth;
    const py = y * window.innerHeight;
    const cardId = document.elementFromPoint(px, py)?.closest<HTMLElement>("[data-card-id]")?.dataset.cardId ?? null;
    if (cardId !== hoveredCardIdRef.current) {
      hoveredCardIdRef.current = cardId;
      setHoveredCardId(cardId);
    }

    if (pinching && !wasPinchingRef.current) {
      const target = document.elementFromPoint(px, py)?.closest("button");
      if (target instanceof HTMLButtonElement && !target.disabled) {
        target.click();
      }
    }
    wasPinchingRef.current = pinching;
  }, [handTracking.frame]);

  const unpicked = useMemo(() => deck.filter((c) => !selected.includes(c.id)), [deck, selected]);
  const nextPosition = POSITIONS[selected.length];
  const ready = selected.length === 3;

  function handlePick(id: string) {
    if (selected.length >= 3 || staged) return;
    setStaged(id);
  }

  function handleConfirm() {
    if (!staged) return;
    setSelected((prev) => [...prev, staged]);
    setStaged(null);
  }

  function handleCancel() {
    setStaged(null);
  }

  function handleReturnToDeck(index: number) {
    setSelected((prev) => prev.slice(0, index));
  }

  function handleShuffle() {
    setDeck((prev) => shuffled(prev));
  }

  function handleReset() {
    setSelected([]);
    setDeck((prev) => shuffled(prev));
  }

  function handlePredict() {
    if (ready) onComplete(selected as [string, string, string]);
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10">
      <div className="flex items-center gap-3 rounded-full border border-void-600 bg-void-900/70 px-5 py-2 backdrop-blur-md">
        <span className="text-xs font-semibold tracking-widest text-nebula-300 uppercase">
          {t.alignmentLabel}
        </span>
        <div className="flex items-center gap-1.5">
          {POSITIONS.map((pos, i) => (
            <span key={pos} className="flex items-center gap-1.5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  i < selected.length
                    ? "bg-gold-400 shadow-[0_0_8px_rgba(244,223,166,0.7)]"
                    : "border border-nebula-400/40 bg-void-700"
                }`}
              />
              {i < POSITIONS.length - 1 && <span className="h-px w-4 bg-nebula-400/40" />}
            </span>
          ))}
        </div>
        <span className="text-xs font-semibold text-nebula-300">
          {t.chosenCount(selected.length, unpicked.length)}
        </span>
      </div>

      <div className="max-w-2xl space-y-1 text-center">
        <h1 className="font-display text-4xl text-starlight-50">{t.selectTitle}</h1>
        <p className="font-display text-lg text-nebula-300 italic">{t.selectSubtitle}</p>
        <p className="text-sm text-starlight-300">{t.selectBody}</p>
        <p className="text-xs text-starlight-700">{t.interactionHint}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button
          variant="secondary"
          onClick={handTracking.status === "active" ? handTracking.stop : handTracking.start}
          disabled={handTracking.status === "loading"}
        >
          {handTracking.status === "active" ? t.handTrackingDisable : t.handTrackingEnable}
        </Button>
        <p
          className={
            handTracking.status === "active"
              ? "max-w-md text-center font-display text-xl font-semibold text-gold-300"
              : "max-w-sm text-center text-xs text-starlight-500"
          }
        >
          {handTracking.status === "loading" && t.handTrackingLoading}
          {handTracking.status === "active" && t.handTrackingActive}
          {handTracking.status === "error" && t.handTrackingError}
          {handTracking.status === "idle" && t.handTrackingHint}
        </p>
      </div>

      <GlassCard className="w-full max-w-4xl p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {POSITIONS.map((pos, i) => {
            const filled = i < selected.length;
            const isNext = i === selected.length;
            return (
              <div
                key={pos}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-colors duration-300 ${
                  filled
                    ? "border-gold-500/30 bg-void-800/50"
                    : isNext
                      ? "border-dashed border-nebula-400/50"
                      : "border-void-700/40"
                }`}
              >
                <TarotCard faceUp={false} size="md" />
                <span className="text-center font-display text-sm text-starlight-50">{t.pickPosition[pos]}</span>
                <span className="text-xs tracking-wide text-starlight-500 uppercase">
                  {filled ? t.sealedLabel : isNext ? t.awaitingLabel : ""}
                </span>
                {filled ? (
                  <button
                    type="button"
                    onClick={() => handleReturnToDeck(i)}
                    className="cursor-pointer text-xs text-starlight-500 transition-colors duration-200 hover:text-gold-300"
                  >
                    ✕ {t.returnToDeck}
                  </button>
                ) : (
                  isNext && <span className="text-xs text-starlight-700">{t.awaitingHint}</span>
                )}
              </div>
            );
          })}
        </div>
        {ready && (
          <Button onClick={handlePredict} className="mx-auto mt-6 block">
            {t.predictButton}
          </Button>
        )}
      </GlassCard>

      <div className="flex w-full max-w-4xl flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl text-starlight-50">{t.tableTitle}</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleShuffle}>
            {t.shuffleLabel}
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            {t.resetLabel}
          </Button>
        </div>
      </div>

      <div className={`grid w-full max-w-[1400px] gap-2.5 sm:gap-3 ${GRID_COLS_RESPONSIVE}`}>
        {deck.map((card) => {
          const isSelected = selected.includes(card.id);
          if (isSelected) {
            return <div key={card.id} className="aspect-2/3 rounded-lg border border-dashed border-void-700/25" />;
          }
          const isHovered = hoveredCardId === card.id;
          return (
            <motion.div
              key={card.id}
              layout
              transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
              data-testid="ring-card"
              data-card-id={card.id}
              className="relative"
              style={{ zIndex: isHovered ? 100 : undefined }}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -14 : 0,
                  boxShadow: isHovered
                    ? "0px 0px 25px 5px rgba(255,215,0,0.8)"
                    : "0px 0px 0px 0px rgba(255,215,0,0)",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="rounded-lg"
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId((current) => (current === card.id ? null : current))}
              >
                <TarotCard faceUp={false} showName={false} size="grid" onClick={() => handlePick(card.id)} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {staged && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-void-950/80 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center gap-6 rounded-3xl border border-void-600/60 bg-void-900/90 p-8 shadow-[0_0_40px_-14px_rgba(109,90,168,0.45)] backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <span className="font-display text-lg text-starlight-300">{t.pickPosition[nextPosition]}</span>
              <TarotCard faceUp={false} size="lg" />
              <div className="flex gap-4">
                <Button variant="secondary" onClick={handleCancel}>
                  {t.cancelCard}
                </Button>
                <Button onClick={handleConfirm}>{t.confirmCard}</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always mounted so the video element exists before start() needs it;
          hidden off-screen until tracking is actually loading/active. */}
      <video
        ref={handTracking.videoRef}
        className={`fixed right-4 bottom-4 z-40 w-32 -scale-x-100 rounded-xl border border-gold-500/40 shadow-lg ${
          handTracking.status === "loading" || handTracking.status === "active" ? "block" : "hidden"
        }`}
        playsInline
        muted
      />
      {handTracking.frame && (
        <HandCursor x={handTracking.frame.x} y={handTracking.frame.y} pinching={handTracking.frame.pinching} />
      )}
    </div>
  );
}
