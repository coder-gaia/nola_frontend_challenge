import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Card,
  HeaderRow,
  ChartWrap,
  Loading,
  Empty,
} from "../styles/LowMarginProductsStyles";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function LowMarginProducts({ start, end }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/analytics/low-margin-products", {
        params: { start, end, cost_pct: 0.65 },
      });

      console.log(
        "RAW low-margin response sample:",
        (res.data.data || []).slice(0, 8)
      );

      const items = (res.data.data || []).map((item) => {
        const parseNum = (val) => {
          if (val === null || val === undefined) return null;
          if (typeof val === "number") return val;
          if (typeof val === "string") {
            const cleaned = val.replace(",", ".").replace(/[^\d.-]/g, "");
            const num = parseFloat(cleaned);
            return isNaN(num) ? null : num;
          }
          return null;
        };

        const avgPrice = parseNum(item.avg_price);
        const avgCost = parseNum(item.avg_cost);
        const totalRevenue = parseNum(item.total_revenue);
        const totalSold = parseNum(item.total_sold);
        const rawMargin = parseNum(item.margin_percent);

        // Escolhe valores usados
        const avgPriceUsed =
          avgPrice && avgPrice > 0
            ? avgPrice
            : totalSold && totalRevenue
            ? totalRevenue / totalSold
            : null;

        const costPct = 0.65;
        const avgCostUsed =
          avgCost && avgCost > 0
            ? avgCost
            : avgPriceUsed
            ? avgPriceUsed * costPct
            : null;

        // Cálculo de margem seguro
        let marginPercent = 0;
        if (avgPriceUsed && avgPriceUsed > 0 && avgCostUsed !== null) {
          marginPercent = ((avgPriceUsed - avgCostUsed) / avgPriceUsed) * 100;
        } else if (rawMargin !== null) {
          marginPercent = rawMargin <= 1 ? rawMargin * 100 : rawMargin;
        }

        // Corrige margens absurdas
        const marginClamped = Number(marginPercent.toFixed(2));

        return {
          ...item,
          _avg_price_used: avgPriceUsed,
          _avg_cost_used: avgCostUsed,
          margin_percent: marginClamped,
        };
      });

      console.log("PROCESSED low-margin sample:", items.slice(0, 8));

      // Ordena da menor margem para a maior
      const sorted = [...items].sort(
        (a, b) => a.margin_percent - b.margin_percent
      );

      setData(sorted.slice(0, 10));
    } catch (err) {
      console.error("Erro ao buscar produtos de baixa margem:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [start, end]);

  return (
    <Card>
      <HeaderRow>
        <h3>Produtos com Menor Margem</h3>
      </HeaderRow>

      <ChartWrap>
        {loading ? (
          <Loading>Carregando...</Loading>
        ) : data.length === 0 ? (
          <Empty>Nenhum dado disponível</Empty>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[0, "auto"]}
                tickFormatter={(v) => `${v.toFixed(1)}%`}
              />
              <YAxis
                dataKey="product_name"
                type="category"
                width={180}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(v) => `${v.toFixed(1)}%`}
                labelFormatter={(label) => `Produto: ${label}`}
              />
              <Bar
                dataKey="margin_percent"
                fill="#f97316"
                radius={[0, 6, 6, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartWrap>
    </Card>
  );
}

export default LowMarginProducts;
