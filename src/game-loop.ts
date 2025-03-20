export class GameLoop {
  private lastRequestId?: number;
  public isRunning: boolean = false;
  public lastTimestamp: number = 0;
  private deltaTime: number = 0;
  private accumulator: number = 0;
  public gameStartTime: number = 0;

  // FPS settings
  private readonly DEFAULT_FPS = 60;
  private readonly MIN_FPS = 20;
  private readonly MAX_FPS = 144;
  private targetFps: number = this.DEFAULT_FPS;

  private static instance: GameLoop;

  private constructor() {}

  public static getInstance(): GameLoop {
    if (!this.instance) {
      this.instance = new GameLoop();
    }
    return this.instance;
  }
  public get time(): number {
    return this.lastTimestamp - this.gameStartTime;
  }

  private get targetFrameTime(): number {
    return 1000 / this.targetFps;
  }

  private get maxDeltaTime(): number {
    return 1000 / this.MIN_FPS; // Cap at minimum FPS (e.g., 50ms at 20 FPS)
  }

  private calculateDeltaTime(timestamp: number): number {
    const deltaTime = timestamp - this.lastTimestamp; // the time takes to render a single frame in milliseconds this.lastTimestamp = timestamp;
    this.lastTimestamp = timestamp;
    return Math.min(deltaTime, this.maxDeltaTime);
  }

  // The fixed timestep pattern
  private updateGameLogic(update: (dt: number) => void) {
    this.accumulator += this.deltaTime;

    if (this.accumulator > this.maxDeltaTime) {
      this.accumulator = this.maxDeltaTime;
    }

    const NumberOfUpdates = Math.floor(this.accumulator / this.targetFrameTime);
    for (let i = 0; i < NumberOfUpdates; i++) {
      update(this.targetFrameTime / 1000);
      this.accumulator -= this.targetFrameTime;
    }
  }

  public start(update: (dt: number) => void, render: () => void) {
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.gameStartTime = this.lastTimestamp;

    const loop = (timestamp: number) => {
      if (!this.isRunning) return;

      this.lastRequestId = requestAnimationFrame(loop);

      this.deltaTime = this.calculateDeltaTime(timestamp);
      this.updateGameLogic(update);
      render();
    };

    requestAnimationFrame(loop);
  }

  public stop() {
    if (!this.lastRequestId) return;
    this.isRunning = false;
    cancelAnimationFrame(this.lastRequestId);
    this.lastRequestId = undefined;
    this.gameStartTime = 0;
  }

  setTargetFPS(fps: number) {
    this.targetFps = Math.min(Math.max(fps, this.MIN_FPS), this.MAX_FPS);
  }
}
