import React from "react";
import { StyledButton } from "./Styles";

interface Props {
  children: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

export default Button;
