"""Tarot deck reference data used as grounding context for the LLM (RAG-lite).

Keeping meanings as short keyword phrases rather than long essays: the LLM
composes the narrative, this module only supplies the grounding facts so the
reading stays anchored to real card symbolism instead of hallucinated meanings.
"""

from typing import TypedDict


class TarotCard(TypedDict):
    id: str
    name: str
    name_th: str
    arcana: str  # "major" | "minor"
    suit: str | None
    upright: str
    reversed: str


MAJOR_ARCANA: list[TarotCard] = [
    {"id": "fool", "name": "The Fool", "name_th": "เดอะฟูล", "arcana": "major", "suit": None,
     "upright": "new beginnings, leap of faith, spontaneity, open-hearted risk",
     "reversed": "recklessness, hesitation, fear of the unknown"},
    {"id": "magician", "name": "The Magician", "name_th": "นักมายากล", "arcana": "major", "suit": None,
     "upright": "willpower, resourcefulness, turning ideas into action",
     "reversed": "manipulation, untapped talent, scattered focus"},
    {"id": "high_priestess", "name": "The High Priestess", "name_th": "นักบวชหญิง", "arcana": "major", "suit": None,
     "upright": "intuition, hidden knowledge, quiet inner knowing",
     "reversed": "secrets surfacing, disconnection from intuition"},
    {"id": "empress", "name": "The Empress", "name_th": "จักรพรรดินี", "arcana": "major", "suit": None,
     "upright": "abundance, nurturing, creativity, growth",
     "reversed": "neglect, creative block, over-dependence"},
    {"id": "emperor", "name": "The Emperor", "name_th": "จักรพรรดิ", "arcana": "major", "suit": None,
     "upright": "structure, authority, discipline, stability",
     "reversed": "rigidity, control issues, loss of authority"},
    {"id": "hierophant", "name": "The Hierophant", "name_th": "นักบวช", "arcana": "major", "suit": None,
     "upright": "tradition, guidance, shared values, learning",
     "reversed": "breaking convention, questioning authority"},
    {"id": "lovers", "name": "The Lovers", "name_th": "คู่รัก", "arcana": "major", "suit": None,
     "upright": "connection, alignment of values, meaningful choice",
     "reversed": "misalignment, imbalance, a difficult choice avoided"},
    {"id": "chariot", "name": "The Chariot", "name_th": "รถศึก", "arcana": "major", "suit": None,
     "upright": "determination, willpower, victory through focus",
     "reversed": "lack of direction, scattered effort, losing control"},
    {"id": "strength", "name": "Strength", "name_th": "ความแข็งแกร่ง", "arcana": "major", "suit": None,
     "upright": "quiet courage, compassion, inner resilience",
     "reversed": "self-doubt, low confidence, forcing control"},
    {"id": "hermit", "name": "The Hermit", "name_th": "ฤๅษี", "arcana": "major", "suit": None,
     "upright": "introspection, solitude, seeking inner truth",
     "reversed": "isolation, avoidance, reluctance to reflect"},
    {"id": "wheel_of_fortune", "name": "Wheel of Fortune", "name_th": "กงล้อแห่งโชคชะตา", "arcana": "major", "suit": None,
     "upright": "cycles, turning points, fate shifting in your favor",
     "reversed": "resistance to change, a setback, bad timing"},
    {"id": "justice", "name": "Justice", "name_th": "ความยุติธรรม", "arcana": "major", "suit": None,
     "upright": "fairness, truth, cause and effect, clarity",
     "reversed": "unfairness, avoiding accountability, imbalance"},
    {"id": "hanged_man", "name": "The Hanged Man", "name_th": "ชายแขวนกลับหัว", "arcana": "major", "suit": None,
     "upright": "surrender, new perspective, productive pause",
     "reversed": "stalling, resistance to letting go, wasted delay"},
    {"id": "death", "name": "Death", "name_th": "ความตาย", "arcana": "major", "suit": None,
     "upright": "transformation, endings that make room for new growth",
     "reversed": "fear of change, clinging to what has already ended"},
    {"id": "temperance", "name": "Temperance", "name_th": "ความพอประมาณ", "arcana": "major", "suit": None,
     "upright": "balance, patience, blending opposites into harmony",
     "reversed": "excess, impatience, imbalance between extremes"},
    {"id": "devil", "name": "The Devil", "name_th": "ปีศาจ", "arcana": "major", "suit": None,
     "upright": "attachment, temptation, facing an uncomfortable truth",
     "reversed": "breaking free, releasing a limiting pattern"},
    {"id": "tower", "name": "The Tower", "name_th": "หอคอย", "arcana": "major", "suit": None,
     "upright": "sudden upheaval, a revelation that breaks old structures",
     "reversed": "avoiding a needed collapse, delayed disruption"},
    {"id": "star", "name": "The Star", "name_th": "ดวงดาว", "arcana": "major", "suit": None,
     "upright": "hope, renewal, quiet faith after hardship",
     "reversed": "discouragement, disconnection from hope"},
    {"id": "moon", "name": "The Moon", "name_th": "ดวงจันทร์", "arcana": "major", "suit": None,
     "upright": "uncertainty, subconscious fears, things not yet clear",
     "reversed": "confusion lifting, facing a hidden fear directly"},
    {"id": "sun", "name": "The Sun", "name_th": "ดวงอาทิตย์", "arcana": "major", "suit": None,
     "upright": "joy, vitality, success, clarity and warmth",
     "reversed": "temporary sadness, delayed joy, low energy"},
    {"id": "judgement", "name": "Judgement", "name_th": "การพิพากษา", "arcana": "major", "suit": None,
     "upright": "reflection, awakening, a call to a higher path",
     "reversed": "self-doubt, ignoring an inner calling"},
    {"id": "world", "name": "The World", "name_th": "โลก", "arcana": "major", "suit": None,
     "upright": "completion, wholeness, a cycle successfully closed",
     "reversed": "unfinished business, delayed closure"},
]

