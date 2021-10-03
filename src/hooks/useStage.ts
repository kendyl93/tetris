import { useState, useEffect } from "react";
import { createStage } from "../components/Stage/createStage";
import { IPlayer } from "./usePlayer";
import {
  STAGE,
  NO_COLLISION_WITH_ANOTHER_TETROMINOR,
} from "../components/Stage/contants";

const drawStage = (previousStage: any) =>
  previousStage?.map((row: any) =>
    row.map((cell: any) =>
      cell[1] === NO_COLLISION_WITH_ANOTHER_TETROMINOR ? STAGE.EMPTY_CELL : cell
    )
  );

const drawTetrominor = (player: any, newStage: any) => {
  player.tetromino.map((rowValue: any, Yindex: any) =>
    rowValue.map((cellValue: any, Xindex: any) => {
      if (cellValue !== 0) {
        newStage[Yindex + player.position.y][Xindex + player.position.x] = [
          1,
          `${player.collided ? "merged" : "clear"}`,
        ];
      }
    })
  );
};

const updateStage = (player: IPlayer, previousStage: any) => {
  const newStage = drawStage(previousStage);
  drawTetrominor(player, newStage);

  return newStage;
};

const useStage = (player: IPlayer, resetPlayer: any) => {
  const [stage, setStage] = useState<any>(createStage());

  useEffect(() => {
    if (player.collided) {
      resetPlayer();
    }

    setStage((prev: any) => updateStage(player, prev));
  }, [player]);

  return [stage, setStage] as const;
};

export default useStage;
