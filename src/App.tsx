// [Topic: Global Decorative Background]
// [Topic: Layered UI Composition]

import "./index.css";
import { useState } from "react";
import GamePage from "./pages/GamePage";
import SummaryPage from "./pages/SummaryPage";
import LandingPage from "./pages/LandingPage";
import { useGameStore } from "./features/game/gameStore";

export default function App() {
  const [screen, setScreen] = useState<"landing" | "game" | "summary">("landing");
  const { gameOver, startGame } = useGameStore();

  const handleStartGame = () => {
    startGame();
    setScreen("game");
  };

  if (gameOver && screen === "game") {
    return <SummaryPage onBackToHome={() => setScreen("landing")} />;
  }

  return (
    <div className="app-shell">
      {/* [Topic: Animated Background Shapes] */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-bg__blob ambient-bg__blob--teal" />
        <div className="ambient-bg__blob ambient-bg__blob--gold" />

        <div className="ambient-bg__orb ambient-bg__orb--one" />
        <div className="ambient-bg__orb ambient-bg__orb--two" />

        <div className="ambient-bg__particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="app-content">
        {screen === "landing" && <LandingPage onStartGame={handleStartGame} />}
        {screen === "game" && <GamePage onExit={() => setScreen("landing")} />}
      </div>
    </div>
  );
}