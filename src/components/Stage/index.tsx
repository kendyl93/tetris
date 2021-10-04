import React from "react";
import Cell from "../Cell";
import { StyledStage } from "./Styles";
import GameOver from "../GameOver";

export type StageCellType = Array<number | string>;
export type StageRowType = Array<StageCellType>;
export type StageType = Array<StageRowType>;
interface Props {
  stage: StageType;
  gameOver: boolean;
  score: number;
}

const Stage: React.FC<Props> = ({ stage = [], gameOver, score }) => {
  return (
    <StyledStage width={stage[0]?.length} height={stage?.length}>
      {gameOver && <GameOver score={score} />}
      {stage.map((row) =>
        row.map((cell, index) => <Cell key={index} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
