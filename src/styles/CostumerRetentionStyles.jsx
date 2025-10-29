import styled from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  h3 {
    margin: 0 0 8px;
    color: var(--text-primary);
  }

  .stats {
    margin-top: 12px;
    font-size: 14px;
    color: var(--text-secondary);

    strong {
      color: var(--text-primary);
    }

    span {
      color: var(--accent);
      font-weight: 600;
    }
  }
`;
