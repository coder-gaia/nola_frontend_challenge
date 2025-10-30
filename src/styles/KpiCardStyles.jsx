import styled from "styled-components";

export const Card = styled.div`
  background: var(--card);
  padding: 16px;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

export const Title = styled.div`
  font-size: 13px;
  color: var(--muted);
`;

export const Value = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

export const Variation = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ positive, negative }) =>
    positive ? "#16a34a" : negative ? "#dc2626" : "var(--muted)"};

  svg {
    width: 14px;
    height: 14px;
  }
`;
