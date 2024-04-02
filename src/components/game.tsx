import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { Player } from "../app";
import { Frames } from "./frames";

export interface Frame {
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

interface GameProps {
  playerOne: Player;
  playAgain: () => void;
}

export const Game = ({ playAgain, playerOne }: GameProps) => {
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
      const twoFramesBefore = updatedFrames[currentFrameIndex - 2];

      const mappedUpdatedFrames = updatedFrames.map((frame, index) => {
        const frameScore = frame.score || 0;

        if (index === currentFrameIndex - 2 && frame.strike) {
          return {
            ...frame,
            score: frameScore + dropedPins,
          };
        }

        if (index === currentFrameIndex - 1) {
          if (!twoFramesBefore || !twoFramesBefore.strike) {
            return {
              ...frame,
              score: frameScore + dropedPins,
            };
          }

          return {
            ...frame,
            score: frameScore + dropedPins * 2,
          };
        }

        if (index === currentFrameIndex) {
          const previousFrameScore =
            updatedFrames[currentFrameIndex - 1].score || 0;
          const updatedPreviousScore =
            !twoFramesBefore || !twoFramesBefore.strike
              ? previousFrameScore + dropedPins
              : previousFrameScore + dropedPins * 2;

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
        const frameScore = frame.score || 0;
        const currentSecondThrow = updatedFrames[bonusFrameIndex].secondThrow;

        if (
          index === bonusFrameIndex - 1 &&
          frame.strike &&
          currentSecondThrow === null
        ) {
          return {
            ...frame,
            score: frameScore + dropedPins,
          };
        }

        if (index === bonusFrameIndex) {
          if (frame.strike === true && frame.secondThrow === null) {
            return {
              ...frame,
              secondThrow: dropedPins,
              score: frameScore + dropedPins * 2,
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
    const frameIndex = updatedFrames.findIndex((frame) => {
      if (frame.firstThrow === null && frame.secondThrow === null) return true;
      if (
        frame.firstThrow !== null &&
        frame.secondThrow === null &&
        !frame.strike
      )
        return true;
      if (
        frame.round === 10 &&
        frame.strike === true &&
        frame.bonusThrow === null
      ) {
        return true;
      }
      if (
        frame.round === 10 &&
        frame.spare === true &&
        frame.bonusThrow === null
      )
        return true;

      return false;
    });

    return frameIndex;
  };

  function throwBall(event: FormEvent) {
    event.preventDefault();
    toast.success(`Você derrubou: ${dropedPins} Pinos`);

    setFrames((prevFrames) => {
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

      if (bonusFrame) {
        return handleBonusThrow(updatedFrames, currentFrameIndex);
      }

      if (currentThrow === 1) {
        const doubleStrike =
          (updatedFrames[currentFrameIndex - 1]?.firstThrow === 10 &&
            dropedPins === 10) ||
          (updatedFrames[currentFrameIndex - 1]?.firstThrow === 10 &&
            updatedFrames[currentFrameIndex - 2]?.firstThrow === 10);

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

    // endGame(frames);
    setDropedPins(0);
  }

  const isEndGame = useMemo(() => {
    const endGame = frames.some((frame) => {
      const lastFrame = frame.round === 10;

      if (lastFrame) {
        const endFrame =
          frame.spare === false &&
          frame.strike === false &&
          frame.firstThrow !== null &&
          frame.secondThrow !== null;

        const endBonusFrame =
          (frame.strike === true || frame.spare === true) &&
          frame.bonusThrow !== null;

        const perfectGame =
          frame.strike === true &&
          frame.secondThrow === 10 &&
          frame.bonusThrow === 10;

        if (endFrame || endBonusFrame || perfectGame) {
          return true;
        }
      }
    });

    return endGame;
  }, [frames]);

  return (
    <div className="bg-[url('/pista-boliche.jpg')] bg-[length:1920px_1080px] bg-center bg-no-repeat w-[full] h-[100vh]">
      {isEndGame && (
        <div className="absolute inset-0 grid place-content-center bg-black bg-opacity-50">
          <div className="bg-slate-50 w-96 h-72 p-4 rounded-md border border-blue-500 shadow-lg shadow-blue-500">
            <h1 className="text-lg font-bold">
              Jogo Finalizado {playerOne.name}!
            </h1>
            <h2 className="text-lg mt-4">
              Score máximo :{" "}
              <span className="font-bold">{frames[9].score}</span>
            </h2>

            <div className="w-full flex justify-center items-center mt-12">
              <button
                type="submit"
                onClick={playAgain}
                className="p-4 bg-blue-500 hover:bg-blue-400 rounded-md border border-slate-600 text-slate-50"
              >
                Jogar novamente
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div className="flex border border-r-0 min-w-[600px] max-w-[630px] text-slate-50 bg-slate-900">
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
            disabled={isEndGame}
          >
            Throw Ball
          </button>
        </form>
      </div>
    </div>
  );
};
