import { useCallback, useEffect, useRef, useState } from "react";
import type { HandFrame } from "../lib/handTracking/HandTrackingService";

export type HandTrackingStatus = "idle" | "loading" | "active" | "error";

type Service = InstanceType<typeof import("../lib/handTracking/HandTrackingService").HandTrackingService>;

/** Loads the hand-tracking module (and MediaPipe itself) only when `start()`
 * is actually called, via a dynamic import — so pages/users that never enable
 * it never fetch that code, not even as part of the main bundle. */
export function useHandTracking() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const serviceRef = useRef<Service | null>(null);
  const [frame, setFrame] = useState<HandFrame | null>(null);
  const [status, setStatus] = useState<HandTrackingStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Smoothing (One Euro Filter) already happens in HandTrackingService,
  // which has access to real per-frame timestamps and can adapt to motion
  // speed — a fixed-factor LERP here would only add extra lag on top.
  const handleRawFrame = useCallback((raw: HandFrame | null) => {
    setFrame(raw);
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
