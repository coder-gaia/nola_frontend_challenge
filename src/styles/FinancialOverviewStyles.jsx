import styled from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-top: 16px;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-top: 12px;
  }

  strong {
    display: block;
    color: var(--text-secondary);
    font-size: 14px;
  }

  span {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
  }
`;
