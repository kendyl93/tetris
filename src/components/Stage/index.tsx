import React from "react";
import Cell from "./Cell";
import { StyledStage } from "./Styles";
import GameOver from "../GameOver";
import { CELL_TYPE_INDEX } from "./contants";

export type StageCellType = Array<number | string>;
export type StageRowType = Array<StageCellType>;
export type StageType = Array<StageRowType>;
interface Props {
  stage: StageType;
  gameOver: boolean;
  score: number;
}

const Stage: React.FC<Props> = ({ stage = [], gameOver, score }) => (
  <StyledStage width={stage[0]?.length} height={stage?.length}>
    {gameOver && <GameOver score={score} />}
    {stage.map((row: StageRowType, rowIndex: number) =>
      row.map((cell: StageCellType, cellIndex: number) => {
        const cellKey = `cell-${rowIndex}-${cellIndex}`;
        const tetrominoType = cell[CELL_TYPE_INDEX];

        return <Cell key={cellKey} type={tetrominoType} />;
      })
    )}
  </StyledStage>
);

export default Stage;
