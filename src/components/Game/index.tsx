import React, { useState } from 'react';
import Stage, { StageType } from '../Stage';
import { StyledGameWrapper, StyledGame } from './Styles';
import usePlayer from '../../hooks/usePlayer';
import useStage from '../../hooks/useStage';
import { createStage } from '../Stage/createStage';
import { checkCollision } from '../Stage/createStage';
import useInterval from '../../hooks/useInterval';
import { useGameStatus } from '../../hooks/useGameStatus';
import ScoreBoard from '../ScoreBoard';
import { Direction, KeysActions, STARTING_LEVEL, EMPTY } from '../../constants';
import { calculateDropTime } from '../../utils/time';

type KeyAction = () => void;

const Game: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
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
    setScore(EMPTY);
    setRows(EMPTY);
    setLevel(STARTING_LEVEL);
  };

  const moveTetrominoHorizontally = (direction: Direction) => {
    const moveToPosition = { x: direction, y: 0 };

    if (!checkCollision(player, stage, moveToPosition)) {
      updateTetrominoPosition(moveToPosition, false);
    }
  };

  const moveTetrominoDownAndCheckLevelAndGameStatus = () => {
    const nextLevel = rows > level * 2;

    if (nextLevel) {
      setLevel((level) => level + 1);
      setDropTime(calculateDropTime(level));
    }

    const moveDownOnce = { x: 0, y: 1 };
    const collision = checkCollision(player, stage, moveDownOnce);

    if (collision) {
      const collisionOnTheTopOfTheStage = player.position.y < 1;
      if (collisionOnTheTopOfTheStage) {
        setGameOver(true);
        setDropTime(null);
      }

      const dontMove = { x: 0, y: 0 };
      updateTetrominoPosition(dontMove, true);

      return;
    }
    updateTetrominoPosition(moveDownOnce, false);
  };

  const dropTetromino = () => {
    setDropTime(null);
    moveTetrominoDownAndCheckLevelAndGameStatus();
  };

  const keyActions = (stage: StageType): { [key: string]: KeyAction } => ({
    [KeysActions.ARROW_LEFT]: () => moveTetrominoHorizontally(Direction.LEFT),
    [KeysActions.ARROW_RIGHT]: () => moveTetrominoHorizontally(Direction.RIGHT),
    [KeysActions.ARROW_DOWN]: () => dropTetromino(),
    [KeysActions.ARROW_UP]: () => rotateTetromino(stage, Direction.RIGHT),
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (gameOver) {
      return;
    }

    const { key } = event;
    const action = keyActions(stage)[key];

    if (typeof action === 'function') {
      action();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    const { key } = event;

    if (!gameOver && key === KeysActions.ARROW_DOWN) {
      setDropTime(calculateDropTime(level));
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
        <ScoreBoard
          score={score}
          level={level}
          rows={rows}
          startGame={startGame}
        />
      </StyledGame>
    </StyledGameWrapper>
  );
};

export default Game;
