import { STAGE } from "./contants";
import { fillWith } from "../../utils/array";

const STAGE_ROWS = Array(20);
const STAGE_COLUMNS = Array(12);

export const createStage = () =>
  Array.from(STAGE_ROWS, () => fillWith(STAGE_COLUMNS, STAGE.EMPTY_CELL));

export const checkCollision = (
  player: any,
  stage: any,
  { x: moveX, y: moveY }: any
) => {
  let collision = false;
  player.tetromino.map((row: any, yIndex: number) =>
    row.map((cell: any, xIndex: number) => {
      if (cell !== 0) {
        console.log({ moveX, position: player.position, stage });
        if (
          !stage[yIndex + player.position.y + moveY] ||
          !stage[yIndex + player.position.y][
            xIndex + player.position.x + moveX
          ] ||
          stage[yIndex + player.position.y + moveY][
            xIndex + player.position.x + moveX
          ][1] !== "clear"
        ) {
          collision = true;
        }
      }
    })
  );

  return collision;
};
