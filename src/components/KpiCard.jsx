import { Card, Title, Value } from "../styles/KpiCardStyles";

function KpiCard({ title, value, subtitle }) {
  return (
    <Card>
      <Title>{title}</Title>
      <Value>{value}</Value>
      {subtitle && (
        <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>
          {subtitle}
        </div>
      )}
    </Card>
  );
}

export default KpiCard;
