import { CardBack } from "./cardArt/CardBack";

const RING_POINTS: [number, number][] = [
  [200, 10],
  [390, 200],
  [200, 390],
  [10, 200],
];

function AstralRings() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full text-nebula-400/25" fill="none">
      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeDasharray="3 7" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="110" stroke="currentColor" strokeDasharray="1 5" strokeWidth="1" />
      <path d="M200 10 L200 390 M10 200 L390 200" stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.8" />
      {RING_POINTS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Purely decorative: three sealed cards drifting in a slow orbit, hinting at
 * the 3-card draw ahead without spending any real card identity yet. */
export function FloatingDeckPreview() {
  return (
    <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80" aria-hidden="true">
      <div className="absolute inset-0 [animation:slow-spin_70s_linear_infinite]">
        <AstralRings />
      </div>
      <div className="absolute h-40 w-40 rounded-full bg-nebula-500/20 blur-3xl" />

      <div className="absolute -translate-x-16 -translate-y-2 -rotate-12">
        <div className="h-36 w-24 sm:h-40 sm:w-28">
          <CardBack />
        </div>
      </div>
      <div className="absolute z-10 -translate-y-6">
        <div className="h-44 w-28 drop-shadow-[0_0_20px_rgba(244,223,166,0.25)] sm:h-48 sm:w-32">
          <CardBack />
        </div>
      </div>
      <div className="absolute translate-x-16 -translate-y-2 rotate-12">
        <div className="h-36 w-24 sm:h-40 sm:w-28">
          <CardBack />
        </div>
      </div>
    </div>
  );
}
