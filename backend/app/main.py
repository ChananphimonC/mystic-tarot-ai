import random
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.exceptions import LangChainException, ModelRateLimitError

from app.core.config import settings
from app.data.tarot_cards import FULL_DECK, CARDS_BY_ID
from app.models.schemas import CardDrawResponse, DailyFortuneResponse, ReadingRequest, ReadingResponse
from app.services.llm_service import generate_daily_fortune, generate_reading

app = FastAPI(title="StarWhisper API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/cards")
def list_cards() -> list[CardDrawResponse]:
    return [CardDrawResponse(**card) for card in FULL_DECK]


@app.post("/api/shuffle")
def shuffle_deck() -> list[str]:
    """Returns all 78 card ids in a random order for the frontend to lay out face-down."""
    ids = [card["id"] for card in FULL_DECK]
    random.shuffle(ids)
    return ids


@app.get("/api/daily-fortune", response_model=DailyFortuneResponse)
async def daily_fortune(language: Literal["th", "en"] = "th") -> DailyFortuneResponse:
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    card = CardDrawResponse(**random.choice(FULL_DECK))

    try:
        message = await generate_daily_fortune(card_id=card.id, language=language)
    except ModelRateLimitError as exc:
        raise HTTPException(status_code=429, detail="rate_limited") from exc
    except LangChainException as exc:
        raise HTTPException(status_code=502, detail="llm_unavailable") from exc

    return DailyFortuneResponse(date=date_str, card=card, message=message)


@app.post("/api/predict", response_model=ReadingResponse)
async def predict(payload: ReadingRequest) -> ReadingResponse:
    unknown = [cid for cid in payload.card_ids if cid not in CARDS_BY_ID]
    if unknown:
        raise HTTPException(status_code=400, detail=f"Unknown card id(s): {unknown}")
    if len(set(payload.card_ids)) != 3:
        raise HTTPException(status_code=400, detail="card_ids must contain 3 distinct cards")

    try:
        reading = await generate_reading(
            question=payload.question,
            category=payload.category,
            language=payload.language,
            card_ids=payload.card_ids,
        )
    except ModelRateLimitError as exc:
        raise HTTPException(status_code=429, detail="rate_limited") from exc
    except LangChainException as exc:
        raise HTTPException(status_code=502, detail="llm_unavailable") from exc

    return ReadingResponse(
        past=reading.past,
        present=reading.present,
        advice=reading.advice,
        summary=reading.summary,
        cards=[CardDrawResponse(**CARDS_BY_ID[cid]) for cid in payload.card_ids],
    )
