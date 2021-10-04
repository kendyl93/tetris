import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  padding: 10px 0;
  letter-spacing: 0.2em;
  font-size: 1.2em;
  font-weight: 500;
  color: #1c1c1c;
  border: solid 1px #1c1c1c;
  transition-property: border-color, background-color, color;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  &:hover {
    cursor: pointer;
    color: #ececec;
    background: #808080;
    border-color: #808080;
  }
`;
