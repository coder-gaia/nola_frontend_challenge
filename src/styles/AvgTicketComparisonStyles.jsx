import styled from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--text-primary);
  }
`;

export const Select = styled.select`
  appearance: none;
  border: 1px solid rgba(16, 24, 40, 0.06);
  background: var(--card);
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--text-primary);
  outline: none;

  &:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
    border-color: rgba(59, 130, 246, 0.6);
  }
`;

export const ChartWrap = styled.div`
  flex: 1 1 auto;
  min-height: 260px; /* altura do gráfico */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  color: var(--muted);
  font-size: 0.95rem;
`;

export const Empty = styled.div`
  color: var(--muted);
  font-size: 0.95rem;
  text-align: center;
  padding: 20px 8px;
`;
