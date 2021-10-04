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

const Game: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updateTetrominoPosition, resetTetromino, rotateTetromino] =
    usePlayer();
  const [stage, setStage, clearedRows] = useStage(player, resetTetromino);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(clearedRows);

  useInterval(() => {
    moveTetrominoDown();
  }, dropTime);

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000 / level + 200);
    resetTetromino();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(1);
  };

  const movePlayerHorizontally = (direction: Direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updateTetrominoPosition({ x: direction, y: 0 }, false);
    }
  };

  const moveTetrominoDown = () => {
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / level + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updateTetrominoPosition({ x: 0, y: 1 }, false);
    } else {
      if (player.position.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
      }
      updateTetrominoPosition({ x: 0, y: 0 }, true);
    }
  };

  const dropTetromino = () => {
    setDropTime(null);
    moveTetrominoDown();
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
      setDropTime(1000);
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
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <>
              <Display text="GameOver" />
              <button onClick={startGame}>START</button>
            </>
          ) : (
            <>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`level: ${level}`} />
              <button onClick={startGame}>START</button>
            </>
          )}
        </aside>
      </StyledGame>
    </StyledGameWrapper>
  );
};

export default Game;
