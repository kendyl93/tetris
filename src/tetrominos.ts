const EMPTY = 0;

type TetrominoCell = number;
type TetrominoRow = Array<TetrominoCell>;
export type TetrominoShape = Array<TetrominoRow>;
type Tetromino = {
  [key: string]: { shape: TetrominoShape; color: string };
};

export const TETROMINOS: Tetromino = {
  [EMPTY]: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    color: "255,0,0",
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: "0,255,0",
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    color: "100,255,0",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "100,100,100",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "45,45,200",
  },
  T: {
    shape: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "0,100,200",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "200,45,40",
  },
};

const withoutEmpty = (tetrominos: Tetromino) =>
  Object.fromEntries(Object.entries(tetrominos).slice(1));

const getKeys = (tetrominos: Tetromino) =>
  Object.keys(withoutEmpty(tetrominos));

export const randomTetromino = () => {
  const tetrominos = getKeys(TETROMINOS);

  const randomTetrominoKey =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];

  return TETROMINOS[randomTetrominoKey];
};
