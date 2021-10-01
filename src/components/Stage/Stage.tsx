import React from "react";

export type StageCell = Array<number | string>;
export type StageRow = Array<StageCell>;
export type Stage = Array<StageRow>;
interface Props {
  stage: Stage;
}

const Stage: React.FC<Props> = ({ stage }) => {
  return <div>Stage</div>;
};

export default Stage;
