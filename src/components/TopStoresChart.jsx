import { Card } from "../styles/TopStoresChartStyles";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { formatBRL } from "../utils/format";

function TopStoresChart({ data }) {
  const chartData = (data || []).map((r) => ({
    name: r.store_name,
    revenue: Number(r.total_revenue),
    avg_ticket: Number(r.avg_ticket),
  }));

  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>Top Lojas por Receita</h3>
      <div style={{ height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            barCategoryGap="25%"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis
              type="number"
              tickFormatter={formatBRL}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={160}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <Tooltip formatter={(value) => formatBRL(value)} />
            <Bar
              dataKey="revenue"
              fill="var(--primary)"
              radius={[6, 6, 6, 6]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default TopStoresChart;
