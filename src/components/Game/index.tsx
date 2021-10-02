import React from "react";
import Stage from "../Stage";
import { StyledGameWrapper, StyledGame } from "./Styles";
import Display from "../Display";
import { createStage } from "../Stage/createStage";

const Game: React.FC = () => {
  return (
    <StyledGameWrapper>
      <StyledGame>
        <Stage stage={createStage()} />
        <aside>
          <Display text="Score" />
          <Display text="level" />
          <button>START</button>
        </aside>
      </StyledGame>
    </StyledGameWrapper>
  );
};

export default Game;
