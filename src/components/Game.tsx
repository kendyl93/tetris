import React from "react";
import Stage from "./Stage/Stage";
import Display from "./Display";
import { createStage } from "../components/Stage/createStage";

const Game: React.FC = () => {
  return (
    <div>
      <Stage stage={createStage()} />
      <div>
        <Display text="Score" />
        <Display text="level" />
        <button>START</button>
      </div>
    </div>
  );
};

export default Game;
