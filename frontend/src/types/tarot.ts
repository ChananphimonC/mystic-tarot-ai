export type Language = "th" | "en";
export type Category = "love" | "career" | "finance" | "health" | "general";
export type Arcana = "major" | "minor";
export type Suit = "Wands" | "Cups" | "Swords" | "Pentacles";

export interface TarotCardMeta {
  id: string;
  name: string;
  name_th: string;
  arcana: Arcana;
  suit: Suit | null;
}

export interface ReadingResult {
  past: string;
  present: string;
  advice: string;
  summary: string;
  cards: TarotCardMeta[];
}

export type Position = "past" | "present" | "advice";

export interface DailyFortune {
  date: string;
  card: TarotCardMeta;
  message: string;
}
