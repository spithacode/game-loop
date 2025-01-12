"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  getGameLoop: () => getGameLoop
});
module.exports = __toCommonJS(index_exports);

// src/game-loop.ts
var GameLoop = class _GameLoop {
  constructor() {
    this.isRunning = false;
    this.lastTimestamp = 0;
    this.deltaTime = 0;
    this.accumulator = 0;
    this.gameStartTime = 0;
    // FPS settings
    this.DEFAULT_FPS = 60;
    this.MIN_FPS = 20;
    this.MAX_FPS = 144;
    this.targetFps = this.DEFAULT_FPS;
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new _GameLoop();
    }
    return this.instance;
  }
  get time() {
    return this.lastTimestamp - this.gameStartTime;
  }
  get targetFrameTime() {
    return 1e3 / this.targetFps;
  }
  get maxDeltaTime() {
    return 1e3 / this.MIN_FPS;
  }
  calculateDeltaTime(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    return Math.min(deltaTime, this.maxDeltaTime);
  }
  // The fixed timestep pattern
  updateGameLogic(update) {
    this.accumulator += this.deltaTime;
    if (this.accumulator > this.maxDeltaTime) {
      this.accumulator = this.maxDeltaTime;
    }
    const NumberOfUpdates = Math.floor(this.accumulator / this.targetFrameTime);
    for (let i = 0; i < NumberOfUpdates; i++) {
      update(this.targetFrameTime / 1e3);
      this.accumulator -= this.targetFrameTime;
    }
  }
  start(update, render) {
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.gameStartTime = this.lastTimestamp;
    const loop = (timestamp) => {
      if (!this.isRunning) return;
      this.lastRequestId = requestAnimationFrame(loop);
      this.deltaTime = this.calculateDeltaTime(timestamp);
      this.updateGameLogic(update);
      render();
    };
    requestAnimationFrame(loop);
  }
  stop() {
    if (!this.lastRequestId) return;
    this.isRunning = false;
    cancelAnimationFrame(this.lastRequestId);
    this.lastRequestId = void 0;
    this.gameStartTime = 0;
  }
  setTargetFPS(fps) {
    this.targetFps = Math.min(Math.max(fps, this.MIN_FPS), this.MAX_FPS);
  }
};

// src/index.ts
var getGameLoop = () => GameLoop.getInstance();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGameLoop
});
