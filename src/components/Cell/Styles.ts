import styled from "styled-components";

interface Props {
  color: string;
  type: string | number;
}

export const StyledCell = styled.div<Props>`
  width: auto;
  background: rgba(${({ color }) => color}, 0.8);
  border: ${({ type }) => (type === 0 ? "none" : "4px solid")};
`;
