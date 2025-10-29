import { Card } from "../styles/FinancialOverviewStyles";
import { formatBRL } from "../utils/format";

function FinancialOverview({ data }) {
  if (!data) return null;

  const totalRevenue = Number(data.total_revenue) || 0;
  const estimatedProfit = Number(data.estimated_profit) || 0;
  const profitMargin =
    totalRevenue > 0 ? (estimatedProfit / totalRevenue) * 100 : 0;

  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>Financial Overview</h3>
      <div className="grid">
        <div>
          <strong>Receita Total</strong>
          <span>{formatBRL(totalRevenue)}</span>
        </div>
        <div>
          <strong>Pedidos</strong>
          <span>{data.total_orders?.toLocaleString("pt-BR") ?? "—"}</span>
        </div>
        <div>
          <strong>Ticket Médio</strong>
          <span>{formatBRL(data.avg_ticket)}</span>
        </div>
        <div>
          <strong>Lucro Estimado</strong>
          <span>{formatBRL(estimatedProfit)}</span>
        </div>
        <div>
          <strong>Margem de Lucro</strong>
          <span>{profitMargin.toFixed(2)}%</span>
        </div>
      </div>
    </Card>
  );
}

export default FinancialOverview;
