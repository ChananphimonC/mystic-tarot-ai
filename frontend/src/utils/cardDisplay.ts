const ROMAN: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function toRomanNumeral(n: number): string {
  if (n === 0) return "0";
  let remaining = n;
  let result = "";
  for (const [value, symbol] of ROMAN) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

const RANK_BADGES: Record<string, string> = {
  Ace: "A",
  Two: "2",
  Three: "3",
  Four: "4",
  Five: "5",
  Six: "6",
  Seven: "7",
  Eight: "8",
  Nine: "9",
  Ten: "10",
  Page: "P",
  Knight: "N",
  Queen: "Q",
  King: "K",
};

export function rankBadge(cardName: string): string {
  const rank = cardName.split(" of ")[0];
  return RANK_BADGES[rank] ?? rank.slice(0, 1);
}
