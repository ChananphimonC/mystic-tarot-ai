import axios from "axios";
import type { Category, DailyFortune, Language, ReadingResult, TarotCardMeta } from "../types/tarot";

const client = axios.create({ baseURL: "/api" });

export async function fetchCards(): Promise<TarotCardMeta[]> {
  const { data } = await client.get<TarotCardMeta[]>("/cards");
  return data;
}

export async function shuffleDeck(): Promise<string[]> {
  const { data } = await client.post<string[]>("/shuffle");
  return data;
}

export async function fetchDailyFortune(language: Language): Promise<DailyFortune> {
  const { data } = await client.get<DailyFortune>("/daily-fortune", { params: { language } });
  return data;
}

export async function requestReading(params: {
  question: string;
  category: Category;
  language: Language;
  cardIds: [string, string, string];
}): Promise<ReadingResult> {
  const { data } = await client.post<ReadingResult>("/predict", {
    question: params.question,
    category: params.category,
    language: params.language,
    card_ids: params.cardIds,
  });
  return data;
}
