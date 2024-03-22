import { Frame } from "./game";

interface FramesProps {
  frame: Frame;
}

export const Frames = ({ frame }: FramesProps) => {
  return (
    <>
      {frame.bonusThrow ? (
        <div className="flex flex-col w-[62px] border-r">
          <span className="border-b text-center bg-blue-500">
            {frame.round}
          </span>
          <div className="flex justify-center h-[28px]">
            <span className="flex justify-center w-5 px-[3px] ">
              {frame.firstThrow}
            </span>
            {frame.strike || frame.spare ? (
              <span className="flex justify-center w-5 border-l border-b px-[3px] bg-slate-50 text-slate-950 text-sm font-thin items-center">
                {frame.spare ? "SP" : "ST"}
              </span>
            ) : (
              <span className="flex justify-center w-5 px-[3px]">
                {frame.secondThrow}{" "}
              </span>
            )}
            <span className="flex justify-center w-5 border-l border-b px-[3px]">
              {frame.bonusThrow}{" "}
            </span>
          </div>
          <span className="text-center h-[28px]">{frame.score}</span>
        </div>
      ) : (
        <div className="flex flex-col w-[60px] border-r">
          <span className="border-b text-center bg-blue-500">
            {frame.round}
          </span>
          <div className="flex justify-center h-[28px]">
            <span className="flex w-[30px] px-2">{frame.firstThrow}</span>
            {frame.strike || frame.spare ? (
              <span className="flex w-[30px] border-l border-b px-2 bg-slate-50 text-slate-950 text-sm font-thin items-center">
                {frame.spare ? "SP" : "ST"}
              </span>
            ) : (
              <span className="flex w-[30px] border-l border-b px-2">
                {frame.secondThrow}{" "}
              </span>
            )}
          </div>
          <span className="text-center h-[28px]">{frame.score}</span>
        </div>
      )}
    </>
  );
};
