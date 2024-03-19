import { Players } from "./components/players";
import { Frames } from "./components/frames";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
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

interface Frame {
  round: number;
  firstThrow: number | null;
  secondThrow: number | null;
  score: number | null;
  // strike: boolean;
  // spare: boolean;
}

const initialFrames: Frame[] = [
  {
    round: 1,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 2,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 3,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 4,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 5,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 6,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 7,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 8,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 9,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
  {
    round: 10,
    firstThrow: null,
    secondThrow: null,
    score: null,
  },
];

let amountThrows = 2;
let remainingPins = 10;
let spare = false;
let strike = false;

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frames, setFrames] = useState(initialFrames);
  const [indexFrame, setIndexFrame] = useState(0);
  const [dropedPins, setDropedPins] = useState(0);

  function handleThrowValue(event: ChangeEvent<HTMLInputElement>) {
    const valueThrow = Number(event.target.value);

    setDropedPins(valueThrow);
  }

  const handleStrike = useCallback(
    (updatedFrames: Frame[]) => {
      const currentFrame = updatedFrames[indexFrame];

      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === indexFrame - 1) {
          const frameScore = frame.score || 0;
          const currentFrameFirstThrow = currentFrame.firstThrow || 0;

          return {
            ...frame,
            score: frameScore + currentFrameFirstThrow + dropedPins,
          };
        }

        if (index === indexFrame) {
          const previousFrameScore = updatedFrames[indexFrame - 1].score || 0;
          const frameFirstThrow = frame.firstThrow || 0;
          const updatedPreviousScore =
            previousFrameScore + frameFirstThrow + dropedPins;

          return {
            ...frame,
            secondThrow: dropedPins,
            score: updatedPreviousScore + frameFirstThrow + dropedPins,
          };
        }

        return frame;
      });

      // updatedFrames[indexFrame] = {
      //   ...updatedFrames[indexFrame],
      //   secondThrow: dropedPins,
      //   score:
      //     updatedFrames[indexFrame - 1].score +
      //     updatedFrames[indexFrame].firstThrow +
      //     dropedPins,
      // };
      strike = false;
      handleRemainingPins();

      return mappedUpdatedFrames;
    },
    [indexFrame, dropedPins]
  );

  const handleDoubleStrike = useCallback(
    (updatedFrames: Frame[]) => {
      // const currentFrame = updatedFrames[indexFrame];

      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === indexFrame - 1) {
          const frameScore = frame.score || 0;

          return {
            ...frame,
            score: frameScore + dropedPins,
          };
        }

        if (index === indexFrame) {
          const previousFrameScore = updatedFrames[indexFrame - 1].score || 0;
          const updatedPreviousScore = previousFrameScore + dropedPins;

          return {
            ...frame,
            firstThrow: dropedPins,
            score: updatedPreviousScore + dropedPins,
          };
        }

        return frame;
      });

      // updatedFrames[indexFrame - 1].score += dropedPins;
      // updatedFrames[indexFrame] = {
      //   ...updatedFrames[indexFrame],
      //   firstThrow: dropedPins,
      //   score: updatedFrames[indexFrame - 1].score + dropedPins,
      // };

      return mappedUpdatedFrames;
    },
    [dropedPins, indexFrame]
  );

  const handleSpare = useCallback(
    (updatedFrames: Frame[]) => {
      // const currentFrame = updatedFrames[indexFrame];

      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === indexFrame - 1) {
          const frameScore = frame.score || 0;

          return {
            ...frame,
            score: frameScore + dropedPins,
          };
        }

        if (index === indexFrame) {
          const previousFrameScore = updatedFrames[indexFrame - 1].score || 0;
          const updatedPreviousScore = previousFrameScore + dropedPins;

          return {
            ...frame,
            firstThrow: dropedPins,
            score: updatedPreviousScore + dropedPins,
          };
        }

        return frame;
      });

      // updatedFrames[indexFrame - 1].score += dropedPins;
      // updatedFrames[indexFrame] = {
      //   ...updatedFrames[indexFrame],
      //   firstThrow: dropedPins,
      //   score: updatedFrames[indexFrame - 1].score + dropedPins,
      // };
      spare = false;
      return mappedUpdatedFrames;
    },
    [indexFrame, dropedPins]
  );

  const handleThrowOne = useCallback(
    (updatedFrames: Frame[], pointsFirstThrow: number) => {
      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        const previousFrameScore = updatedFrames[indexFrame - 1]?.score || 0;
        const updatedPreviousScore = previousFrameScore + dropedPins;

        if (index === indexFrame) {
          return {
            ...frame,
            firstThrow: dropedPins,
            score:
              updatedFrames[indexFrame].round === 1
                ? pointsFirstThrow
                : updatedPreviousScore,
          };
        }

        return frame;
      });

      // updatedFrames[indexFrame] = {
      //   ...updatedFrames[indexFrame],
      //   firstThrow: dropedPins,
      //   score:
      //     updatedFrames[indexFrame].round === 1
      //       ? pointsFirstThrow
      //       : updatedFrames[indexFrame - 1].score + dropedPins,
      // };

      return mappedUpdatedFrames;
    },
    [indexFrame, dropedPins]
  );

  const handleSecondThrow = useCallback(
    (updatedFrames: Frame[], pointsSecondThrow: number) => {
      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === indexFrame) {
          return {
            ...frame,
            secondThrow: dropedPins,
            score: pointsSecondThrow,
          };
        }

        return frame;
      });

      // updatedFrames[indexFrame] = {
      //   ...updatedFrames[indexFrame],
      //   secondThrow: dropedPins,
      //   score: pointsSecondThrow,
      // };

      handleRemainingPins();
      return mappedUpdatedFrames;
    },

    [dropedPins, indexFrame]
  );

  const handleRemainingPins = () => {
    if (remainingPins !== 0) {
      remainingPins = 10;
    } else {
      remainingPins = 10;
      spare = true;
    }

    return;
  };

  function throwBall(event: FormEvent) {
    event.preventDefault();
    toast.success(`Você derrubou: ${dropedPins} Pinos`);
    remainingPins -= dropedPins;

    // const currentFrame = frames[indexFrame];
    const throws = amountThrows;

    setFrames((prevFrames) => {
      console.log("Entrei aqui");
      const updatedFrames = [...prevFrames];
      const currentFrameScore = updatedFrames[indexFrame].score || 0;
      const pointsOnTheThrow = currentFrameScore + dropedPins;
      //primeira jogada

      if (throws === 2) {
        const doubleStrike =
          updatedFrames[indexFrame - 1]?.firstThrow === 10 && dropedPins === 10;

        if (doubleStrike) {
          return handleDoubleStrike(updatedFrames);
        } else if (spare) {
          return handleSpare(updatedFrames);
        } else {
          return handleThrowOne(updatedFrames, pointsOnTheThrow);
        }
      } else if (throws === 1) {
        //segunda jogada
        if (strike) {
          return handleStrike(updatedFrames);
        }
        return handleSecondThrow(updatedFrames, pointsOnTheThrow);
      }

      return updatedFrames;
    });

    amountThrows -= 1;
    setDropedPins(0);

    if (throws === 2 && dropedPins === 10) {
      strike = true;
      remainingPins = 10;
      amountThrows = 0;
    }

    if (amountThrows === 0) {
      setIndexFrame((prevIndex) => prevIndex + 1);
      amountThrows = 2;
    }

    console.log(remainingPins, spare, strike);
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
                onChange={handleThrowValue}
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
