import React, { useState } from "react";
import Stage, { StageType } from "../Stage";
import { StyledGameWrapper, StyledGame } from "./Styles";
import Display from "../Display";
import usePlayer from "../../hooks/usePlayer";
import useStage from "../../hooks/useStage";
import { createStage } from "../Stage/createStage";
import { checkCollision } from "../Stage/createStage";
import useInterval from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";

enum Direction {
  LEFT = -1,
  RIGHT = 1,
}

enum KeysActions {
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
  ARROW_DOWN = "ArrowDown",
  ARROW_UP = "ArrowUp",
}

const ONE_SECOND = 1000;
const TIME_OFFSET = 200;

const calculateDropTime = (level: number) => ONE_SECOND / level + TIME_OFFSET;

const Game: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updateTetrominoPosition, resetTetromino, rotateTetromino] =
    usePlayer();
  const [stage, setStage, clearedRows] = useStage(player, resetTetromino);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(clearedRows);

  useInterval(() => {
    moveTetrominoDownAndCheckLevelAndGameStatus();
  }, dropTime);

  const startGame = () => {
    setStage(createStage());
    setDropTime(calculateDropTime(level));
    resetTetromino();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(1);
  };

  const movePlayerHorizontally = (direction: Direction) => {
    const moveToPosition = { x: direction, y: 0 };

    if (!checkCollision(player, stage, moveToPosition)) {
      updateTetrominoPosition(moveToPosition, false);
    }
  };

  const moveTetrominoDownAndCheckLevelAndGameStatus = () => {
    const nextLevel = rows > level * 5;

    if (nextLevel) {
      setLevel((level) => level + 1);
      setDropTime(calculateDropTime(level));
    }

    const moveDownOnce = { x: 0, y: 1 };
    if (!checkCollision(player, stage, moveDownOnce)) {
      updateTetrominoPosition(moveDownOnce, false);
    } else {
      if (player.position.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
      }
      const dontMove = { x: 0, y: 0 };
      updateTetrominoPosition(dontMove, true);
    }
  };

  const dropTetromino = () => {
    setDropTime(null);
    moveTetrominoDownAndCheckLevelAndGameStatus();
  };

  const keyActions = (stage: StageType): { [key: string]: () => void } => ({
    [KeysActions.ARROW_LEFT]: () => movePlayerHorizontally(Direction.LEFT),
    [KeysActions.ARROW_RIGHT]: () => movePlayerHorizontally(Direction.RIGHT),
    [KeysActions.ARROW_DOWN]: () => dropTetromino(),
    [KeysActions.ARROW_UP]: () => rotateTetromino(stage, Direction.RIGHT),
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (gameOver) {
      return;
    }

    const { key } = event;
    const action = keyActions(stage)[key];

    if (typeof action === "function") {
      action();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    const { key } = event;

    if (!gameOver && key === KeysActions.ARROW_DOWN) {
      setDropTime(ONE_SECOND);
    }
  };

  return (
    <StyledGameWrapper
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <StyledGame>
        <Stage stage={stage} gameOver={gameOver} score={score} />
        <aside>
          <Display text={`Score: ${score}`} />
          <Display text={`Rows: ${rows}`} />
          <Display text={`level: ${level}`} />
          <button onClick={startGame}>START</button>
        </aside>
      </StyledGame>
    </StyledGameWrapper>
  );
};

export default Game;
