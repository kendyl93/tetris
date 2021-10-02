import React from "react";
import Cell from "../Cell";
import { StyledStage } from "./Styles";

export type StageCell = Array<number | string>;
export type StageRow = Array<StageCell>;
export type StageType = Array<StageRow>;
interface Props {
  stage: StageType;
}

const Stage: React.FC<Props> = ({ stage }) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map((row) =>
        row.map((cell, index) => <Cell key={index} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
