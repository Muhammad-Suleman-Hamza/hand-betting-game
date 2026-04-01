// [Topic: Data Modeling & Domain Logic]

import type { Tile } from "../types/game.types";
import { INITIAL_NON_NUMBER_VALUE } from "../constants/game.constants";

export function createDeck(): Tile[] {
  const deck: Tile[] = [];

  // [Topic: Algorithmic Logic - Generating Number Tiles]
  for (let i = 1; i <= 9; i++) {
    deck.push({
      id: `num-${i}-${Math.random()}`,
      type: "number",
      value: i,
      label: `${i}`,
    });
  }

  // [Topic: Domain Modeling - Winds]
  ["E", "S", "W", "N"].forEach((dir) => {
    deck.push({
      id: `wind-${dir}-${Math.random()}`,
      type: "wind",
      value: INITIAL_NON_NUMBER_VALUE,
      label: dir,
    });
  });

  // [Topic: Domain Modeling - Dragons]
  ["R", "G", "W"].forEach((d) => {
    deck.push({
      id: `dragon-${d}-${Math.random()}`,
      type: "dragon",
      value: INITIAL_NON_NUMBER_VALUE,
      label: d,
    });
  });

  return deck;
}