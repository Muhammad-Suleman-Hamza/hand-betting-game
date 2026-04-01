// [Topic: React Functional Components]
// [Topic: Zustand State Consumption]
// [Topic: List Rendering]
// [Topic: Framer Motion Page Animation]

import { motion } from "framer-motion";
import { useGameStore } from "../features/game/gameStore";

interface Props {
  onStartGame: () => void;
}

export default function LandingPage({ onStartGame }: Props) {
  const leaderboard = useGameStore((s) => s.leaderboard);

  return (
    <motion.div
      className="page page--centered"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="landing">
        <div className="landing__hero card card--hero">
          <div className="badge">Mahjong Strategy Game</div>

          <h1 className="landing__title">Hand Betting Game</h1>

          <p className="landing__subtitle">
            Bet whether the next hand will be higher or lower. Manage risk,
            watch dynamic tile values, and climb the leaderboard.
          </p>

          <div className="landing__actions">
            <motion.button
              className="btn btn--primary"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartGame}
            >
              New Game
            </motion.button>
          </div>
        </div>

        <motion.div
          className="landing__leaderboard card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="section-header">
            <h2>Top 5 Leaderboard</h2>
            <span className="section-header__muted">Best local scores</span>
          </div>

          {leaderboard.length === 0 ? (
            <div className="empty-state">
              <p>No scores yet. Start a game and set the first record.</p>
            </div>
          ) : (
            <div className="leaderboard-list">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="leaderboard-item"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="leaderboard-item__rank">#{index + 1}</div>
                  <div className="leaderboard-item__content">
                    <div className="leaderboard-item__label">High Score</div>
                    <div className="leaderboard-item__score">{entry.score}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}