SUITS = {
    "Pentacles": {"name_th": "เหรียญ", "domain": "money, work, health, and material stability"},
    "Cups": {"name_th": "ถ้วย", "domain": "emotion, relationships, and intuition"},
    "Swords": {"name_th": "ดาบ", "domain": "thoughts, conflict, and mental clarity"},
    "Wands": {"name_th": "ไม้เท้า", "domain": "passion, creativity, and career drive"},
}

RANKS: list[tuple[str, str, str, str]] = [
    # (name, name_th, upright_theme, reversed_theme)
    ("Ace", "เอซ", "a fresh spark and new opportunity", "a missed or delayed opportunity"),
    ("Two", "สอง", "balance and a choice between two paths", "imbalance and indecision"),
    ("Three", "สาม", "early growth through collaboration", "misalignment with others"),
    ("Four", "สี่", "stability, and a pause to consolidate", "stagnation or holding on too tightly"),
    ("Five", "ห้า", "conflict, loss, or a needed change", "recovery after a difficult period"),
    ("Six", "หก", "harmony and forward progress", "an old imbalance resurfacing"),
    ("Seven", "เจ็ด", "assessment and patient effort", "impatience or a stalled plan"),
    ("Eight", "แปด", "focused movement and skill-building", "scattered effort or feeling stuck"),
    ("Nine", "เก้า", "near completion and self-reliance", "isolation or overextension"),
    ("Ten", "สิบ", "culmination and lasting outcome", "an ending that overstays its welcome"),
    ("Page", "เด็ก", "a curious beginner and a new message", "immaturity or unheeded news"),
    ("Knight", "อัศวิน", "active pursuit and momentum", "impulsiveness or misdirected energy"),
    ("Queen", "ราชินี", "nurturing mastery and inner confidence", "insecurity or smothering care"),
    ("King", "ราชา", "authoritative mastery and steady leadership", "control issues or poor judgment"),
]


def _build_minor_arcana() -> list[TarotCard]:
    cards: list[TarotCard] = []
    for suit, meta in SUITS.items():
        for rank_name, rank_th, upright_theme, reversed_theme in RANKS:
            cards.append({
                "id": f"{rank_name.lower()}_of_{suit.lower()}",
                "name": f"{rank_name} of {suit}",
                "name_th": f"{rank_th}{meta['name_th']}",
                "arcana": "minor",
                "suit": suit,
                "upright": f"{upright_theme}, expressed through {meta['domain']}",
                "reversed": f"{reversed_theme}, around {meta['domain']}",
            })
    return cards


MINOR_ARCANA: list[TarotCard] = _build_minor_arcana()

FULL_DECK: list[TarotCard] = MAJOR_ARCANA + MINOR_ARCANA
CARDS_BY_ID: dict[str, TarotCard] = {card["id"]: card for card in FULL_DECK}

assert len(FULL_DECK) == 78
