# @spithacode/game-loop

A TypeScript game loop implementation with fixed timestep pattern, perfect for creating smooth and consistent game animations. This package provides a singleton game loop that maintains consistent update rates while allowing for variable rendering framerates.

## Features

- Fixed timestep updates for consistent game logic
- Variable rendering framerate
- FPS control (20-144 FPS)
- Singleton pattern for global state management
- Written in TypeScript with full type support
- Zero dependencies

## Installation

Using pnpm (recommended):

```bash
pnpm add @spithacode/game-loop
```

Using npm:

```bash
npm install @spithacode/game-loop
```

Using yarn:

```bash
yarn add @spithacode/game-loop
```

## Usage

```typescript
import { getGameLoop } from "@spithacode/game-loop";

// Get the game loop instance
const gameLoop = getGameLoop();

// Game state
let playerX = 0;
let playerY = 0;
const PLAYER_SPEED = 100; // pixels per second

// Update function - runs at fixed timestep
const update = (dt: number) => {
  // dt is in seconds
  playerX += PLAYER_SPEED * dt;
  playerY += PLAYER_SPEED * dt;
};

// Render function - runs as fast as possible
const render = () => {
  // Update your canvas or DOM here
  console.log(`Player position: (${playerX}, ${playerY})`);
};

// Start the game loop
gameLoop.start(update, render);

// Optionally set target FPS (default is 60)
gameLoop.setTargetFPS(144); // Values between 20-144 are supported

// Stop the loop when needed
// gameLoop.stop();
```

## API Reference

### `getGameLoop()`

Returns the singleton instance of the GameLoop class.

### `GameLoop` Class

#### Properties

- `time: number` - Get the total elapsed time since the game loop started

#### Methods

- `start(update: (dt: number) => void, render: () => void): void`

  - Starts the game loop
  - `update`: Function called at fixed intervals with delta time in seconds
  - `render`: Function called as often as possible for rendering

- `stop(): void`

  - Stops the game loop

- `setTargetFPS(fps: number): void`
  - Sets the target FPS for updates (between 20 and 144)

## Technical Details

The game loop uses a fixed timestep pattern which:

- Ensures consistent physics and game logic updates
- Prevents spiral of death in slow frames
- Separates update logic from rendering
- Maintains smooth animations even under varying system performance

Default values:

- Default FPS: 60
- Minimum FPS: 20
- Maximum FPS: 144

## License

MIT © [Sid Ali Assoul]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/spithacode/game-loop/issues).
