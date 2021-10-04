import React from "react";
import Display from "./Display";
import { StyledScoreBoard } from "./Styles";
import Button from "../Button";

interface Props {
  score: number;
  rows: number;
  level: number;
  startGame: () => void;
}

const ScoreBoard: React.FC<Props> = ({ score, rows, level, startGame }) => (
  <StyledScoreBoard>
    <Display text="Score" value={score} />
    <Display text="Rows" value={rows} />
    <Display text="Level" value={level} />
    <Button onClick={startGame}>START</Button>
  </StyledScoreBoard>
);

export default ScoreBoard;
