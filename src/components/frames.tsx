interface FramesProps {
  frame: {
    round: number;
    firstPinsDowns: number;
    remainingPins: number;
    score: number;
  };
}

export const Frames = ({ frame }: FramesProps) => {
  return (
    <div className="flex flex-col w-[60px] border-r">
      <span className="border-b text-center bg-blue-500">{frame.round}</span>
      <div className="flex justify-evenly">
        <span className="pr-2 pl-1">{frame.firstPinsDowns}</span>
        <span className="flex border-l border-b pl-2 pr-1">
          {frame.remainingPins}
        </span>
      </div>
      <span className="text-center">{frame.score}</span>
    </div>
  );
};
