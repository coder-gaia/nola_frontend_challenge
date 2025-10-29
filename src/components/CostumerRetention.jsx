import { Card } from "../styles/CostumerRetentionStyles";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

function CostumerRetention({ data }) {
  if (!data) return null;

  const chartData = [
    { name: "Ativos", value: data.active_customers ?? 0 },
    { name: "Retornando", value: data.returning_customers ?? 0 },
    { name: "Churned", value: data.churned_customers ?? 0 },
  ];

  return (
    <Card>
      <h3>Retenção de Clientes</h3>
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value.toLocaleString("pt-BR"), name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="stats">
        <strong>Taxa de Retenção:</strong>{" "}
        <span>{data.retention_rate?.toFixed(1)}%</span>
        <br />
        <strong>Média entre Pedidos:</strong>{" "}
        <span>{data.average_days_between_orders?.toFixed(1)} dias</span>
      </div>
    </Card>
  );
}

export default CostumerRetention;
