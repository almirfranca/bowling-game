import { Players } from "./components/players";
import { Frames } from "./components/frames";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface Player {
  name: string;
  throw: number;
  spares: number;
  strikes: number;
}

const jsonPlayer = JSON.parse(localStorage.getItem("players")!) as
  | Player[]
  | null;
const playerOne = jsonPlayer ? jsonPlayer[0] : null;

const initialFrames = [
  {
    round: 1,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 2,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 3,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 4,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 5,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 6,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 7,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 8,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 9,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
  {
    round: 10,
    firstThrow: 0,
    secondThrow: 0,
    score: 0,
  },
];

let amountThrows = 2;
let remainingPins = 10;
let spare = false;

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [dropedPins, setDropedPins] = useState(0);
  const [frames, setFrames] = useState(initialFrames);
  const [indexFrame, setIndexFrame] = useState(0);

  function handleThrowBall(event: ChangeEvent<HTMLInputElement>) {
    const valueThrow = Number(event.target.value);

    setDropedPins(valueThrow);
  }

  function throwBall(event: FormEvent) {
    event.preventDefault();
    handleThrowBall;
    toast.success(`Você derrubou: ${dropedPins} Pinos`);
    remainingPins -= dropedPins;

    const currentFrame = frames[indexFrame];
    let throws = amountThrows;

    setFrames((prevFrames) => {
      const updatedFrames = [...prevFrames];

      if (throws === 2) {
        let pointsFirstThrow = updatedFrames[indexFrame].score + dropedPins;

        if (spare) {
          console.log("entrei aqui");
          updatedFrames[indexFrame - 1].score += dropedPins;
          updatedFrames[indexFrame] = {
            ...currentFrame,
            firstThrow: dropedPins,
            score: updatedFrames[indexFrame - 1].score + dropedPins,
          };
          remainingPins = 10 - dropedPins;
          spare = false;
        } else {
          console.log("entrei ali");
          updatedFrames[indexFrame] = {
            ...currentFrame,
            firstThrow: dropedPins,
            score:
              updatedFrames[indexFrame].round === 1
                ? pointsFirstThrow
                : updatedFrames[indexFrame - 1].score + dropedPins,
          };
        }
      } else if (throws === 1) {
        let pointsSecondThrow = updatedFrames[indexFrame].score + dropedPins;

        updatedFrames[indexFrame] = {
          ...currentFrame,
          secondThrow: dropedPins,
          score: pointsSecondThrow,
        };
        if (remainingPins !== 0) {
          remainingPins = 10;
        } else {
          spare = true;
        }
      }

      return updatedFrames;
    });

    amountThrows -= 1;
    setDropedPins(0);

    if (amountThrows === 0) {
      setIndexFrame((prevIndex) => prevIndex + 1);
      amountThrows = 2;
    }

    console.log(remainingPins, spare);
  }

  return (
    <>
      {isPlaying && playerOne ? (
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
