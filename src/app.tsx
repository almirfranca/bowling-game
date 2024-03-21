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
  bonusThrow?: number | null;
  score: number | null;
  strike: boolean;
  spare: boolean;
}

const initialFrames: Frame[] = [
  {
    round: 1,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 2,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 3,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 4,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 5,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 6,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 7,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 8,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 9,
    firstThrow: null,
    secondThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
  {
    round: 10,
    firstThrow: null,
    secondThrow: null,
    bonusThrow: null,
    score: null,
    strike: false,
    spare: false,
  },
];

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frames, setFrames] = useState(initialFrames);
  const [dropedPins, setDropedPins] = useState(0);

  function handleThrowValue(event: ChangeEvent<HTMLInputElement>) {
    const valueThrow = Number(event.target.value);

    setDropedPins(valueThrow);
  }

  const handleStrike = useCallback(
    (
      updatedFrames: Frame[],
      currentFrameIndex: number,
      remainingPins: number
    ) => {
      const currentFrame = updatedFrames[currentFrameIndex];

      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === currentFrameIndex - 1) {
          const frameScore = frame.score || 0;
          const currentFrameFirstThrow = currentFrame.firstThrow || 0;

          return {
            ...frame,
            score: frameScore + currentFrameFirstThrow + dropedPins,
          };
        }

        if (index === currentFrameIndex) {
          const previousFrameScore =
            updatedFrames[currentFrameIndex - 1].score || 0;
          const frameFirstThrow = frame.firstThrow || 0;
          const updatedPreviousScore =
            previousFrameScore + frameFirstThrow + dropedPins;

          return {
            ...frame,
            secondThrow: dropedPins,
            spare: dropedPins - remainingPins === 0,
            score: updatedPreviousScore + frameFirstThrow + dropedPins,
          };
        }

        return frame;
      });

      return mappedUpdatedFrames;
    },
    [dropedPins]
  );

  const handleDoubleStrike = useCallback(
    (updatedFrames: Frame[], currentFrameIndex: number) => {
      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === currentFrameIndex - 1) {
          const frameScore = frame.score || 0;

          return {
            ...frame,
            score: frameScore + dropedPins,
          };
        }

        if (index === currentFrameIndex) {
          const previousFrameScore =
            updatedFrames[currentFrameIndex - 1].score || 0;
          const updatedPreviousScore = previousFrameScore + dropedPins;

          return {
            ...frame,
            firstThrow: dropedPins,
            strike: dropedPins === 10,
            score: updatedPreviousScore + dropedPins,
          };
        }

        return frame;
      });

      return mappedUpdatedFrames;
    },
    [dropedPins]
  );

  const handleSpare = useCallback(
    (updatedFrames: Frame[], currentFrameIndex: number) => {
      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === currentFrameIndex - 1) {
          const frameScore = frame.score || 0;

          return {
            ...frame,
            score: frameScore + dropedPins,
          };
        }

        if (index === currentFrameIndex) {
          const previousFrameScore =
            updatedFrames[currentFrameIndex - 1].score || 0;
          const updatedPreviousScore = previousFrameScore + dropedPins;

          return {
            ...frame,
            firstThrow: dropedPins,
            strike: dropedPins === 10,
            score: updatedPreviousScore + dropedPins,
          };
        }

        return frame;
      });

      return mappedUpdatedFrames;
    },
    [dropedPins]
  );

  const handleThrowOne = useCallback(
    (
      updatedFrames: Frame[],
      pointsFirstThrow: number,
      currentFrameIndex: number
    ) => {
      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        const previousFrameScore =
          updatedFrames[currentFrameIndex - 1]?.score || 0;
        const updatedPreviousScore = previousFrameScore + dropedPins;

        if (index === currentFrameIndex) {
          return {
            ...frame,
            firstThrow: dropedPins,
            strike: dropedPins === 10,
            score:
              updatedFrames[currentFrameIndex].round === 1
                ? pointsFirstThrow
                : updatedPreviousScore,
          };
        }

        return frame;
      });

      return mappedUpdatedFrames;
    },
    [dropedPins]
  );

  const handleSecondThrow = useCallback(
    (
      updatedFrames: Frame[],
      pointsSecondThrow: number,
      currentFrameIndex: number,
      remainingPins: number
    ) => {
      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === currentFrameIndex) {
          return {
            ...frame,
            secondThrow: dropedPins,
            spare: dropedPins - remainingPins === 0,
            score: pointsSecondThrow,
          };
        }

        return frame;
      });

      return mappedUpdatedFrames;
    },

    [dropedPins]
  );

  const handleBonusThrow = useCallback(
    (updatedFrames: Frame[], bonusFrameIndex: number) => {
      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        if (index === bonusFrameIndex) {
          const frameScore = frame.score || 0;

          if (frame.strike === true && frame.secondThrow === null) {
            return {
              ...frame,
              secondThrow: dropedPins,
              score: frameScore + dropedPins,
            };
          } else if (frame.strike === true && frame.bonusThrow === null) {
            return {
              ...frame,
              bonusThrow: dropedPins,
              score: frameScore + dropedPins,
            };
          }

          if (frame.spare === true) {
            return {
              ...frame,
              bonusThrow: dropedPins,
              score: frameScore + dropedPins,
            };
          }
        }

        return frame;
      });

      return mappedUpdatedFrames;
    },
    [dropedPins]
  );

  const handleFrameIndex = (updatedFrames: Frame[]) => {
    const frameIndex = updatedFrames.findIndex(
      (frame) =>
        (frame.firstThrow === null && frame.secondThrow === null) ||
        (frame.firstThrow !== null &&
          frame.secondThrow === null &&
          !frame.strike) ||
        (frame.round === 10 &&
          frame.strike === true &&
          frame.bonusThrow === null) ||
        (frame.round === 10 &&
          frame.spare === true &&
          frame.bonusThrow === null)
    );

    return frameIndex;
  };

  function throwBall(event: FormEvent) {
    event.preventDefault();
    toast.success(`Você derrubou: ${dropedPins} Pinos`);

    setFrames((prevFrames) => {
      console.log("Entrei aqui");

      const updatedFrames = [...prevFrames];
      const currentFrameIndex = handleFrameIndex(updatedFrames);
      const currentFrame = updatedFrames[currentFrameIndex];
      const bonusFrame =
        currentFrameIndex === 9 &&
        (currentFrame.strike === true || currentFrame.spare === true);

      const remainingPins =
        currentFrame.firstThrow === null ? 10 : 10 - currentFrame.firstThrow;
      const currentFrameScore = currentFrame.score || 0;
      const pointsOnTheThrow = currentFrameScore + dropedPins;
      const prevFrame = updatedFrames[currentFrameIndex - 1] || 0;
      const currentThrow = currentFrame.firstThrow === null ? 1 : 2;

      console.log(currentFrameIndex);

      if (bonusFrame) {
        return handleBonusThrow(updatedFrames, currentFrameIndex);
      }

      if (currentThrow === 1) {
        const doubleStrike =
          updatedFrames[currentFrameIndex - 1]?.firstThrow === 10 &&
          dropedPins === 10;

        if (doubleStrike) {
          return handleDoubleStrike(updatedFrames, currentFrameIndex);
        } else if (prevFrame.spare) {
          return handleSpare(updatedFrames, currentFrameIndex);
        } else {
          return handleThrowOne(
            updatedFrames,
            pointsOnTheThrow,
            currentFrameIndex
          );
        }
      } else if (currentThrow === 2) {
        if (prevFrame.strike) {
          return handleStrike(updatedFrames, currentFrameIndex, remainingPins);
        }
        return handleSecondThrow(
          updatedFrames,
          pointsOnTheThrow,
          currentFrameIndex,
          remainingPins
        );
      }

      return updatedFrames;
    });

    setDropedPins(0);
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
