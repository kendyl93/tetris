import React from "react";
import Cell from "../Cell";

export type StageCell = Array<number | string>;
export type StageRow = Array<StageCell>;
export type StageType = Array<StageRow>;
interface Props {
  stage: StageType;
}

const Stage: React.FC<Props> = ({ stage }) => {
  return (
    <div>
      {stage.map((row) =>
        row.map((cell, index) => <Cell key={index} cell={cell[0]} />)
      )}
    </div>
  );
};

export default Stage;
