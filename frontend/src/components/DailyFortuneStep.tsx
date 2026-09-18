import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CookieArt } from "./cardArt/CookieArt";
import { JarArt } from "./cardArt/JarArt";
import { Button } from "./ui/Button";
import { useLanguage } from "../i18n/LanguageContext";
import { useDailyFortune } from "../hooks/useDailyFortune";

type Phase = "jarred" | "idle" | "shaking" | "revealed" | "error";
const MIN_SHAKE_MS = 900;

interface Props {
  onBack: () => void;
}

export function DailyFortuneStep({ onBack }: Props) {
  const { t, language } = useLanguage();
  const { fortune, error, load } = useDailyFortune(language);
  const [phase, setPhase] = useState<Phase>("jarred");
  const [copied, setCopied] = useState(false);
  const tapTimeRef = useRef(0);

  function handleTap() {
    if (phase !== "idle") return;
    tapTimeRef.current = Date.now();
    setPhase("shaking");
    load();
  }

  useEffect(() => {
    if (phase !== "shaking" || (!fortune && !error)) return;
    const elapsed = Date.now() - tapTimeRef.current;
    const timer = setTimeout(() => setPhase(error ? "error" : "revealed"), Math.max(0, MIN_SHAKE_MS - elapsed));
    return () => clearTimeout(timer);
  }, [phase, fortune, error]);

  async function handleCopy() {
    if (!fortune) return;
    try {
      await navigator.clipboard.writeText(fortune.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable in this context; no fallback needed */
    }
  }

  const cardName = fortune ? (language === "th" ? fortune.card.name_th : fortune.card.name) : "";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-16 text-center">
      <h1 className="font-display text-4xl text-starlight-50">{t.dailyFortuneTitle}</h1>

      {phase === "jarred" && (
        <>
          <div className="h-56 w-56">
            <JarArt />
          </div>
          <p className="text-starlight-300">{t.jarInstruction}</p>
          <Button onClick={() => setPhase("idle")}>{t.takeCookieButton}</Button>
        </>
      )}

      {phase !== "jarred" && (
        <motion.div
          initial={{ y: 60, scale: 0.4, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.55, duration: 0.9 }}
          className="flex flex-col items-center gap-6"
        >
          {phase !== "revealed" && (
            <>
              <motion.button
                type="button"
                onClick={handleTap}
                disabled={phase !== "idle"}
                aria-label={t.dailyFortuneInstruction}
                className={`h-48 w-48 ${phase === "idle" ? "cursor-pointer" : "cursor-default"}`}
                animate={phase === "idle" ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{ duration: 6, repeat: phase === "idle" ? Infinity : 0, ease: "easeInOut" }}
              >
                <CookieArt state={phase === "shaking" ? "shaking" : "idle"} />
              </motion.button>

              <div className="flex flex-col items-center gap-1">
                <p className="flex items-center gap-2 font-display text-lg text-gold-300">
                  <span className="animate-pulse">✧</span>
                  {phase === "shaking" ? t.dailyFortuneLoading : t.dailyFortuneInstruction}
                  <span className="animate-pulse">✧</span>
                </p>
                {phase === "idle" && <p className="text-sm text-starlight-500 italic">{t.dailyFortuneSubtext}</p>}
              </div>

              {phase === "idle" && <Button onClick={handleTap}>{t.revealFortuneButton}</Button>}
            </>
          )}

          {phase === "error" && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-starlight-300">{t.errorBody}</p>
              <Button onClick={() => setPhase("idle")}>{t.retry}</Button>
            </div>
          )}

          {phase === "revealed" && fortune && (
            <div className="w-full max-w-lg">
              <div className="relative w-full rounded-2xl bg-[#f6f0e6] p-6 text-[#2a2136] shadow-[0_24px_50px_-10px_rgba(0,0,0,0.6),0_0_35px_rgba(244,223,166,0.25)] sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-transparent via-[#b99a55]/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1.5 rounded-b-2xl bg-gradient-to-r from-transparent via-[#b99a55]/50 to-transparent" />

                <div className="mb-4 flex items-center justify-between border-b border-[#b99a55]/25 pb-3 text-xs tracking-widest text-[#6d5aa8] uppercase">
                  <span>✦ {t.brand}</span>
                  <span>{fortune.date}</span>
                </div>

                <p className="font-display text-2xl leading-snug text-[#2a2136]">{fortune.message}</p>

                <div className="my-5 flex items-center justify-center gap-3">
                  <span className="h-px flex-1 bg-[#b99a55]/30" />
                  <span className="h-2 w-2 rotate-45 bg-[#6d5aa8]" />
                  <span className="h-px flex-1 bg-[#b99a55]/30" />
                </div>

                <p className="text-sm font-semibold text-[#3b2f4a]">
                  {t.fromCardLabel}: <span className="font-display text-base">{cardName}</span>
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button variant="secondary" onClick={handleCopy}>
                  {copied ? t.copiedFortune : t.copyFortune}
                </Button>
                <Button variant="secondary" onClick={() => setPhase("idle")}>
                  {t.resetRitual}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      <Button variant="ghost" onClick={onBack}>
        {t.backToQuestion}
      </Button>
    </div>
  );
}
