import { GameLoop } from "./game-loop";

export * from ".";
export const getGameLoop = () => GameLoop.getInstance();
