// [Topic: Page Composition]
// [Topic: Separation of Concerns]

import GameBoard from "../features/game/components/GameBoard";

interface Props {
  onExit: () => void;
}

export default function GamePage({ onExit }: Props) {
  return (
    <div className="page">
      <GameBoard onExit={onExit} />
    </div>
  );
}