# Product Requirements Document (PRD): StarWhisper

## 1. Project Overview
StarWhisper is a modern, dreamy cosmic web application that provides personalized 3-card tarot readings using Generative AI. It features real-time hand tracking for card selection, multi-language support (TH/EN), and no artificial usage limits. Visual identity: "mystical + dreamy + cosmic + cute + modern + premium" — deep indigo/violet space tones with warm gold and moonlight-white accents, never a generic dark-SaaS or horror-occult look.

## 1.1 Phased Scope
- **Phase 1 (current):** Core AI reading flow — question input, category shortcuts, click-based 3-card selection (Past/Present/Advice) across a full-screen arc spread, Gemini-generated interpretation. **No question quota** — removed per explicit product decision; ask as many times as you like. Also includes a **fortune cookie**: each crack draws a genuinely random card (not cached, not deterministic — a fresh draw every time, matching how a real fortune cookie works) with a short Gemini-generated message grounded in that card's meaning. No accounts/DB yet.
- **Phase 2 (hand tracking done; accounts still pending):** Hand-tracking card selection via MediaPipe is implemented — see 3.5 below. PostgreSQL-backed accounts & subscriptions, heart-card bonus draw for subscribers are still not built.
- **Phase 3:** Gachapon-style daily fortune presentation, reading history with RAG-based recall (pgvector).

**Explicitly deferred** (from the full StarWhisper UX brief, until Phase 2's accounts/DB land): separate routed pages for Home/History/Profile/Premium/Subscription — building them now would just be empty shells with no real data behind them. Also deferred: the `locales/en|th` file-per-language i18n structure (current `src/i18n/strings.ts` single-file dictionary is fine at this size; revisit if it grows unwieldy).

## 2. Tech Stack & Architecture
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Framer Motion, @mediapipe/tasks-vision, Axios
- **Backend:** Python 3.10+, FastAPI, LangChain, langchain-google-genai, Pydantic
- **Database & State:** PostgreSQL (for users, questions quota, and subscriptions)
- **Architecture:** Clean Architecture separating `/frontend` and `/backend` clearly. Deliberately **not** Next.js — the Python/LangChain backend is a stated learning goal, so all AI logic stays server-side in FastAPI rather than moving to TypeScript API routes.

### 2.1 Design System
- **Tokens** (`src/index.css` `@theme`): `void-*` (deep indigo/violet surfaces, #0b1026→#443677), `gold-*` (the one hero accent, #f8e8c0→#b99a55), `nebula-*` (lavender/violet secondary, used sparingly), `starlight-*` (moonlight text tones). Card art SVGs mirror these as literal hex (SVG attrs don't reliably inherit CSS vars), so any palette change must update both `index.css` and `src/components/cardArt/*.tsx`.
- **Fonts:** Cormorant Garamond (display serif — logo, headings, card names only) + Plus Jakarta Sans / Noto Sans Thai (body/UI, both languages).
- **UI primitives** (`src/components/ui/`): `Button` (primary/secondary/ghost), `Chip`, `GlassCard` — kept intentionally small. Not building the full spec's component list (Toast, Skeleton, BottomSheet, Avatar, Navbar, Tooltip, …) until a screen actually needs that interaction pattern; unused primitives are dead code.
- **Ambient background:** `StarParticles` — a single fixed, subtle twinkling starfield mounted once in `App.tsx`, respects `prefers-reduced-motion`.

## 3. Core Features & User Flow
1. **Landing & Tarot Room:** Dark galaxy theme UI, allowing users to type a question or pick a category (Love, Career, Finance, Health).
2. **Card Selection (78 Tarot Cards):** All 78 cards face-down in a plain grid — 13 columns × 6 rows on desktop, fewer columns on narrower screens (see 3.5) — not an arc or circle. Tapping a card stages it for confirm/cancel; confirming places it (still face-down) into the Past/Present/Advice slot and leaves a stable empty (dashed-outline) slot in the grid, so the remaining cards never reflow/shift position mid-selection. Card identity and meaning stay hidden until the reading is generated — no peeking before the final "ทำนาย" (reveal) action.
3. **AI Interpretation Service:** 
   - Backend receives the user's question and the list of 3 chosen cards.
   - Uses LangChain with Gemini (`gemini-flash-latest`) to generate a mystical, healing, and structured reading in Thai or English.
4. **No usage quota:** removed by explicit request — every screen that used to check/display/consume a daily quota (`App.tsx`, `QuestionStep`, `ResultStep`) has that logic stripped out entirely; `useQuota.ts` was deleted rather than left as dead code.
5. **Hand tracking (card selection screen only):** Opt-in via a toggle button — camera permission is never requested automatically. `src/lib/handTracking/HandTrackingService.ts` wraps MediaPipe's `HandLandmarker` (WASM + model fetched from CDN, and the `@mediapipe/tasks-vision` JS itself dynamically `import()`ed — see `useHandTracking.ts` — so the ~145KB it adds is only downloaded by users who actually enable it, never bundled into the main chunk). Raw per-frame coordinates are LERP-smoothed (`useHandTracking.ts`, factor 0.3) before becoming the `HandCursor` position, so the cursor glides instead of jittering. Pinch (thumb tip ↔ index tip landmark distance < 0.04 normalized) acts as a generic virtual click via `document.elementFromPoint(...).closest("button")?.click()` — this is why it works on cards, confirm/cancel, shuffle/reset, and predict with zero per-component wiring. Hovering (from either the hand cursor or a real mouse) scales the card under it up, lifts it, boosts its `z-index`, and shows a strong gold glow — deliberately large and unmissable, including the on-screen instruction text (`text-xl font-semibold`), since a small hint is easy to miss when you're staring at your own hand instead of the screen. Mouse and touch are never disabled and keep working exactly as before.
6. **Back navigation:** a back arrow in the header (reserves its layout space always; just fades to `opacity-0`/`pointer-events-none` on the root question screen so nothing shifts) returns to the question screen from anywhere. Step transitions animate via `AnimatePresence` in `App.tsx` (slide + fade, 0.35s).

### 3.5 Why a grid, not an arc or circle
78 cards at a meaningfully larger size (up to `8rem`/128px wide) were first tried as a fanned arc, then a full circle — both put cards close enough together that heavy overlap was unavoidable, and even with a hover z-index boost, it was genuinely ambiguous which card the gold glow belonged to. A plain CSS grid (`grid-cols-[repeat(13,minmax(0,1fr))]` on desktop, fewer columns on narrower screens, real `gap` between every cell) has zero overlap by construction — there is no ambiguity to fix. The hover z-index boost stays (harmless, keeps a lifted/scaled card from clipping under a taller neighbor), but the grid gaps are what actually solved the confusion.

## 4. Directory Structure
/mystic-tarot-ai
├── /frontend                 # React + Vite + TS
│   ├── /src/components       # UI components (Card, Gachapon, etc.)
│   ├── /src/hooks            # MediaPipe Hand Tracking logic
│   └── /src/services         # API client to backend
├── /backend                  # FastAPI
│   ├── /core                 # Config and settings
│   ├── /services             # LangChain & Gemini integration
│   └── main.py               # FastAPI endpoints (/api/predict)
└── docker-compose.yml