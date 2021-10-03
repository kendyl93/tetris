import { useState, useCallback } from "react";
import { randomTetromino, TETROMINOS } from "../tetrominos";
import { TetrominoShape } from "../tetrominos";
import { STAGE } from "../components/Stage/contants";

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

  const updateTetrominorPosition = ({ x, y }: IPosition, collided: boolean) => {
    setPlayer((prev) => ({
      ...player,
      position: { x: (prev.position.x += x), y: (prev.position.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer(initialPlayerFeatures());
  }, []);

  return [player, updateTetrominorPosition, resetPlayer] as const;
};

export default usePlayer;
