import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { strings, type Strings } from "./strings";
import type { Language } from "../types/tarot";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Strings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "opentarot.language";

function readStoredLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "th";
  } catch {
    return "th";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* per-viewer convenience only */
    }
  };

  const value = useMemo(() => ({ language, setLanguage, t: strings[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
