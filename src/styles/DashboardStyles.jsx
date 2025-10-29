import styled from "styled-components";

export const Page = styled.div`
  padding: 24px;
  max-width: 1280px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 18px;
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-top: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 16px;
  margin-top: 16px;
  align-items: stretch;

  & > * {
    min-height: 340px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
