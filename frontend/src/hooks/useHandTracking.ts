import { useCallback, useEffect, useRef, useState } from "react";
import type { HandFrame } from "../lib/handTracking/HandTrackingService";

export type HandTrackingStatus = "idle" | "loading" | "active" | "error";

type Service = InstanceType<typeof import("../lib/handTracking/HandTrackingService").HandTrackingService>;

/** Lower = smoother but laggier, higher = snappier but more jittery. 0.3 is a
 * reasonable middle ground for a fingertip-driven cursor. */
const SMOOTHING = 0.3;

/** Loads the hand-tracking module (and MediaPipe itself) only when `start()`
 * is actually called, via a dynamic import — so pages/users that never enable
 * it never fetch that code, not even as part of the main bundle. */
export function useHandTracking() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const serviceRef = useRef<Service | null>(null);
  const smoothedRef = useRef<{ x: number; y: number } | null>(null);
  const [frame, setFrame] = useState<HandFrame | null>(null);
  const [status, setStatus] = useState<HandTrackingStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRawFrame = useCallback((raw: HandFrame | null) => {
    if (!raw) {
      smoothedRef.current = null;
      setFrame(null);
      return;
    }
    // Low-pass filter (LERP toward the new reading) so the cursor glides
    // instead of jumping to each new raw MediaPipe detection.
    const prev = smoothedRef.current ?? { x: raw.x, y: raw.y };
    const smoothed = {
      x: prev.x + (raw.x - prev.x) * SMOOTHING,
      y: prev.y + (raw.y - prev.y) * SMOOTHING,
    };
    smoothedRef.current = smoothed;
    setFrame({ x: smoothed.x, y: smoothed.y, pinching: raw.pinching });
  }, []);

  const start = useCallback(async () => {
    if (!videoRef.current || status === "loading" || status === "active") return;
    setStatus("loading");
    setErrorMessage(null);
    try {
      const { HandTrackingService } = await import("../lib/handTracking/HandTrackingService");
      const service = new HandTrackingService();
      serviceRef.current = service;
      await service.start(videoRef.current, handleRawFrame);
      setStatus("active");
    } catch (err) {
      serviceRef.current = null;
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : String(err));
    }
  }, [status, handleRawFrame]);

  const stop = useCallback(() => {
    serviceRef.current?.stop();
    serviceRef.current = null;
    smoothedRef.current = null;
    setFrame(null);
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => {
      serviceRef.current?.stop();
    };
  }, []);

  return { videoRef, frame, status, errorMessage, start, stop };
}
