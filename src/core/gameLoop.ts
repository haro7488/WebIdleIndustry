export class GameLoop {
  private intervalId: number | null = null;
  private lastTick: number = Date.now();
  private onTick: (deltaSec: number) => void;
  private tickRate: number;

  constructor(onTick: (deltaSec: number) => void, tickRate = 1000) {
    this.onTick = onTick;
    this.tickRate = tickRate;
  }

  start(): void {
    if (this.intervalId !== null) return;
    this.lastTick = Date.now();
    this.intervalId = window.setInterval(() => {
      const now = Date.now();
      const deltaSec = (now - this.lastTick) / 1000;
      this.lastTick = now;
      this.onTick(deltaSec);
    }, this.tickRate);
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
