import { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { QuestionStep } from "./components/QuestionStep";
import { CardSpreadStep } from "./components/CardSpreadStep";
import { ResultStep } from "./components/ResultStep";
import { DailyFortuneStep } from "./components/DailyFortuneStep";
import { LanguageToggle } from "./components/LanguageToggle";
import { StarParticles } from "./components/StarParticles";
import { Button } from "./components/ui/Button";
import { Chip } from "./components/ui/Chip";
import { useLanguage } from "./i18n/LanguageContext";
import { requestReading } from "./services/api";
import type { Category, ReadingResult } from "./types/tarot";

type Step = "question" | "select" | "loading" | "result" | "error" | "daily";
type ErrorKind = "generic" | "rateLimited";

export default function App() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<Step>("question");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<Category>("general");
  const [reading, setReading] = useState<ReadingResult | null>(null);
  const [pendingCardIds, setPendingCardIds] = useState<[string, string, string] | null>(null);
  const [errorKind, setErrorKind] = useState<ErrorKind>("generic");

  function handleBegin(q: string, cat: Category) {
    setQuestion(q);
    setCategory(cat);
    setStep("select");
  }

  async function runReading(cardIds: [string, string, string]) {
    setPendingCardIds(cardIds);
    setStep("loading");
    try {
      const result = await requestReading({ question, category, language, cardIds });
      setReading(result);
      setStep("result");
    } catch (err) {
      setErrorKind(axios.isAxiosError(err) && err.response?.status === 429 ? "rateLimited" : "generic");
      setStep("error");
    }
  }

  function handleAskAgain() {
    setReading(null);
    setPendingCardIds(null);
    setStep("question");
  }

  function handleRetry() {
    if (pendingCardIds) {
      runReading(pendingCardIds);
    } else {
      setStep("select");
    }
  }

  function handleBack() {
    if (step === "result") {
      handleAskAgain();
    } else {
      setStep("question");
    }
  }

  const canGoBack = step !== "question" && step !== "loading";

  return (
    <div className="relative min-h-screen">
      <StarParticles />

      <div className="relative z-10">
        <header className="flex items-center gap-3 px-6 py-4">
          <button
            type="button"
            onClick={handleBack}
            aria-label={t.backArrow}
            className={`cursor-pointer rounded-full border border-void-600 p-2 text-starlight-300 transition-all duration-200 hover:border-gold-500/60 hover:text-gold-300 ${
              canGoBack ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-display text-xl text-gold-300">{t.brand}</span>
          <nav className="ml-auto flex items-center gap-2">
            <Chip active={step === "daily"} onClick={() => setStep("daily")}>
              ✦ {t.dailyFortuneNav}
            </Chip>
            <LanguageToggle />
          </nav>
        </header>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {step === "question" && <QuestionStep onBegin={handleBegin} />}
              {step === "daily" && <DailyFortuneStep onBack={() => setStep("question")} />}
              {step === "select" && <CardSpreadStep onComplete={runReading} />}
              {step === "loading" && (
                <div className="flex min-h-[50vh] items-center justify-center">
                  <p className="font-display text-xl text-starlight-300">{t.revealing}</p>
                </div>
              )}
              {step === "result" && reading && <ResultStep reading={reading} onAskAgain={handleAskAgain} />}
              {step === "error" && (
                <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
                  <p className="font-display text-xl text-starlight-50">{t.errorTitle}</p>
                  <p className="max-w-md text-starlight-300">
                    {errorKind === "rateLimited" ? t.errorRateLimitedBody : t.errorBody}
                  </p>
                  <Button onClick={handleRetry}>{t.retry}</Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
