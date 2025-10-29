import { Card } from "../styles/TopChannelsStyles.jsx";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { parseBRL, formatBRL } from "../utils/format";

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

function TopChannelsCart({ data }) {
  const chartData = (data || []).map((r, idx) => ({
    name: r.channel_name,
    value: parseBRL(r.total_revenue),
  }));

  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>Channels</h3>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
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
              formatter={(value, name, props) => [
                formatBRL(value),
                `${props.payload.name} (${(
                  (value / chartData.reduce((sum, c) => sum + c.value, 0)) *
                  100
                ).toFixed(1)}%)`,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default TopChannelsCart;
