import { useCallback, useState } from "react";
import { fetchDailyFortune } from "../services/api";
import type { DailyFortune, Language } from "../types/tarot";

/** Each crack draws a genuinely random card from the backend — no caching,
 * since the whole point of a fortune cookie is a fresh draw every time. */
export function useDailyFortune(language: Language) {
  const [fortune, setFortune] = useState<DailyFortune | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setError(false);
    setFortune(null);
    try {
      const result = await fetchDailyFortune(language);
      setFortune(result);
    } catch {
      setError(true);
    }
  }, [language]);

  return { fortune, error, load };
}
