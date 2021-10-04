import { TetrominoRowType, TetrominoShapeType } from "../tetrominos";
export const sum = (a: number, b: number) => a + b;

export const calculatecenterStage = (stageWidth: number) => stageWidth / 2 - 2;

export const transposeTetromino = (tetrominoShape: TetrominoShapeType) =>
  tetrominoShape.map((_, index) =>
    tetrominoShape.map((column: TetrominoRowType) => column[index])
  );
