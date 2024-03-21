interface FramesProps {
  frame: {
    round: number;
    firstThrow: number | null;
    secondThrow: number | null;
    score: number | null;
  };
}

export const Frames = ({ frame }: FramesProps) => {
  return (
    <div className="flex flex-col w-[60px] border-r">
      <span className="border-b text-center bg-blue-500">{frame.round}</span>
      <div className="flex justify-center h-[28px]">
        <span className="flex w-[30px] px-2">{frame.firstThrow}</span>
        <span className="flex w-[30px] border-l border-b px-2">
          {frame.secondThrow}
        </span>
      </div>
      <span className="text-center h-[28px]">{frame.score}</span>
    </div>
  );
};
