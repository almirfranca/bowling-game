import { Players } from "./components/players";
import { useState } from "react";
import { Game } from "./components/game";

export interface Player {
  name: string;
  throw: number;
  spares: number;
  strikes: number;
}

const jsonPlayer = JSON.parse(localStorage.getItem("players")!) as
  | Player[]
  | null;
const playerOne = jsonPlayer ? jsonPlayer[0] : null;

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  function playAgain() {
    localStorage.removeItem("players");
    setIsPlaying(false);
  }

  return (
    <>
      {isPlaying && playerOne ? (
        <Game playAgain={playAgain} playerOne={playerOne} />
      ) : (
        <Players setIsPlaying={setIsPlaying} />
      )}
    </>
  );
};
