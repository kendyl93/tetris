import { TETROMINOS } from "../../tetrominos";

export const CLEAN_CELL = 0;

export const CELL_TYPE_INDEX = 0;
export const CELL_STATUS_INDEX = 1;

export const NO_COLLISION_WITH_ANOTHER_TETROMINO = "clear";

export const STAGE = {
  WIDTH: 12,
  HEIGHT: 20,
  EMPTY_CELL: [CLEAN_CELL, NO_COLLISION_WITH_ANOTHER_TETROMINO],
};

export const NO_TETROMINO = TETROMINOS[0].shape;
