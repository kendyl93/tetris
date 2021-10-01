import React from "react";

interface Props {
  stage: Array<Array<number | string>>;
}

const Stage: React.FC<Props> = ({ stage }) => {
  return <div>Stage</div>;
};

export default Stage;
