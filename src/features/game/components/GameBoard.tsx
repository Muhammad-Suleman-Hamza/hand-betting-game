// [Topic: Component Composition]
// [Topic: Zustand State Consumption]
// [Topic: Framer Motion Layout Animations]
// [Topic: Score Count Animation]
// [Topic: Sound Effects & Win Particles]

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGameStore } from "../gameStore";
import Tile from "./Tile";
import {
  playLoseSound,
  playTileClick,
  playWinSound,
} from "../utils/sound";

interface Props {
  onExit: () => void;
}

export default function GameBoard({ onExit }: Props) {
  const {
    currentHand,
    previousHand,
    history,
    drawHand,
    placeBet,
    drawPile,
    discardPile,
    score,
    reshuffleCount,
    lastRoundResult,
    lastRoundResultId,
  } = useGameStore();

  const [displayScore, setDisplayScore] = useState(score);
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const prevResultRef = useRef<typeof lastRoundResult>(null);

  useEffect(() => {
    if (historyScrollRef.current) {
      historyScrollRef.current.scrollLeft =
        historyScrollRef.current.scrollWidth;
    }
  }, [history]);

  useEffect(() => {
    let frame = 0;
    const start = displayScore;
    const end = score;
    const duration = 300;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(start + (end - start) * progress);
      setDisplayScore(value);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  useEffect(() => {
    if (!lastRoundResultId || !lastRoundResult) return;

    if (lastRoundResult === "win") playWinSound();
    if (lastRoundResult === "lose") playLoseSound();
  }, [lastRoundResultId, lastRoundResult]);

  const winParticles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: (i % 7) * 18 - 54,
        y: -20 - (i % 4) * 18,
        rotate: i * 22,
        delay: i * 0.02,
      })),
    []
  );

  const handleStartFirstHand = () => {
    playTileClick();
    drawHand();
  };

  const handleBet = (direction: "higher" | "lower") => {
    playTileClick();
    placeBet(direction);
  };

  return (
    <motion.div
      className="game-layout"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="game-top-row">
        <motion.div
          className={`card game-panel game-panel--hero ${
            currentHand ? "game-panel--active" : ""
          }`}
          layout
        >
          <div className="section-header">
            <div>
              <div className="badge">Mahjong Hand Betting</div>
              <h2>Current Hand</h2>
            </div>
          </div>

          {!currentHand ? (
            <div className="game-empty">
              <p>Draw the first hand to begin the game.</p>
              <motion.button
                className="btn btn--primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartFirstHand}
              >
                Start First Hand
              </motion.button>
            </div>
          ) : (
            <>
              <div className="hand-summary">
                <div className="hand-summary__total">
                  <span>Total</span>
                  <strong>{currentHand.total}</strong>
                </div>
              </div>

              <div className="current-hand-stage">
                <AnimatePresence mode="popLayout">
                  <motion.div className="tiles-row" layout>
                    {currentHand.tiles.map((tile) => (
                      <Tile key={tile.id} tile={tile} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                  {lastRoundResult === "win" && (
                    <motion.div
                      key={`win-${lastRoundResultId}`}
                      className="win-particles"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {winParticles.map((particle) => (
                        <motion.span
                          key={`${lastRoundResultId}-${particle.id}`}
                          className="win-particle"
                          initial={{ opacity: 0, scale: 0.4, x: 0, y: 0, rotate: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.4, 1, 0.6],
                            x: particle.x,
                            y: particle.y,
                            rotate: particle.rotate,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: particle.delay,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="bet-panel">
                <button
                  className="btn btn--accent"
                  onClick={() => handleBet("higher")}
                >
                  Bet Higher
                </button>

                <button
                  className="btn btn--secondary"
                  onClick={() => handleBet("lower")}
                >
                  Bet Lower
                </button>
              </div>
            </>
          )}
        </motion.div>

        <motion.div className="card game-panel game-panel--previous" layout>
          <div className="section-header">
            <h2>Previous Hand</h2>
          </div>

          {!previousHand ? (
            <div className="empty-state">
              <p>No previous hand yet.</p>
            </div>
          ) : (
            <>
              <div className="previous-hand-total">
                Total: <strong>{previousHand.total}</strong>
              </div>

              <div className="tiles-row">
                {previousHand.tiles.map((tile) => (
                  <Tile key={tile.id} tile={tile} />
                ))}
              </div>
            </>
          )}
        </motion.div>

        <motion.div className="card game-panel game-panel--stats" layout>
          <div className="section-header section-header--stats">
            <h2>Game Stats</h2>

            <button className="btn btn--ghost btn--sm" onClick={onExit}>
              Quit
            </button>
          </div>

          <div className="stats-list">
            <div className="stats-list__item">
              <span>Score</span>
              <strong>{displayScore}</strong>
            </div>

            <div className="stats-list__item">
              <span>Reshuffles</span>
              <strong>{reshuffleCount}</strong>
            </div>

            <div className="stats-list__item">
              <span>Draw</span>
              <strong>{drawPile.length}</strong>
            </div>

            <div className="stats-list__item">
              <span>Discard</span>
              <strong>{discardPile.length}</strong>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div className="card history-section" layout>
        <div className="section-header">
          <h2>History</h2>
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <p>No history yet.</p>
          </div>
        ) : (
          <div className="history-scroll" ref={historyScrollRef}>
            <div className="history-track">
              {history.map((hand, index) => (
                <div key={`${hand.total}-${index}`} className="history-card">
                  <div className="history-card__header">
                    <span>#{index + 1}</span>
                    <strong>{hand.total}</strong>
                  </div>

                  <div className="history-tiles">
                    {hand.tiles.map((tile) => (
                      <Tile key={tile.id} tile={tile} compact />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}