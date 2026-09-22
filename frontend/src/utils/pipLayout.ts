/** Symmetric placement points (in a 0-100 viewBox) for the N suit-symbol pips
 * on a minor arcana number card, echoing how traditional pip cards arrange
 * their suit marks by count. Court cards (no numeric rank) don't use this. */
export const PIP_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [50, 30],
    [50, 70],
  ],
  3: [
    [50, 20],
    [50, 50],
    [50, 80],
  ],
  4: [
    [35, 30],
    [65, 30],
    [35, 70],
    [65, 70],
  ],
  5: [
    [35, 30],
    [65, 30],
    [50, 50],
    [35, 70],
    [65, 70],
  ],
  6: [
    [35, 22],
    [65, 22],
    [35, 50],
    [65, 50],
    [35, 78],
    [65, 78],
  ],
  7: [
    [35, 20],
    [65, 20],
    [50, 35],
    [35, 50],
    [65, 50],
    [35, 80],
    [65, 80],
  ],
  8: [
    [35, 18],
    [65, 18],
    [35, 38],
    [65, 38],
    [35, 62],
    [65, 62],
    [35, 82],
    [65, 82],
  ],
  9: [
    [35, 16],
    [65, 16],
    [35, 36],
    [65, 36],
    [50, 50],
    [35, 64],
    [65, 64],
    [35, 84],
    [65, 84],
  ],
  10: [
    [35, 14],
    [65, 14],
    [35, 32],
    [65, 32],
    [50, 42],
    [50, 58],
    [35, 68],
    [65, 68],
    [35, 86],
    [65, 86],
  ],
};

export function getPipPositions(rank: number): [number, number][] {
  return PIP_POSITIONS[rank] ?? [[50, 50]];
}
