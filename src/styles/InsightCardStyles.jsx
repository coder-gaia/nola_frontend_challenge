import styled from "styled-components";

export const Card = styled.div`
  background: var(--card);
  padding: 16px;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text);
`;

export const Text = styled.div`
  font-size: 13px;
  line-height: 1.5;
  color: var(--muted);
  white-space: pre-line;

  b,
  strong {
    color: var(--text);
    font-weight: 600;
  }
`;
