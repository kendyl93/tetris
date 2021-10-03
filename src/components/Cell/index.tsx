import React from "react";
import { StyledCell } from "./Styles";
import { TETROMINOS } from "../../tetrominos";

interface Props {
  type: number | string;
}

const Cell: React.FC<Props> = ({ type }) => {
  const { color } = TETROMINOS[type] || {};

  return <StyledCell color={color} type={type} />;
};

export default Cell;
