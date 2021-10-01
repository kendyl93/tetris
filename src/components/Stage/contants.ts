interface IStage {
  WIDTH: number;
  HEIGHT: number;
  EMPTY_CELL: Array<number | string>;
}

const CLEAN_CELL = 0;
const NO_COLLISION_WITH_ANOTHER_TETROMINOR = "clear";

export const STAGE: IStage = {
  WIDTH: 12,
  HEIGHT: 20,
  EMPTY_CELL: [CLEAN_CELL, NO_COLLISION_WITH_ANOTHER_TETROMINOR],
};