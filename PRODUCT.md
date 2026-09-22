# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the developer, using StarWhisper as a portfolio piece to demonstrate AI/ML engineering skills (prompt engineering, RAG-lite grounding, computer-vision integration, clean architecture) to hiring managers and interviewers for AI/ML engineer roles.

Secondary (the actual end users the demo is built to satisfy): Thai- and English-speaking people curious about tarot readings, using the app for entertainment and self-reflection. Bilingual TH/EN throughout.

## Product Purpose

A portfolio-first web application that is also a genuinely usable 3-card tarot reading and daily-fortune-cookie experience. Success is a project a hiring manager can open, actually use end-to-end, and come away convinced of the developer's prompt-engineering, RAG-lite, computer-vision (hand tracking), and clean-architecture craft — not user growth, retention, or revenue metrics.

## Positioning

Two co-equal differentiators vs. a generic tarot/horoscope app (confirmed as equally important, not one primary and one secondary):

1. **Real-time hand-tracking card selection** (MediaPipe `HandLandmarker`, pinch gesture) as a genuine alternative input method alongside mouse/touch — fully functional, opt-in, never the only way to select a card.
2. **AI interpretation genuinely grounded per drawn card** — each of the 78 cards carries its own upright/reversed keyword data used as LLM context, so the reading changes with which card was actually drawn, rather than generic templated horoscope text.

## Operating Context

- Bilingual TH/EN toggle available on every screen.
- Primarily shown live during interviews or linked from a resume/GitHub rather than run at public scale — not yet hardened for that.
- No accounts or login; all state is client-local (localStorage) or ephemeral per session.

## Capabilities and Constraints

- Frontend: React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion.
- Backend: Python 3.11 + FastAPI + LangChain + `langchain-google-genai` (Gemini) — deliberately **not** Next.js/TypeScript API routes. The Python/LangChain backend is itself a stated skill-demonstration goal for AI/ML engineer applications and must not be replaced or bypassed.
- A 78-card tarot dataset with structured upright/reversed keyword meanings per card (procedurally generated constellation-style SVG art) is used as RAG-lite grounding context for the LLM. No vector database — the dataset is small and static enough that one would be over-engineering.
- Hand tracking is opt-in only, requires an explicit camera-permission action, is dynamically `import()`ed (not in the main JS bundle), and must never be the sole way to select a card — mouse and touch always work.
- No user accounts, database, or payments — explicitly deferred; see `PRD.md` for the phased roadmap.
- No question quota or rate limiting on the product side (explicitly removed by request). The only real limit is Gemini's own API rate limit, surfaced to the user as a friendly "the stars are busy" message, never a raw technical error.
- Original card art only — never reproduce Rider-Waite-Smith or other copyrighted tarot deck artwork. Card faces are procedurally generated (hand-authored line glyphs + deterministic per-card starfield); the fortune-cookie art uses a user-supplied PNG asset.
- Never claim a capability the app doesn't actually have — e.g. a "hand tracking active" badge must not appear unless hand tracking is genuinely running. This was an explicit correction during development and is a durable constraint on future copy/UI.

## Brand Commitments

- Name: **StarWhisper** (final; earlier working names "OpenTarot" and "Mystic Tarot AI" are retired).
- Visual identity: dreamy, cosmic, premium — deep indigo-violet space tones (`void-*` tokens) with a single warm-gold hero accent (`gold-*`) and moonlight-white text (`starlight-*`). Explicitly avoids the generic dark-SaaS look, horror/occult imagery, and the "AI purple-pink gradient" cliché.
- Typography: Cormorant Garamond (display serif — logo, headings, and card names only) + Plus Jakarta Sans / Noto Sans Thai (body/UI, both languages). This pairing is confirmed and binding.

## Evidence on Hand

- One real image asset supplied by the user: `frontend/src/assets/fortune-cookie.png` (an illustrated, non-photorealistic fortune-cookie graphic), used as the source art for the fortune-cookie feature.
- No real user testimonials, usage data, or press exist; none should be fabricated.
- `PRD.md` at the repo root predates this file and remains the engineering/architecture reference (tech stack, directory layout, feature-by-feature rationale); this file is the product-truth record going forward.

## Product Principles

1. **Real capability only** — never show UI copy or a status badge implying a feature works when it doesn't.
2. **Portfolio-grade craft over feature breadth** — depth and correctness of the AI/prompt-engineering and hand-tracking implementation matter more than adding more screens or features.
3. **Original art, always** — no Rider-Waite-Smith or other copyrighted tarot artwork; card faces stay procedurally generated or explicitly user-supplied assets.
4. **Every input method stands alone** — hand tracking is additive; mouse and touch must always fully work without it.
5. **No dead code, no fake gating** — when a mechanism (quota, deterministic daily-card caching) turns out to be wrong or unwanted, remove it entirely rather than disabling it in place.

## Accessibility & Inclusion

No formal standard (e.g. a specific WCAG level) has been set. Existing groundwork: focus-visible outlines on interactive elements, `prefers-reduced-motion` respected for ambient/decorative animation, and hand tracking is strictly opt-in with mouse/touch always available as a fallback.
