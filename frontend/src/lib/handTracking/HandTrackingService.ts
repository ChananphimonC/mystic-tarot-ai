import { FilesetResolver, HandLandmarker, type HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { OneEuroFilter } from "./OneEuroFilter";

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

// Hysteresis around the pinch threshold: engage at the tighter distance,
// release only once the fingers pull noticeably further apart. Without a
// gap here, noisy landmarks right at the boundary flicker the "click" state
// several times a second.
const PINCH_ON = 0.042;
const PINCH_OFF = 0.058;

/** Wraps MediaPipe's HandLandmarker + a webcam feed behind a tiny
 * start/stop/onFrame surface. Nothing here knows about tarot cards — the UI
 * layer decides what a pinch or a cursor position means. */
export class HandTrackingService {
  private landmarker: HandLandmarker | null = null;
  private video: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private rafId: number | null = null;
  private lastVideoTime = -1;
  private isPinching = false;

  // Cursor position gets the heaviest smoothing (mincutoff low) since it
  // drives visible motion; beta lets it snap back to responsive once the
  // hand is actually moving fast rather than gliding.
  private xFilter = new OneEuroFilter(0.8, 0.4);
  private yFilter = new OneEuroFilter(0.8, 0.4);
  // Pinch distance only needs to be clean enough for a stable threshold
  // decision, so it can stay a bit snappier.
  private distFilter = new OneEuroFilter(1.2, 0.6);

  private toFrame(result: HandLandmarkerResult, timestampMs: number): HandFrame | null {
    const landmarks = result.landmarks?.[0];
    if (!landmarks) {
      this.xFilter.reset();
      this.yFilter.reset();
      this.distFilter.reset();
      this.isPinching = false;
      return null;
    }
    const indexTip = landmarks[8];
    const thumbTip = landmarks[4];
    const rawDist = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);

    const smoothedX = this.xFilter.filter(indexTip.x, timestampMs);
    const smoothedY = this.yFilter.filter(indexTip.y, timestampMs);
    const smoothedDist = this.distFilter.filter(rawDist, timestampMs);

    if (this.isPinching) {
      if (smoothedDist > PINCH_OFF) this.isPinching = false;
    } else if (smoothedDist < PINCH_ON) {
      this.isPinching = true;
    }

    return {
      x: 1 - smoothedX, // the camera feed is mirrored for the user, so mirror the coordinate too
      y: smoothedY,
      pinching: this.isPinching,
    };
  }

  async start(video: HTMLVideoElement, onFrame: (frame: HandFrame | null) => void): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
    this.landmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
      runningMode: "VIDEO",
      numHands: 1,
      // Above the 0.5 defaults so a low-confidence guess doesn't briefly
      // register as a real hand and jerk the cursor across the screen.
      minHandDetectionConfidence: 0.7,
      minHandPresenceConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    this.stream = await navigator.mediaDevices.getUserMedia({
      // Smaller frames cost less to decode and run through the model each
      // tick, which raises achievable FPS — smoother tracking than a bigger
      // but slower feed. 320x240 is still plenty for landmark accuracy at
      // arm's length from a webcam.
      video: { width: { ideal: 320 }, height: { ideal: 240 }, frameRate: { ideal: 30 }, facingMode: "user" },
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
        const now = performance.now();
        const result = this.landmarker.detectForVideo(this.video, now);
        onFrame(this.toFrame(result, now));
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
    this.xFilter.reset();
    this.yFilter.reset();
    this.distFilter.reset();
    this.isPinching = false;
  }
}
