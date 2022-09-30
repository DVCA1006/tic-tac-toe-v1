import React, { ReactNode } from "react";

type Props = {
  index: number;
  onClick(event: any): void;
  player: string;
};

function Board({ index, player, onClick }: Props) {
  const scale = player ? "scale-75" : "scale-0";
  const textColor = player === "X" ? "text-blue-600" : "text-red-600";

  return (
    <div>
      <div
        className={`h-32 border-solid border-slate-200 border-4 text-slate-200 text-center cursor-pointer text-9xl flex justify-center items-center caret-transparent`}
        data-cell-index={index}
        {...{ onClick }}
      >
        <span
          data-cell-index={index}
          className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}
        >
          {player}
        </span>
      </div>
    </div>
  );
}

export default Board;
