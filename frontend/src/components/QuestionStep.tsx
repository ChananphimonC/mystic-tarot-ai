import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Button } from "./ui/Button";
import { GlassCard } from "./ui/GlassCard";
import { TopicPill } from "./ui/TopicPill";
import { CATEGORY_ICONS } from "./ui/categoryIcons";
import { FloatingDeckPreview } from "./FloatingDeckPreview";
import type { Category } from "../types/tarot";

interface Props {
  onBegin: (question: string, category: Category) => void;
}

const CATEGORY_KEYS: Category[] = ["love", "career", "finance", "health", "general"];

export function QuestionStep({ onBegin }: Props) {
  const { t } = useLanguage();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<Category>("general");

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16">
      <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
        <h1 className="font-display text-5xl text-starlight-50">{t.brand} ✦</h1>
        <p className="font-display text-xl text-nebula-300">{t.tagline}</p>
        <div className="my-2 flex items-center gap-3 text-starlight-500">
          <span className="h-px w-14 bg-gradient-to-r from-transparent via-nebula-400/50 to-transparent" />
          <span className="text-xs tracking-[0.3em]">✧ ✦ ✧</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent via-nebula-400/50 to-transparent" />
        </div>
        <p className="text-starlight-300">{t.questionIntro}</p>
      </div>

      <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="hidden justify-center lg:col-span-5 lg:flex">
          <FloatingDeckPreview />
        </div>

        <GlassCard className="w-full space-y-6 p-6 text-left sm:p-8 lg:col-span-7">
          <div className="space-y-3">
            <label htmlFor="question" className="block text-sm text-starlight-300">
              {t.questionLabel}
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, 500))}
              placeholder={t.questionPlaceholder}
              rows={3}
              className="w-full rounded-xl border border-void-600 bg-void-950/60 p-4 text-base text-starlight-50 outline-none placeholder:text-starlight-700 focus:border-gold-500"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm text-starlight-300">{t.categoryLabel}</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CATEGORY_KEYS.map((key) => (
                <TopicPill
                  key={key}
                  active={category === key}
                  icon={CATEGORY_ICONS[key]}
                  title={t.categories[key]}
                  subtitle={t.categorySubtitles[key]}
                  onClick={() => setCategory(key)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-2 text-center">
            <Button onClick={() => onBegin(question.trim(), category)} className="w-full sm:w-4/5">
              {t.begin}
            </Button>
            <p className="max-w-sm text-xs text-starlight-700">{t.reassurance}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
