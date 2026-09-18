import { FilesetResolver, HandLandmarker, type HandLandmarkerResult } from "@mediapipe/tasks-vision";

/** One tracked frame: index-fingertip position (normalized 0-1, already
 * mirrored to match what the user sees in a selfie-style camera view) plus
 * whether the thumb and index finger are pinched together (the "click"). */
export interface HandFrame {
  x: number;
  y: number;
  pinching: boolean;
}

const WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const PINCH_THRESHOLD = 0.04;

function toFrame(result: HandLandmarkerResult): HandFrame | null {
  const landmarks = result.landmarks?.[0];
  if (!landmarks) return null;
  const indexTip = landmarks[8];
  const thumbTip = landmarks[4];
  const dx = indexTip.x - thumbTip.x;
  const dy = indexTip.y - thumbTip.y;
  return {
    x: 1 - indexTip.x, // the camera feed is mirrored for the user, so mirror the coordinate too
    y: indexTip.y,
    pinching: Math.hypot(dx, dy) < PINCH_THRESHOLD,
  };
}

/** Wraps MediaPipe's HandLandmarker + a webcam feed behind a tiny
 * start/stop/onFrame surface. Nothing here knows about tarot cards — the UI
 * layer decides what a pinch or a cursor position means. */
export class HandTrackingService {
  private landmarker: HandLandmarker | null = null;
  private video: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private rafId: number | null = null;
  private lastVideoTime = -1;

  async start(video: HTMLVideoElement, onFrame: (frame: HandFrame | null) => void): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
    this.landmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
      runningMode: "VIDEO",
      numHands: 1,
    });

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 480, height: 360, facingMode: "user" },
      audio: false,
    });
    video.srcObject = this.stream;
    video.muted = true;
    await video.play();
    this.video = video;

    const loop = () => {
      if (!this.video || !this.landmarker) return;
      if (this.video.currentTime !== this.lastVideoTime) {
        this.lastVideoTime = this.video.currentTime;
        const result = this.landmarker.detectForVideo(this.video, performance.now());
        onFrame(toFrame(result));
      }
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    this.landmarker?.close();
    this.landmarker = null;
    this.video = null;
    this.lastVideoTime = -1;
  }
}
