import React, { useEffect, useState } from "react";
import Stage from "../Stage";
import { StyledGameWrapper, StyledGame } from "./Styles";
import Display from "../Display";
import usePlayer from "../../hooks/usePlayer";
import useStage from "../../hooks/useStage";
import { createStage } from "../Stage/createStage";
import { checkCollision } from "../Stage/createStage";
import useInterval from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";

const Game: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updateTetrominorPosition, resetPlayer, rotateTetromino] =
    usePlayer();
  const [stage, setStage, clearedRows] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(clearedRows);

  // useInterval(() => {
  //   moveTetrominoDown();
  // }, dropTime);

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000 / level + 200);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0); //remove and use clearedRows
    setLevel(1);
  };

  const movePlayerHorizontally = (direction: number) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updateTetrominorPosition({ x: direction, y: 0 }, false);
    }
  };

  const moveTetrominoDown = () => {
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / level + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updateTetrominorPosition({ x: 0, y: 1 }, false);
    } else {
      if (player.position.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
      }
      updateTetrominorPosition({ x: 0, y: 0 }, true);
    }
  };

  const dropTetromino = () => {
    setDropTime(null);
    moveTetrominoDown();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;

    if (!gameOver) {
      if (key === "ArrowLeft") {
        return movePlayerHorizontally(-1);
      } else if (key === "ArrowRight") {
        return movePlayerHorizontally(1);
      } else if (key === "ArrowDown") {
        return dropTetromino();
      } else if (key === "ArrowUp") {
        rotateTetromino(stage, 1);
      }
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    const { key } = event;

    if (!gameOver && key === "ArrowDown") {
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
            <Display text="GameOver" />
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
