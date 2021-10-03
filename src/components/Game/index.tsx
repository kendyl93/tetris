import React, { useState } from "react";
import Stage from "../Stage";
import { StyledGameWrapper, StyledGame } from "./Styles";
import Display from "../Display";
import usePlayer from "../../hooks/usePlayer";
import useStage from "../../hooks/useStage";
import { createStage } from "../Stage/createStage";
import { checkCollision } from "../Stage/createStage";

const Game: React.FC = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updateTetrominorPosition, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const movePlayerHorizontally = (direction: number) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updateTetrominorPosition({ x: direction, y: 0 }, false);
    }
  };

  const movePlayerDown = () => {
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;

    if (!gameOver) {
      if (key === "ArrowLeft") {
        return movePlayerHorizontally(-1);
      } else if (key === "ArrowRight") {
        return movePlayerHorizontally(1);
      } else if (key === "ArrowDown") {
        return movePlayerDown();
      }
    }
  };

  return (
    <StyledGameWrapper role="button" tabIndex={0} onKeyDown={handleKeyDown}>
      <StyledGame>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display text="GameOver" />
          ) : (
            <>
              <Display text="Score" />
              <Display text="level" />
              <button onClick={startGame}>START</button>
            </>
          )}
        </aside>
      </StyledGame>
    </StyledGameWrapper>
  );
};

export default Game;
