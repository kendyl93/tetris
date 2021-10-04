import styled from "styled-components";

interface Props {
  height: number;
  width: number;
}

export const StyledStage = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(
    ${({ height }) => height},
    calc(25vw / ${({ width }) => width})
  );
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-gap: 1px;
  border 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
  position: relative;
`;
