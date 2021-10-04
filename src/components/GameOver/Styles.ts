import styled from "styled-components";

export const StyledGameOver = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: red;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 9;

  .text {
    top: 50%;
    left: 50%;
    font-size: 1.2em;
    position: absolute;
    font-weight: 600;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;
