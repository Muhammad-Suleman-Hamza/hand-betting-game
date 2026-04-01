// [Topic: Union Types]
// [Topic: Type Modeling & Enums]

export type BetType = "higher" | "lower" | null;

export type RoundResult = "win" | "lose" | null;

export type TileType = "number" | "dragon" | "wind";


// [Topic: Const Assertion]
export const GAME_OVER_REASONS = {
  NULL: null,
  TILE_LIMIT: "tile-limit",
  DECK_LIMIT: "deck-limit",
} as const;

// [Topic: Derived Union Type]
export type GameOverReason =
  typeof GAME_OVER_REASONS[keyof typeof GAME_OVER_REASONS];

// [Topic: TypeScript Interfaces & Type Safety]

export interface Tile {
  id: string;
  type: TileType;
  value: number;
  label: string;
}

export interface Hand {
  tiles: Tile[];
  total: number;
}

export interface LeaderboardEntry {
  id: string;
  score: number;
}

export interface GameState {
  score: number;
  history: Hand[];
  drawPile: Tile[];
  gameOver: boolean;
  discardPile: Tile[];
  reshuffleCount: number;
  currentHand: Hand | null;
  previousHand: Hand | null;
  lastRoundResultId: number;
  lastRoundResult: RoundResult | null;
  gameOverReason: GameOverReason | null;
}