from typing import Literal

from pydantic import BaseModel, Field

Language = Literal["th", "en"]
Category = Literal["love", "career", "finance", "health", "general"]
Position = Literal["past", "present", "advice"]


class CardDrawResponse(BaseModel):
    id: str
    name: str
    name_th: str
    arcana: Literal["major", "minor"]
    suit: str | None


class ReadingRequest(BaseModel):
    question: str = Field(default="", max_length=500)
    category: Category = "general"
    language: Language = "th"
    card_ids: list[str] = Field(min_length=3, max_length=3)


class ReadingResponse(BaseModel):
    past: str
    present: str
    advice: str
    summary: str
    cards: list[CardDrawResponse]


class DailyFortuneResponse(BaseModel):
    date: str
    card: CardDrawResponse
    message: str
