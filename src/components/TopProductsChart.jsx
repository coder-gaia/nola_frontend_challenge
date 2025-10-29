import { Card } from "../styles/TopProductsStyles";
import { parseBRL, formatBRL } from "../utils/format";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function TopProductsChart({ data }) {
  const chartData = (data || []).map((d) => ({
    product: d.product_name,
    revenue: parseBRL(d.revenue || d.total_revenue || 0),
  }));

  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>Top Produtos por Receita</h3>
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
              tickFormatter={(v) => formatBRL(v)}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="product"
              type="category"
              width={180}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <Tooltip formatter={(v) => formatBRL(v)} />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
            />
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

export default TopProductsChart;
