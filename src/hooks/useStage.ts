import { useState, useEffect } from "react";
import { createStage } from "../components/Stage/createStage";
import { IPlayer } from "./usePlayer";
import { StageType, StageRowType, StageCellType } from "../components/Stage";
import { TetrominoRowType, TetrominoCellType } from "../tetrominos";
import {
  STAGE,
  NO_COLLISION_WITH_ANOTHER_TETROMINO,
} from "../components/Stage/contants";

const drawStage = (previousStage: StageType) =>
  previousStage?.map((row: StageRowType) =>
    row.map((cell: StageCellType) =>
      cell[1] === NO_COLLISION_WITH_ANOTHER_TETROMINO ? STAGE.EMPTY_CELL : cell
    )
  );

const drawTetrominor = (player: IPlayer, newStage: StageType) => {
  player.tetromino.map((rowValue: TetrominoRowType, Yindex: number) =>
    rowValue.map((cellValue: TetrominoCellType, Xindex: number) => {
      if (cellValue !== 0) {
        newStage[Yindex + player.position.y][Xindex + player.position.x] = [
          cellValue,
          `${player.collided ? "merged" : "clear"}`,
        ];
      }
    })
  );
};

const updateStage = (
  player: IPlayer,
  previousStage: StageType,
  resetTetromino: any,
  setClearRows: any
) => {
  const newStage = drawStage(previousStage);
  drawTetrominor(player, newStage);

  if (player.collided) {
    resetTetromino();
    debugger;
    return sweepRows(newStage, setClearRows);
  }

  return newStage;
};

const sweepRows = (newStage: StageType, setClearRows: any) => {
  return newStage.reduce((acc: StageType, row: StageRowType) => {
    if (row.findIndex((cell: StageCellType) => cell[0] === 0) === -1) {
      setClearRows((prev: any) => prev + 1);
      acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));
      return acc;
    }

    acc.push(row);
    return acc;
  }, []);
};

const useStage = (player: IPlayer, resetTetromino: any) => {
  const [stage, setStage] = useState<StageType>(createStage());
  const [clearedRows, setClearedRows] = useState(0);

  console.log({ stage });

  useEffect(() => {
    setClearedRows(0);

    setStage((prev: StageType) =>
      updateStage(player, prev, resetTetromino, setClearedRows)
    );
  }, [player]);

  return [stage, setStage, clearedRows] as const;
};

export default useStage;
