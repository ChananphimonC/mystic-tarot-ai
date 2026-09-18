from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel, Field

from app.core.config import settings
from app.data.tarot_cards import CARDS_BY_ID, TarotCard

CATEGORY_LABELS = {
    "love": {"th": "ความรัก", "en": "Love"},
    "career": {"th": "การงาน", "en": "Career"},
    "finance": {"th": "การเงิน", "en": "Finance"},
    "health": {"th": "สุขภาพ", "en": "Health"},
    "general": {"th": "ภาพรวมชีวิต", "en": "General life"},
}

_SYSTEM_PROMPT = """You are StarWhisper, a warm and emotionally grounded tarot reader.
You write mystical but clear readings that feel personal and healing, never fatalistic
or frightening even when a card carries a hard theme. Speak directly to the querent
("you"), in {language_name}. Ground every sentence in the given card meanings — do not
invent symbolism that isn't listed. Keep each field to 2-3 sentences."""

_HUMAN_PROMPT = """Question from the querent: {question}
Topic: {category}

Cards drawn (in position order):
1. Past — {past_card_name}: upright meaning "{past_card_meaning}"
2. Present — {present_card_name}: upright meaning "{present_card_meaning}"
3. Advice — {advice_card_name}: upright meaning "{advice_card_meaning}"

Write the reading as three short passages (past, present, advice) plus a one-sentence
overall summary that ties them together and answers the question with encouragement."""


class _StructuredReading(BaseModel):
    past: str = Field(description="Interpretation of the Past card in context of the question")
    present: str = Field(description="Interpretation of the Present card in context of the question")
    advice: str = Field(description="Interpretation of the Advice/Future card, framed as guidance")
    summary: str = Field(description="One encouraging sentence tying the three cards together")


_DAILY_SYSTEM_PROMPT = """You are StarWhisper, a warm and emotionally grounded tarot reader.
Write a short daily fortune in {language_name}, 2-3 sentences, gentle and encouraging even
when the card's theme is difficult. Ground it in the given card meaning only."""

_DAILY_HUMAN_PROMPT = """Today's card: {card_name}
Upright meaning: "{card_meaning}"

Write today's fortune as a short, warm message for whoever draws this card today."""


class _DailyFortune(BaseModel):
    message: str = Field(description="A short, warm daily fortune grounded in the card's meaning")


def _get_llm():
    return ChatGoogleGenerativeAI(
        model=settings.gemini_model,
        google_api_key=settings.google_api_key,
        temperature=0.8,
    )


def _card_or_raise(card_id: str) -> TarotCard:
    card = CARDS_BY_ID.get(card_id)
    if card is None:
        raise ValueError(f"Unknown card id: {card_id}")
    return card


async def generate_reading(
    question: str,
    category: str,
    language: str,
    card_ids: list[str],
) -> _StructuredReading:
    past_card, present_card, advice_card = (_card_or_raise(cid) for cid in card_ids)
    language_name = "Thai" if language == "th" else "English"
    category_label = CATEGORY_LABELS.get(category, CATEGORY_LABELS["general"])[language]

    prompt = ChatPromptTemplate.from_messages([
        ("system", _SYSTEM_PROMPT),
        ("human", _HUMAN_PROMPT),
    ])
    llm = _get_llm().with_structured_output(_StructuredReading)
    chain = prompt | llm

    return await chain.ainvoke({
        "language_name": language_name,
        "question": question or "(no specific question — a general reading)",
        "category": category_label,
        "past_card_name": past_card["name"],
        "past_card_meaning": past_card["upright"],
        "present_card_name": present_card["name"],
        "present_card_meaning": present_card["upright"],
        "advice_card_name": advice_card["name"],
        "advice_card_meaning": advice_card["upright"],
    })


async def generate_daily_fortune(card_id: str, language: str) -> str:
    card = _card_or_raise(card_id)
    language_name = "Thai" if language == "th" else "English"

    prompt = ChatPromptTemplate.from_messages([
        ("system", _DAILY_SYSTEM_PROMPT),
        ("human", _DAILY_HUMAN_PROMPT),
    ])
    llm = _get_llm().with_structured_output(_DailyFortune)
    chain = prompt | llm

    result = await chain.ainvoke({
        "language_name": language_name,
        "card_name": card["name"],
        "card_meaning": card["upright"],
    })
    return result.message
