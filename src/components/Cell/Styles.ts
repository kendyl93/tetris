import styled from "styled-components";

interface Props {
  color: string;
  type: string | number;
}

export const StyledCell = styled.div<Props>`
  width: auto;
  background: rgba(${({ color }) => color}, 0.8);
  border: 4px solid;
  border-top-color: ${({ color }) => `rgba(${color}, 0.65)`};
  border-left-color: ${({ color }) => `rgba(${color}, 0.9)`};
  border-right-color: ${({ color }) => `rgba(${color}, 0.1)`};
  border-bottom-color: ${({ color }) => `rgba(${color}, 0.65)`};
`;
