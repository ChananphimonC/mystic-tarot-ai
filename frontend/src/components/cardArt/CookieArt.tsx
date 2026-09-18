import { motion } from "framer-motion";
import cookieImage from "../../assets/fortune-cookie.png";

type CookieState = "idle" | "shaking" | "cracked";

interface Props {
  state: CookieState;
}

const halfVariants = {
  idle: { x: 0, y: 0, rotate: 0 },
  shaking: {
    rotate: [0, -4, 4, -4, 4, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" as const },
  },
  cracked: { transition: { duration: 0.7, ease: "easeOut" as const } },
};

// The source image's visible fold runs diagonally from roughly (60%, 0%) at
// the top edge down to (49%, 100%) at the bottom edge. Each half is the same
// full image, clipped to one side of that line, so the two pieces reassemble
// into the original artwork exactly when resting together.
const LEFT_CLIP = "polygon(0% 0%, 60% 0%, 49% 100%, 0% 100%)";
const RIGHT_CLIP = "polygon(60% 0%, 100% 0%, 100% 100%, 49% 100%)";

/** The real fortune-cookie artwork (src/assets/fortune-cookie.png), split into
 * two image layers clipped along its own visible fold so the existing
 * shake/crack interaction still works with a single source image. */
export function CookieArt({ state }: Props) {
  const leftOffset = state === "cracked" ? { x: -26, y: 10 } : { x: 0, y: 0 };
  const rightOffset = state === "cracked" ? { x: 26, y: 10 } : { x: 0, y: 0 };
  const leftRotate = state === "cracked" ? -20 : undefined;
  const rightRotate = state === "cracked" ? 20 : undefined;

  return (
    <div className="relative aspect-square h-full w-full drop-shadow-[0_14px_20px_rgba(20,10,0,0.5)]">
      <motion.div
        className="absolute inset-0"
        variants={halfVariants}
        animate={state === "shaking" ? "shaking" : "idle"}
        style={{ x: leftOffset.x, y: leftOffset.y, rotate: leftRotate, clipPath: LEFT_CLIP }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img src={cookieImage} alt="" className="h-full w-full object-contain" draggable={false} />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        variants={halfVariants}
        animate={state === "shaking" ? "shaking" : "idle"}
        style={{ x: rightOffset.x, y: rightOffset.y, rotate: rightRotate, clipPath: RIGHT_CLIP }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img src={cookieImage} alt="" className="h-full w-full object-contain" draggable={false} />
      </motion.div>
    </div>
  );
}
