// [Topic: Functional Programming & Pure Functions]

import type { Tile } from "../types/game.types";

export function calculateHandValue(tiles: Tile[]): number {
  return tiles.reduce((sum, tile) => sum + tile.value, 0);
}