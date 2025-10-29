import styled from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #111827;
  }
`;

export const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
`;

export const MetricBox = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h4 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #111827;
  }

  span {
    font-size: 0.85rem;
    color: #6b7280;
  }
`;

export const Loading = styled.div`
  text-align: center;
  color: #6b7280;
  padding: 40px 0;
`;

export const Empty = styled.div`
  text-align: center;
  color: #9ca3af;
  padding: 40px 0;
`;
