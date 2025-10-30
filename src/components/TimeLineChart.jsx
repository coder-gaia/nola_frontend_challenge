import { formatBRL } from "../utils/format";
import { Card } from "../styles/TimeLine";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Timelinechart({ data }) {
  const parseBRLToNumber = (str) => {
    if (!str) return 0;
    return Number(str.replace(/[R$\s.]/g, "").replace(",", "."));
  };

  const chartData = (data || []).map((r) => ({
    period: format(new Date(r.period), "yyyy-MM-dd"),
    revenue: parseBRLToNumber(r.total_revenue),
  }));

  const compactBRL = (value) => {
    if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(1)}K`;
    return formatBRL(value);
  };

  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>Revenue Over Time</h3>
      <div style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="period"
              tick={{ fontSize: 11 }}
              tickFormatter={(d) => format(new Date(d), "MM/yy")}
            />
            <YAxis
              tickFormatter={compactBRL}
              width={80}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => formatBRL(value)}
              labelFormatter={(label) =>
                `Dia: ${format(new Date(label), "dd/MM/yyyy")}`
              }
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default Timelinechart;
