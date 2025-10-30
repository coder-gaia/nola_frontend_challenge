import styled from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
  }
`;

export const ChartWrap = styled.div`
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
`;

export const Empty = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
`;

export const ExportButton = styled.button`
  background: #f97316;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ea580c;
  }
`;
