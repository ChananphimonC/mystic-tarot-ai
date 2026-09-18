interface Props {
  x: number;
  y: number;
  pinching: boolean;
}

/** A glowing cursor that follows the tracked fingertip across the whole
 * viewport, shrinking and filling in when the user pinches ("click"). */
export function HandCursor({ x, y, pinching }: Props) {
  const size = pinching ? 22 : 34;
  return (
    <div
      className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-400 transition-[width,height,background-color] duration-100"
      style={{
        left: `${x * 100}vw`,
        top: `${y * 100}vh`,
        width: size,
        height: size,
        backgroundColor: pinching ? "rgba(244,223,166,0.55)" : "rgba(244,223,166,0.15)",
        boxShadow: "0 0 18px rgba(244,223,166,0.65)",
      }}
      aria-hidden="true"
    />
  );
}
