declare class GameLoop {
    private lastRequestId?;
    private isRunning;
    lastTimestamp: number;
    private deltaTime;
    private accumulator;
    gameStartTime: number;
    private readonly DEFAULT_FPS;
    private readonly MIN_FPS;
    private readonly MAX_FPS;
    private targetFps;
    private static instance;
    private constructor();
    static getInstance(): GameLoop;
    get time(): number;
    private get targetFrameTime();
    private get maxDeltaTime();
    private calculateDeltaTime;
    private updateGameLogic;
    start(update: (dt: number) => void, render: () => void): void;
    stop(): void;
    setTargetFPS(fps: number): void;
}

declare const getGameLoop: () => GameLoop;

export { getGameLoop };
