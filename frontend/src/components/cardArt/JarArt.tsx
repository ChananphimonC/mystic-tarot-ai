import { motion } from "framer-motion";
import cookieImage from "../../assets/fortune-cookie.png";

const MINI_COOKIES = [
  { x: 35, y: 52, rotate: -15, scale: 0.9 },
  { x: 75, y: 56, rotate: -8, scale: 0.9 },
  { x: 50, y: 68, rotate: -20, scale: 1 },
  { x: 28, y: 88, rotate: -10, scale: 0.95 },
  { x: 70, y: 90, rotate: 12, scale: 0.9 },
  { x: 48, y: 106, rotate: 8, scale: 1 },
  { x: 82, y: 100, rotate: -14, scale: 0.85 },
];

const MINI_COOKIE_SIZE = 22;

/** A glass jar holding a few whole cookies (the same real artwork used for
 * the main cookie), used as the opening beat before one is taken out to
 * crack open. */
export function JarArt() {
  return (
    <svg viewBox="0 0 120 140" className="h-full w-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.4)]">
      <defs>
        <linearGradient id="jar-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7ecf7" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c9cfe6" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <rect x="30" y="16" width="60" height="20" rx="8" fill="#b99a55" stroke="#8a6a3a" strokeWidth="1" />
      <circle cx="60" cy="12" r="5" fill="#d9be7a" stroke="#8a6a3a" strokeWidth="1" />

      <rect
        x="14"
        y="34"
        width="92"
        height="94"
        rx="20"
        fill="url(#jar-glass)"
        stroke="#e7ecf7"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />

      <g clipPath="url(#jar-clip)">
        {MINI_COOKIES.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y})`}>
            <motion.g
              animate={{
                y: [0, -3.5, 0, 2.5, 0],
                rotate: [c.rotate, c.rotate - 8, c.rotate + 2, c.rotate + 7, c.rotate],
              }}
              transition={{
                duration: 2.2 + (i % 5) * 0.45,
                delay: (i % 6) * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <image
                href={cookieImage}
                x={(-MINI_COOKIE_SIZE * c.scale) / 2}
                y={(-MINI_COOKIE_SIZE * c.scale) / 2}
                width={MINI_COOKIE_SIZE * c.scale}
                height={MINI_COOKIE_SIZE * c.scale}
                preserveAspectRatio="xMidYMid meet"
              />
            </motion.g>
          </g>
        ))}
      </g>
      <clipPath id="jar-clip">
        <rect x="14" y="34" width="92" height="94" rx="20" />
      </clipPath>

      <path d="M24,42 L34,42 L18,116 L10,116 Z" fill="#ffffff" opacity="0.08" />
    </svg>
  );
}
