import React from "react";
import { StyledDisplay } from "./Styles";

interface Props {
  text: string;
  value: number;
}

const Display: React.FC<Props> = ({ text, value }) => (
  <StyledDisplay>
    <div className="text">{text}:</div>
    <div className="value">{value}</div>
  </StyledDisplay>
);

export default Display;
