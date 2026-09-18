import type { Category, Language } from "../types/tarot";

export interface Strings {
  brand: string;
  tagline: string;
  questionLabel: string;
  questionPlaceholder: string;
  categoryLabel: string;
  categories: Record<Category, string>;
  categorySubtitles: Record<Category, string>;
  questionIntro: string;
  reassurance: string;
  begin: string;
  pickInstruction: string;
  selectTitle: string;
  selectSubtitle: string;
  selectBody: string;
  interactionHint: string;
  alignmentLabel: string;
  chosenCount: (chosen: number, resting: number) => string;
  pickPosition: Record<"past" | "present" | "advice", string>;
  sealedLabel: string;
  awaitingLabel: string;
  awaitingHint: string;
  returnToDeck: string;
  tableTitle: string;
  shuffleLabel: string;
  resetLabel: string;
  handTrackingEnable: string;
  handTrackingDisable: string;
  handTrackingLoading: string;
  handTrackingActive: string;
  handTrackingError: string;
  handTrackingHint: string;
  confirmCard: string;
  cancelCard: string;
  cardsReady: string;
  predictButton: string;
  revealing: string;
  positionLabels: Record<"past" | "present" | "advice", string>;
  askAgain: string;
  errorTitle: string;
  errorBody: string;
  errorRateLimitedBody: string;
  retry: string;
  backArrow: string;
  dailyFortuneNav: string;
  dailyFortuneTitle: string;
  jarInstruction: string;
  takeCookieButton: string;
  dailyFortuneInstruction: string;
  dailyFortuneSubtext: string;
  dailyFortuneLoading: string;
  revealFortuneButton: string;
  fromCardLabel: string;
  copyFortune: string;
  copiedFortune: string;
  resetRitual: string;
  backToQuestion: string;
}

