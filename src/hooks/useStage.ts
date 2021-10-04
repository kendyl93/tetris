import { useState, useEffect } from "react";
import { createStage } from "../components/Stage/createStage";
import { IPlayer } from "./usePlayer";
import { StageType, StageRowType, StageCellType } from "../components/Stage";
import { TetrominoRowType, TetrominoCellType } from "../tetrominos";
import {
  STAGE,
  NO_COLLISION_WITH_ANOTHER_TETROMINO,
  HAS_COLLISION_WITH_ANOTHER_TETROMINO,
  CELL_TYPE_INDEX,
  CELL_STATUS_INDEX,
  CLEAN_CELL,
} from "../components/Stage/contants";
import { EMPTY } from "../constants";
import { increment } from "../utils/math";
import { fillWith } from "../utils/array";

type ResetTetrominoType = () => void;

type IncrementCallbackType = (n: number) => number;
type SetClearRowsType = (callback: IncrementCallbackType) => void;

const drawStage = (previousStage: StageType) =>
  previousStage?.map((row: StageRowType) =>
    row.map((cell: StageCellType) =>
      cell[CELL_STATUS_INDEX] === NO_COLLISION_WITH_ANOTHER_TETROMINO
        ? STAGE.EMPTY_CELL
        : cell
    )
  );

const drawTetrominor = (player: IPlayer, newStage: StageType) => {
  player.tetromino.map((rowValue: TetrominoRowType, Yindex: number) =>
    rowValue.map((cellValue: TetrominoCellType, Xindex: number) => {
      if (cellValue === CLEAN_CELL) {
        // eslint-disable-next-line array-callback-return
        return;
      }
      const currentVerticalPosition = Yindex + player.position.y;
      const currentHorizontalPosition = Xindex + player.position.x;
      const tetrominoStatus = player.collided
        ? HAS_COLLISION_WITH_ANOTHER_TETROMINO
        : NO_COLLISION_WITH_ANOTHER_TETROMINO;

      newStage[currentVerticalPosition][currentHorizontalPosition] = [
        cellValue,
        tetrominoStatus,
      ];
    })
  );
};

const findRowToClear = (row: StageRowType) =>
  row.findIndex(
    (cell: StageCellType) => cell[CELL_TYPE_INDEX] === CLEAN_CELL
  ) === -1;

const addEmptyRowAtTheTop = (acc: StageType, stage: StageType) =>
  acc.unshift(fillWith(new Array(stage[0].length), STAGE.EMPTY_CELL));

const sweepRows = (newStage: StageType, setClearRows: SetClearRowsType) =>
  newStage.reduce((acc: StageType, row: StageRowType) => {
    const filledRow = findRowToClear(row);

    if (filledRow) {
      setClearRows((rows: number) => increment(rows));

      addEmptyRowAtTheTop(acc, newStage);
      return acc;
    }

    acc.push(row);
    return acc;
  }, []);

const updateStage = (
  player: IPlayer,
  previousStage: StageType,
  resetTetromino: ResetTetrominoType,
  setClearRows: SetClearRowsType
) => {
  const newStage = drawStage(previousStage);
  drawTetrominor(player, newStage);

  if (player.collided) {
    resetTetromino();
    return sweepRows(newStage, setClearRows);
  }

  return newStage;
};

const useStage = (player: IPlayer, resetTetromino: ResetTetrominoType) => {
  const [stage, setStage] = useState<StageType>(createStage());
  const [clearedRows, setClearedRows] = useState(EMPTY);

  useEffect(() => {
    setClearedRows(EMPTY);

    setStage((prev: StageType) =>
      updateStage(player, prev, resetTetromino, setClearedRows)
    );
  }, [player, resetTetromino]);

  return [stage, setStage, clearedRows] as const;
};

export default useStage;
