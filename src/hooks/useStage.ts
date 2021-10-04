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
          cellValue,
          `${player.collided ? "merged" : "clear"}`,
        ];
      }
    })
  );
};

const updateStage = (
  player: IPlayer,
  previousStage: any,
  resetTetromino: any,
  setClearRows: any
) => {
  const newStage = drawStage(previousStage);
  drawTetrominor(player, newStage);

  if (player.collided) {
    resetTetromino();
    debugger;
    return sweepRows(newStage, setClearRows);
  }

  return newStage;
};

const sweepRows = (newStage: any, setClearRows: any) => {
  return newStage.reduce((acc: any, row: any) => {
    if (row.findIndex((cell: any) => cell[0] === 0) === -1) {
      setClearRows((prev: any) => prev + 1);
      acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));
      return acc;
    }

    acc.push(row);
    return acc;
  }, []);
};

const useStage = (player: IPlayer, resetTetromino: any) => {
  const [stage, setStage] = useState<any>(createStage());
  const [clearedRows, setClearedRows] = useState(0);

  console.log({ stage });

  useEffect(() => {
    setClearedRows(0);

    setStage((prev: any) =>
      updateStage(player, prev, resetTetromino, setClearedRows)
    );
  }, [player]);

  return [stage, setStage, clearedRows] as const;
};

export default useStage;
