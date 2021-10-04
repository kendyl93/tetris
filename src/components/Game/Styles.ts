import styled from "styled-components";

export const StyledGameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ccc;
`;

export const StyledGame = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 180px;
    display: block;
    padding: 0 20px;
  }
`;
