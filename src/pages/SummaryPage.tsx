// [Topic: Final State Presentation]
// [Topic: Framer Motion Page Animation]
// [Topic: Zustand State Consumption]

import { motion } from "framer-motion";
import { useGameStore } from "../features/game/gameStore";

interface Props {
  onBackToHome: () => void;
}

export default function SummaryPage({ onBackToHome }: Props) {
  const { gameOverReason } = useGameStore();
  const score = useGameStore((s) => s.score);
  const history = useGameStore((s) => s.history);
  const reshuffleCount = useGameStore((s) => s.reshuffleCount);

  return (
    <motion.div
      className="page page--centered"
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="summary card card--summary">
        <div className="badge">Session Complete</div>
        <h1>Game Over</h1>
        <h4 className="summary__subtitle">
          Reason: {" "}
          {gameOverReason === "tile-limit"
            ? "A tile reached its limit (0 or 10)"
            : "The draw pile was exhausted 3 times"}
        </h4>  
        <p className="summary__subtitle">Here is your final performance summary.</p>

        <div className="summary__stats">
          <div className="stat-card">
            <span className="stat-card__label">Final Score</span>
            <strong className="stat-card__value">{score}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">Hands Played</span>
            <strong className="stat-card__value">{history.length}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">Reshuffles</span>
            <strong className="stat-card__value">{reshuffleCount}</strong>
          </div>
        </div>

        <div className="summary__actions">
          <motion.button
            className="btn btn--primary"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBackToHome}
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}