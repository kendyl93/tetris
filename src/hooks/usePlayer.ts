import { useState, useCallback } from "react";
import { randomTetromino, TETROMINOS } from "../tetrominos";
import { TetrominoShape } from "../tetrominos";
import { STAGE } from "../components/Stage/contants";
import { checkCollision } from "../components/Stage/createStage";

interface IPosition {
  x: number;
  y: number;
}

export interface IPlayer {
  position: IPosition;
  tetromino: TetrominoShape;
  collided: boolean;
}

const initialPlayerFeatures = () => ({
  position: { x: STAGE.WIDTH / 2 - 2, y: 0 },
  tetromino: randomTetromino().shape,
  collided: false,
});

const usePlayer = () => {
  const [player, setPlayer] = useState<IPlayer>({
    ...initialPlayerFeatures(),
    tetromino: TETROMINOS[0].shape,
  });

  console.log({ player });

  const rotate = (matrix: any[], direction: number) => {
    const transposedTetromino = matrix.map((_, index) =>
      matrix.map((column: any) => column[index])
    );

    if (direction > 0) {
      return transposedTetromino.map((row) => row.reverse());
    }

    return transposedTetromino.reverse();
  };

  const rotateTetromino = (stage: any, direction: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);
    const pos = player.position.x;
    let offset = 1;

    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset; // if collision
      offset = -(offset + (offset > 0 ? 1 : -1)); // if still collision add more offset left or right

      if (offset > clonedPlayer.tetromino[0].length) {
        // rotate(clonedPlayer.tetromino, -direction);
        clonedPlayer.position.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updateTetrominorPosition = ({ x, y }: IPosition, collided: boolean) => {
    setPlayer((prev) => ({
      ...prev,
      position: { x: (prev.position.x += x), y: (prev.position.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer(initialPlayerFeatures());
  }, []);

  return [
    player,
    updateTetrominorPosition,
    resetPlayer,
    rotateTetromino,
  ] as const;
};

export default usePlayer;
