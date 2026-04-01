// [Topic: Reusable UI Component]
// [Topic: Dynamic Styling]
// [Topic: Framer Motion Animations]

import { motion } from "framer-motion";
import type { Tile as TileType } from "../types/game.types";

interface Props {
  tile: TileType;
  compact?: boolean;
}

export default function Tile({ tile, compact = false }: Props) {
  const tileClassName = [
    "tile",
    compact ? "tile--compact" : "",
    tile.type === "number" ? "tile--number" : "",
    tile.type === "wind" ? "tile--wind" : "",
    tile.type === "dragon" ? "tile--dragon" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      layout
      className={tileClassName}
      initial={{ opacity: 0, y: 30, rotate: -3, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      whileHover={{ y: -6, rotate: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="tile__top">{tile.type.toUpperCase()}</div>

      <div className="tile__center">
        <span className="tile__label">{tile.label}</span>
      </div>

      <div className="tile__bottom">
        <span className="tile__value">{tile.value}</span>
      </div>
    </motion.div>
  );
}