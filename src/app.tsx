import { Players } from "./components/players";
import { Frames } from "./components/frames";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const jsonPlayer = JSON.parse(localStorage.getItem("players")!);
const playerOne = jsonPlayer[0];

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [dropedPins, setDropedPins] = useState("");

  const frames = [
    {
      round: 1,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 2,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 3,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 4,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 5,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 6,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 7,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 8,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 9,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
    {
      round: 10,
      firstPinsDowns: 0,
      remainingPins: 0,
      score: 0,
    },
  ];

  function handleThrowBall(event: ChangeEvent<HTMLInputElement>) {
    const valueThrow = event.target.value;

    setDropedPins(valueThrow);
  }

  function throwBall(event: FormEvent) {
    event.preventDefault();
    handleThrowBall;

    toast.success(`Você derrubou: ${dropedPins} Pinos`);
    setDropedPins("");
  }

  return (
    <>
      {isPlaying ? (
        <div className="bg-[url('/pista-boliche.jpg')] bg-[length:1920px_1080px] bg-center bg-no-repeat w-[full] h-[100vh]">
          <div className="w-[full] h-24 p-2 flex flex-col items-start gap-4">
            <div className="flex justify-center items-center max-h-max gap-6">
              <div className="flex flex-col text-white bg-slate-900 p-2 border border-slate-700 rounded-md">
                <span className="hover:text-blue-500">
                  Player: {playerOne.name}
                </span>
                <span className="hover:text-blue-500">
                  Strikes: {playerOne.strikes}
                </span>
                <span className="hover:text-blue-500">
                  Spares: {playerOne.spares}
                </span>
              </div>
              <div className="flex border border-r-0 w-[600px] text-slate-50 bg-slate-900">
                {frames.map((frame) => {
                  return <Frames key={frame.round} frame={frame} />;
                })}
              </div>
            </div>

            <form className="flex gap-4">
              <input
                type="number"
                className="bg-slate-900 p-1 rounded-md text-white w-[80px]"
                onChange={handleThrowBall}
                value={dropedPins}
              />
              <button
                type="button"
                className="bg-blue-500 w-28 hover:bg-blue-400 rounded-md p-1 text-slate-800"
                onClick={throwBall}
              >
                Throw Ball
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Players setIsPlaying={setIsPlaying} />
      )}
    </>
  );
};
