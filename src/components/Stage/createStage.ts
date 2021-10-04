import {
  STAGE,
  CLEAN_CELL,
  CELL_STATUS_INDEX,
  NO_COLLISION_WITH_ANOTHER_TETROMINO,
} from "./contants";
import { fillWith } from "../../utils/array";
import { IPlayer, IPosition } from "../../hooks/usePlayer";
import { StageType } from ".";
import { TetrominoCellType, TetrominoRowType } from "../../tetrominos";

const STAGE_ROWS = Array(20);
const STAGE_COLUMNS = Array(12);

export const createStage = () =>
  Array.from(STAGE_ROWS, () => fillWith(STAGE_COLUMNS, STAGE.EMPTY_CELL));

export const checkCollision = (
  player: IPlayer,
  stage: StageType,
  { x: moveX, y: moveY }: IPosition
) => {
  let collision = false;

  player.tetromino.map((row: TetrominoRowType, yIndex: number) =>
    row.map((cell: TetrominoCellType, xIndex: number) => {
      const emptyCellValue = cell === CLEAN_CELL;

      if (emptyCellValue) {
        // eslint-disable-next-line array-callback-return
        return;
      }

      const currentVerticalPosition = yIndex + player.position.y;
      const currentHorizontalPosition = xIndex + player.position.x;

      const nextMoveDown = currentVerticalPosition + moveY;
      const nextHorizontalMove = currentHorizontalPosition + moveX;

      const hasCollision =
        !stage[nextMoveDown] ||
        !stage[currentVerticalPosition][nextHorizontalMove] ||
        stage[nextMoveDown][nextHorizontalMove][CELL_STATUS_INDEX] !==
          NO_COLLISION_WITH_ANOTHER_TETROMINO;

      if (hasCollision) {
        collision = true;
      }
    })
  );

  return collision;
};
