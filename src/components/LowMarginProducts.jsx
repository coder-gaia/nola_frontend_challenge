import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Card,
  HeaderRow,
  ChartWrap,
  Loading,
  Empty,
  ExportButton,
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
    if (!start || !end) return;
    setLoading(true);
    try {
      const res = await api.get("/analytics/low-margin-products", {
        params: { start, end, cost_pct: 0.65 },
        headers: { "Cache-Control": "no-cache" },
      });

      const items = (res.data.data || []).map((item) => {
        const parseNum = (val) => {
          if (val == null) return null;
          if (typeof val === "number") return val;
          if (typeof val === "string") {
            const cleaned = val
              .trim()
              .replace(/\s/g, "")
              .replace(",", ".")
              .replace(/[^\d.-]/g, "");
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

        let marginPercent = 0;
        if (avgPriceUsed && avgPriceUsed > 0 && avgCostUsed !== null) {
          marginPercent = ((avgPriceUsed - avgCostUsed) / avgPriceUsed) * 100;
        } else if (rawMargin !== null) {
          marginPercent = rawMargin <= 1 ? rawMargin * 100 : rawMargin;
        }

        const marginClamped = Number(marginPercent.toFixed(2));

        return {
          ...item,
          _avg_price_used: avgPriceUsed,
          _avg_cost_used: avgCostUsed,
          margin_percent: marginClamped,
        };
      });

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
    if (start && end) fetchData();
  }, [start, end]);

  const handleExportCSV = () => {
    if (!data || !data.length) return;

    const header = [
      "Produto",
      "Preço Médio (R$)",
      "Custo Médio (R$)",
      "Margem (%)",
      "Total Vendido",
      "Receita Total (R$)",
    ];

    const rows = data.map((item) => {
      const avgPrice = item.avg_price ?? item._avg_price_used ?? 0;
      const avgCost = item.avg_cost ?? item._avg_cost_used ?? 0;
      const margin = item.margin_percent ?? 0;
      const totalSold = item.total_sold ?? "";
      const totalRevenue = item.total_revenue ?? 0;

      return [
        item.product_name ?? "",
        Number(avgPrice).toFixed(2).replace(".", ","),
        Number(avgCost).toFixed(2).replace(".", ","),
        `${Number(margin).toFixed(2).replace(".", ",")} %`,
        totalSold,
        Number(totalRevenue).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        }),
      ];
    });

    console.log("CSV rows preview:", rows.slice(0, 10));

    const escapeCSV = (value) => {
      if (value === null || value === undefined) return "";
      const str = String(value);
      if (/[;"\r\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
      return str;
    };

    const lines = [header, ...rows]
      .map((r) => r.map(escapeCSV).join(";"))
      .join("\r\n");
    const csvWithBom = "\uFEFF" + lines;

    const blob = new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "produtos_baixa_margem.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <HeaderRow>
        <h3>Produtos com Menor Margem</h3>
        {!loading && data.length > 0 && (
          <ExportButton onClick={handleExportCSV}>📤 Exportar CSV</ExportButton>
        )}
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
