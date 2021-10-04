import React from "react";
import { StyledGameOver } from "./Styles";

interface Props {
  score: number;
}

const GameOver: React.FC<Props> = ({ score }) => (
  <StyledGameOver>
    <div className="text">
      <div>GAME OVER</div>
      <div>score: {score}</div>
    </div>
  </StyledGameOver>
);

export default GameOver;