export const strings: Record<Language, Strings> = {
  th: {
    brand: "StarWhisper",
    tagline: "ตั้งคำถามหนึ่งข้อ ให้จักรวาลตอบด้วยไพ่สามใบ",
    questionLabel: "คำถามของคุณ (จะไม่ถามก็ได้)",
    questionPlaceholder: "พิมพ์สิ่งที่อยู่ในใจ...",
    categoryLabel: "หรือเลือกเรื่องที่อยากรู้",
    categories: {
      love: "ความรัก",
      career: "การงาน",
      finance: "การเงิน",
      health: "สุขภาพ",
      general: "ภาพรวมชีวิต",
    },
    categorySubtitles: {
      love: "ความสัมพันธ์",
      career: "เส้นทางชีวิต",
      finance: "โชคลาภ",
      health: "จิตใจและกาย",
      general: "โชคชะตา",
    },
    questionIntro: "ให้ไพ่ช่วยเปิดมุมมองใหม่ ท่ามกลางความเงียบสงบแห่งดวงดาว",
    reassurance: "คุณจะเลือกไพ่ 3 ใบจากไพ่ทั้งหมด 78 ใบ ไพ่จะไม่เผยความหมายจนกว่าคุณจะพร้อม",
    begin: "เริ่มดูไพ่",
    pickInstruction: "แตะไพ่ที่ใจคุณเลือก ทีละใบ",
    selectTitle: "เลือกไพ่ศักดิ์สิทธิ์ 3 ใบของคุณ",
    selectSubtitle: "เลือกไพ่ที่คุณรู้สึกถึงพลังงานในความสงบ",
    selectBody:
      "ไพ่ทั้ง 78 ใบวางคว่ำอยู่บนโต๊ะแห่งจักรวาลอย่างเงียบสงบ แตะไพ่ใบที่ใจคุณรู้สึกถึง เพื่อดึงสามใบที่ถูกลิขิตไว้ขึ้นมา",
    interactionHint: "ใช้เมาส์หรือแตะหน้าจอเพื่อเลือกไพ่",
    alignmentLabel: "ความคืบหน้า",
    chosenCount: (chosen, resting) => `เลือกแล้ว ${chosen} จาก 3 ใบ • เหลือบนโต๊ะ ${resting} ใบ`,
    pickPosition: {
      past: "ใบที่ 1 • รากฐานอดีต",
      present: "ใบที่ 2 • จังหวะปัจจุบัน",
      advice: "ใบที่ 3 • ศักยภาพที่กำลังเผยตัว",
    },
    sealedLabel: "ปิดผนึกในความลับ",
    awaitingLabel: "กำลังรอไพ่ใบนี้",
    awaitingHint: "แตะไพ่ใบใดก็ได้บนโต๊ะด้านล่าง",
    returnToDeck: "นำกลับสู่กองไพ่",
    tableTitle: "โต๊ะจักรวาลแห่งไพ่ 78 ใบ",
    shuffleLabel: "สับไพ่ใหม่",
    resetLabel: "เริ่มใหม่",
    handTrackingEnable: "🖐 เปิดการเคลื่อนไหวมือ",
    handTrackingDisable: "ปิดการเคลื่อนไหวมือ",
    handTrackingLoading: "กำลังเปิดกล้อง...",
    handTrackingActive: "เลื่อนนิ้วชี้ไปที่ไพ่ แล้วหยิกนิ้วโป้งกับนิ้วชี้เพื่อเลือก",
    handTrackingError: "ไม่สามารถเข้าถึงกล้องได้ ลองใช้เมาส์หรือแตะหน้าจอแทน",
    handTrackingHint: "ต้องอนุญาตให้ใช้กล้อง เมาส์และการแตะหน้าจอยังใช้ได้เสมอ",
    confirmCard: "ใช่ใบนี้",
    cancelCard: "เปลี่ยนใบอื่น",
    cardsReady: "ไพ่ทั้ง 3 ใบพร้อมแล้ว",
    predictButton: "ทำนาย",
    revealing: "ไพ่กำลังเผยความหมาย...",
    positionLabels: {
      past: "อดีต",
      present: "ปัจจุบัน",
      advice: "คำแนะนำ",
    },
    askAgain: "ถามคำถามใหม่",
    errorTitle: "เกิดข้อผิดพลาด",
    errorBody: "ขออภัย จักรวาลสัญญาณขาดหาย ลองใหม่อีกครั้ง",
    errorRateLimitedBody: "ตอนนี้มีคนถามดวงเยอะมาก จักรวาลขอเวลาสักครู่ กรุณาลองใหม่อีกครั้งในอีก 1 นาที",
    retry: "ลองอีกครั้ง",
    backArrow: "ย้อนกลับ",
    dailyFortuneNav: "คุกกี้เสี่ยงทาย",
    dailyFortuneTitle: "เปิดคุ้กกี้เสี่ยงทาย",
    jarInstruction: "หยิบคุกกี้สักชิ้นจากโหลแห่งโชคชะตา",
    takeCookieButton: "หยิบคุกกี้ 1 ชิ้น",
    dailyFortuneInstruction: "มีบางอย่างกำลังรอคุณอยู่...",
    dailyFortuneSubtext: "แตะคุกกี้หรือกดปุ่มด้านล่างเพื่อปลดผนึก",
    dailyFortuneLoading: "คุกกี้กำลังสั่น...",
    revealFortuneButton: "เปิดคำทำนายของฉัน",
    fromCardLabel: "กลั่นมาจากไพ่",
    copyFortune: "คัดลอกคำทำนาย",
    copiedFortune: "คัดลอกแล้ว ✦",
    resetRitual: "ปิดผนึกคุกกี้อีกครั้ง",
    backToQuestion: "กลับไปตั้งคำถาม",
  },
  en: {
    brand: "StarWhisper",
    tagline: "Ask one question, let three cards answer.",
    questionLabel: "Your question (optional)",
    questionPlaceholder: "Type what's on your mind...",
    categoryLabel: "Or pick what you'd like clarity on",
    categories: {
      love: "Love",
      career: "Career",
      finance: "Finance",
      health: "Health",
      general: "General life",
    },
    categorySubtitles: {
      love: "Relationships",
      career: "Life path",
      finance: "Fortune",
      health: "Mind & body",
      general: "Destiny",
    },
    questionIntro: "Let the cards open a quiet new perspective, amid the calm of the stars.",
    reassurance: "You'll choose 3 cards from the full 78-card deck. Nothing is revealed until you're ready.",
    begin: "Begin the reading",
    pickInstruction: "Touch the cards your hand is drawn to, one at a time",
    selectTitle: "Choose Your 3 Sacred Cards",
    selectSubtitle: "Choose the cards where you feel a quiet pull",
    selectBody:
      "All 78 cards rest face-down across the table in silence. Touch the ones you're drawn to, and let three destined cards come forward.",
    interactionHint: "Use your mouse or touch the screen to choose",
    alignmentLabel: "Progress",
    chosenCount: (chosen, resting) => `${chosen} of 3 chosen • ${resting} resting on the table`,
    pickPosition: {
      past: "Card I • Root & Foundation",
      present: "Card II • Present Pulse",
      advice: "Card III • Unfolding Potential",
    },
    sealedLabel: "Sealed in Mystery",
    awaitingLabel: "Awaiting this card",
    awaitingHint: "Tap any card on the table below",
    returnToDeck: "Return to the deck",
    tableTitle: "The Cosmic Table of 78 Cards",
    shuffleLabel: "Shuffle the deck",
    resetLabel: "Start over",
    handTrackingEnable: "🖐 Enable hand tracking",
    handTrackingDisable: "Disable hand tracking",
    handTrackingLoading: "Starting the camera...",
    handTrackingActive: "Point at a card, then pinch your thumb and index finger to select",
    handTrackingError: "Couldn't access the camera. Use your mouse or touch instead.",
    handTrackingHint: "Needs camera permission. Mouse and touch always still work.",
    confirmCard: "Keep this card",
    cancelCard: "Choose another",
    cardsReady: "All 3 cards are set",
    predictButton: "Reveal my reading",
    revealing: "The cards are speaking...",
    positionLabels: {
      past: "Past",
      present: "Present",
      advice: "Advice",
    },
    askAgain: "Ask another question",
    errorTitle: "Something went wrong",
    errorBody: "The signal from the cosmos was lost. Please try again.",
    errorRateLimitedBody: "Many people are asking the cosmos right now. Please try again in about a minute.",
    retry: "Try again",
    backArrow: "Back",
    dailyFortuneNav: "Fortune Cookie",
    dailyFortuneTitle: "Crack the Celestial Cookie",
    jarInstruction: "Take a cookie from the jar of fortunes",
    takeCookieButton: "Take a Cookie",
    dailyFortuneInstruction: "Something is waiting inside...",
    dailyFortuneSubtext: "Tap the cookie or the button below to unseal it",
    dailyFortuneLoading: "The cookie is trembling...",
    revealFortuneButton: "Reveal My Fortune",
    fromCardLabel: "Distilled from",
    copyFortune: "Copy fortune",
    copiedFortune: "Copied ✦",
    resetRitual: "Seal the cookie again",
    backToQuestion: "Back to your question",
  },
};
