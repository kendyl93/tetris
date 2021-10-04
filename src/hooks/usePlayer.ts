import { useState, useCallback } from "react";
import { randomTetromino } from "../tetrominos";
import { TetrominoShapeType } from "../tetrominos";
import { checkCollision } from "../components/Stage/createStage";
import { StageType } from "../components/Stage";
import { calculatecenterStage, transposeTetromino } from "../utils/math";
import { NO_TETROMINO, STAGE } from "../components/Stage/contants";
import { Direction } from "../constants";

export interface IPosition {
  x: number;
  y: number;
}

export interface IPlayer {
  position: IPosition;
  tetromino: TetrominoShapeType;
  collided: boolean;
}

const initialPlayerFeatures = () => ({
  position: { x: calculatecenterStage(STAGE.WIDTH), y: 0 },
  tetromino: randomTetromino().shape,
  collided: false,
});

const rotate = (tetrominoShape: TetrominoShapeType, direction: Direction) => {
  const transposedTetromino = transposeTetromino(tetrominoShape);

  if (direction === Direction.RIGHT) {
    return transposedTetromino.map((row) => row.reverse());
  }

  return transposedTetromino.reverse();
};

const usePlayer = () => {
  const [player, setPlayer] = useState<IPlayer>({
    ...initialPlayerFeatures(),
    tetromino: NO_TETROMINO,
  });

  const rotateTetromino = (stage: StageType, direction: Direction) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);
    const pos = player.position.x;
    let offset = 1;

    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset; // if collision
      offset = -(offset + (offset > 0 ? 1 : -1)); // if still collision add more offset left or right

      if (offset > clonedPlayer.tetromino[0].length) {
        clonedPlayer.position.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updateTetrominoPosition = ({ x, y }: IPosition, collided: boolean) => {
    setPlayer((prev) => ({
      ...prev,
      position: { x: (prev.position.x += x), y: (prev.position.y += y) },
      collided,
    }));
  };

  const resetTetromino = useCallback(() => {
    setPlayer(initialPlayerFeatures());
  }, []);

  return [
    player,
    updateTetrominoPosition,
    resetTetromino,
    rotateTetromino,
  ] as const;
};

export default usePlayer;
