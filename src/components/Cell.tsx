import React from "react";

interface Props {
  cell: number | string;
}

const Cell: React.FC<Props> = ({ cell }) => {
  return <div>{cell}</div>;
};

export default Cell;
