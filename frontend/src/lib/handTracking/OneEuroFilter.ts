/** One Euro Filter (Casiez, Roussel, Vogel 2012) — adaptive low-pass filter
 * tuned for interactive cursors: heavy smoothing while the signal is nearly
 * still (kills jitter), automatically loosening as speed increases (kills
 * lag), all from two intuitive knobs instead of a single fixed factor. */

class LowPassFilter {
  private y: number | undefined;
  private initialized = false;

  filter(value: number, alpha: number): number {
    const result = this.initialized ? alpha * value + (1 - alpha) * this.y! : value;
    this.initialized = true;
    this.y = result;
    return result;
  }

  lastValue(): number | undefined {
    return this.y;
  }

  reset(): void {
    this.initialized = false;
    this.y = undefined;
  }
}

export class OneEuroFilter {
  private minCutoff: number;
  private beta: number;
  private dCutoff: number;
  private xFilter = new LowPassFilter();
  private dxFilter = new LowPassFilter();
  private lastTimestampMs: number | null = null;

  /**
   * @param minCutoff Baseline cutoff frequency (Hz). Lower = smoother at rest.
   * @param beta Speed coefficient. Higher = less lag on fast movement.
   * @param dCutoff Cutoff for the derivative filter; 1.0 is fine in practice.
   */
  constructor(minCutoff = 1.0, beta = 0.3, dCutoff = 1.0) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
  }

  private alpha(cutoff: number, dt: number): number {
    const tau = 1.0 / (2 * Math.PI * cutoff);
    return 1.0 / (1.0 + tau / dt);
  }

  filter(value: number, timestampMs: number): number {
    const dt =
      this.lastTimestampMs === null ? 1 / 30 : Math.max((timestampMs - this.lastTimestampMs) / 1000, 1 / 120);
    this.lastTimestampMs = timestampMs;

    const prevX = this.xFilter.lastValue();
    const derivative = prevX === undefined ? 0 : (value - prevX) / dt;
    const smoothedDerivative = this.dxFilter.filter(derivative, this.alpha(this.dCutoff, dt));

    const cutoff = this.minCutoff + this.beta * Math.abs(smoothedDerivative);
    return this.xFilter.filter(value, this.alpha(cutoff, dt));
  }

  reset(): void {
    this.xFilter.reset();
    this.dxFilter.reset();
    this.lastTimestampMs = null;
  }
}
