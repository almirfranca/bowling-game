import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface PlayersProps {
  setIsPlaying: (isPlaying: boolean) => void;
}

interface Player {
  name: string;
  throw: number;
  spares: number;
  strikes: number;
}

export const Players = ({ setIsPlaying }: PlayersProps) => {
  const [playerName, setPlayerName] = useState("");
  const [isFormEnabled, setIsFormEnabled] = useState(true);
  const [players, setPlayers] = useState<Player[]>(() => {
    const playersOnStorage = localStorage.getItem("players");
    if (playersOnStorage) {
      return JSON.parse(playersOnStorage);
    }

    return [];
  });

  function handlePlayerName(event: ChangeEvent<HTMLInputElement>) {
    const Name = event.target.value;

    setPlayerName(Name);
  }

  function createPlayer(event: FormEvent) {
    event.preventDefault();

    if (playerName === "") {
      toast.error("Por favor, de um nome para o jogador.");
      return;
    }

    const newPlayer = {
      name: playerName,
      throw: 2,
      spares: 0,
      strikes: 0,
    };

    const playersArray = [...players, newPlayer];
    setPlayers(playersArray);

    toast.success("Jogador criado com sucesso. Clique em Play para jogar!");
    localStorage.setItem("players", JSON.stringify(playersArray));
    setPlayerName("");
    setIsFormEnabled(false);
  }

  return (
    <div className="flex flex-col items-center w-full h-[100vh] p-10">
      <div className="w-64 h-64">
        <img src="/logoBoliche.png" alt="Logo do Boliche" />
      </div>

      <form
        className={`flex flex-row mt-8 border border-slate-700 rounded-md p-8 gap-8 w-96 max-w-6xl h-[400px] bg-slate-950 shadow-2xl ${
          !isFormEnabled ? "opacity-50" : ""
        }`}
      >
        <div className="flex flex-col">
          <h1 className="text-slate-200 text-xl mb-4 font-semibold">Player</h1>
          <input
            type="text"
            placeholder="Name"
            className="text-slate-50  bg-slate-700 outline-none p-1 mb-12 rounded-sm"
            onChange={handlePlayerName}
            value={playerName}
            disabled={!isFormEnabled}
          />
          <button
            type="button"
            className="bg-blue-500 text-slate-800 w-40 rounded-md p-2 hover:bg-blue-400"
            onClick={createPlayer}
            disabled={!isFormEnabled}
          >
            Confirm
          </button>
        </div>
      </form>

      <div>
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="bg-blue-500  hover:bg-blue-400 text-slate-800 text-xl p-3 w-48 mt-6 rounded-md mb-4"
        >
          Play !
        </button>
      </div>
    </div>
  );
};
