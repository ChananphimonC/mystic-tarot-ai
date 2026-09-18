/** Uniform back design shared by all 78 cards, as in a real deck. */
export function CardBack() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <radialGradient id="back-bg" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#30245f" />
          <stop offset="100%" stopColor="#0b1026" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="98" height="98" rx="8" fill="url(#back-bg)" />
      <rect x="8" y="8" width="84" height="84" rx="5" fill="none" stroke="#b99a55" strokeWidth="1" opacity="0.6" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="#f4dfa6" strokeWidth="1.4" opacity="0.85" />
      <path
        d="M58,38 a13,13 0 1,0 4,24 a10,10 0 1,1 -4,-24"
        fill="none"
        stroke="#f4dfa6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 50 + 34 * Math.cos(rad);
        const y = 50 + 34 * Math.sin(rad);
        return <circle key={deg} cx={x} cy={y} r="1.3" fill="#f8e8c0" opacity="0.8" />;
      })}
    </svg>
  );
}
