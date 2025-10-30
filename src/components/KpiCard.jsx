import { Card, Title, Value } from "../styles/KpiCardStyles";

function KpiCard({ title, value, variation, subtitle }) {
  const variationColor =
    variation > 0
      ? "var(--success)"
      : variation < 0
      ? "var(--danger)"
      : "var(--muted)";

  return (
    <Card>
      <Title>{title}</Title>
      <Value>{value}</Value>
      {variation != null && (
        <div style={{ color: variationColor, fontSize: 13, marginTop: 4 }}>
          {variation.toFixed(1)}%
        </div>
      )}
      {subtitle && (
        <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>
          {subtitle}
        </div>
      )}
    </Card>
  );
}

export default KpiCard;
