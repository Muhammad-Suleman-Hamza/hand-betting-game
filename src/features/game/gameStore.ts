// [Topic: Advanced State Management with Zustand]
// [Topic: Persistent Leaderboard with Local Storage]
// [Topic: Game Rules Enforcement]
// [Topic: Full Game Engine Implementation]

import { create } from "zustand";
import { createDeck } from "./utils/createDeck";
import { shuffle } from "./utils/shuffle";
import { calculateHandValue } from "./utils/calculateHand";
import type { GameOverReason, GameState, LeaderboardEntry, RoundResult } from "./types/game.types";
import {
  HAND_SIZE,
  MAX_TILE_VALUE,
  MIN_TILE_VALUE,
  MAX_RESHUFFLES,
} from "./constants/game.constants";

type BetType = "higher" | "lower";

interface GameActions {
  startGame: () => void;
  drawHand: () => void;
  placeBet: (bet: BetType) => void;
  resolveRound: (bet: BetType) => void;
  updateTileValues: (isWin: boolean) => void;
  checkGameOver: () => void;
  saveScore: () => void;
  endGame: () => void;
}

interface ExtraState {
  leaderboard: LeaderboardEntry[];
}

const LEADERBOARD_STORAGE_KEY = "hand-betting-game-leaderboard";

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistLeaderboard(entries: LeaderboardEntry[]) {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore storage failures
  }
}

export const useGameStore = create<GameState & GameActions & ExtraState>(
  (set, get) => ({
    score: 0,
    history: [],
    drawPile: [],
    gameOver: false,
    discardPile: [],
    reshuffleCount: 0,
    currentHand: null,
    previousHand: null,
    lastRoundResultId: 0,
    leaderboard: loadLeaderboard(),
    lastRoundResult: null as RoundResult,
    gameOverReason: null as GameOverReason,

    // [Topic: Initialization Logic]
    startGame: () => {
      const deck = shuffle(createDeck());

      set({
        score: 0,
        history: [],
        drawPile: deck,
        gameOver: false,
        discardPile: [],
        currentHand: null,
        reshuffleCount: 0,
        previousHand: null,
        gameOverReason: null,
        lastRoundResultId: 0,
        lastRoundResult: null,
      });
    },

    // [Topic: Deck Management & Reshuffle Rules]
    drawHand: () => {
      let { drawPile, discardPile, reshuffleCount } = get();

      // [Topic: Game Over Condition - Draw pile runs out for the 3rd time]
      if (drawPile.length < HAND_SIZE) {
        const nextRunOutCount = reshuffleCount + 1;

        if (nextRunOutCount >= MAX_RESHUFFLES) {
          get().saveScore();
          set({
            gameOver: true,
            gameOverReason: "deck-limit",
            reshuffleCount: nextRunOutCount,
          });
          return;
        }

        drawPile = shuffle([...discardPile, ...createDeck()]);
        discardPile = [];
        reshuffleCount = nextRunOutCount;
      }

      const newTiles = drawPile.slice(0, HAND_SIZE);
      const remaining = drawPile.slice(HAND_SIZE);

      const newHand = {
        tiles: newTiles,
        total: calculateHandValue(newTiles),
      };

      set((state) => ({
        previousHand: state.currentHand,
        currentHand: newHand,
        drawPile: remaining,
        discardPile: [...state.discardPile, ...(state.currentHand?.tiles || [])],
        reshuffleCount,
        history: state.currentHand
          ? [...state.history, state.currentHand]
          : state.history,
      }));
    },

    // [Topic: Game Flow Control]
    placeBet: (bet) => {
      if (get().gameOver) return;

      get().drawHand();

      setTimeout(() => {
        if (!get().gameOver) {
          get().resolveRound(bet);
        }
      }, 320);
    },

    // [Topic: Core Game Logic]
    resolveRound: (bet) => {
      const { currentHand, previousHand, gameOver } = get();
      if (!currentHand || !previousHand || gameOver) return;

      const isHigher = currentHand.total > previousHand.total;
      const isLower = currentHand.total < previousHand.total;

      let isWin = false;

      if (bet === "higher" && isHigher) isWin = true;
      if (bet === "lower" && isLower) isWin = true;

      set((state) => ({
        lastRoundResult: isWin ? "win" : "lose",
        lastRoundResultId: state.lastRoundResultId + 1,
        score: isWin ? state.score + 1 : state.score - 1,
      }));

      get().updateTileValues(isWin);
      get().checkGameOver();
    },

    // [Topic: Dynamic Scaling Logic]
    updateTileValues: (isWin) => {
      const { currentHand } = get();
      if (!currentHand) return;

      currentHand.tiles.forEach((tile) => {
        if (tile.type !== "number") {
          tile.value = isWin ? tile.value + 1 : tile.value - 1;
        }
      });
    },

    // [Topic: Game Over Condition - Tile value reaches 0 or 10]
    checkGameOver: () => {
      const { currentHand } = get();
      if (!currentHand) return;

      const limitReached = currentHand.tiles.some(
        (tile) =>
          tile.value <= MIN_TILE_VALUE || tile.value >= MAX_TILE_VALUE
      );

      if (limitReached) {
        get().saveScore();
        set({
          gameOver: true,
          gameOverReason: "tile-limit",
        });
      }
    },

    // [Topic: Leaderboard Logic - Top 5 High Scores]
    saveScore: () => {
      set((state) => {
        const newEntry: LeaderboardEntry = {
          id: Date.now().toString(),
          score: state.score,
        };

        const updated = [...state.leaderboard, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        persistLeaderboard(updated);

        return { leaderboard: updated };
      });
    },

    endGame: () => {
      get().saveScore();
      set({ gameOver: true });
    },
  })
);