const EMPTY = 0;

export type TetrominoCellType = number | string;
export type TetrominoRowType = Array<TetrominoCellType>;
export type TetrominoShapeType = Array<TetrominoRowType>;
type Tetromino = {
  [key: string]: { shape: TetrominoShapeType; color: string };
};

export const TETROMINOS: Tetromino = {
  [EMPTY]: { shape: [[0]], color: '0, 0, 0' },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: '0, 255, 255',
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: '0,0,255',
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: '255, 170, 0',
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '255,255,0',
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: '0,255,0',
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      [0, 'T', 0],
      [0, 0, 0],
    ],
    color: '170,0,255',
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: '255,0,0',
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
