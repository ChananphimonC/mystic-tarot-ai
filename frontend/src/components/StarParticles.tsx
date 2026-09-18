import { useMemo } from "react";

const STAR_COUNT = 70;

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, id) => ({
    id,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 1.6,
    delay: Math.random() * 6,
    duration: 3 + Math.random() * 4,
  }));
}

/** A very subtle, fixed ambient starfield — twinkling only, no parallax or
 * pointer capture, so it never competes with the actual UI for attention. */
export function StarParticles() {
  const stars = useMemo(generateStars, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-starlight-50"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
