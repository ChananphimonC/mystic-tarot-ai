/** Deterministic pseudo-random stream derived from a string seed (e.g. a card id),
 * so each card's generated constellation is stable across renders and sessions. */
function hashSeed(seed: string): number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function createSeededRandom(seed: string): () => number {
  let a = hashSeed(seed) || 1;
  return () => {
    a ^= a << 13;
    a ^= a >>> 17;
    a ^= a << 5;
    a >>>= 0;
    return a / 4294967296;
  };
}
