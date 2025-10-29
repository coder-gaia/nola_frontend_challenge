import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Card,
  HeaderRow,
  Select,
  ChartWrap,
  Loading,
  Empty,
} from "../styles/AvgTicketComparisonStyles";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function AvgTicketComparison({ start, end }) {
  const [groupBy, setGroupBy] = useState("channel");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/analytics/avg-ticket-comparison", {
        params: { start, end, group_by: groupBy },
      });
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [start, end, groupBy]);

  return (
    <Card>
      <HeaderRow>
        <h3>Comparativo de Ticket Médio</h3>
        <Select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="channel">Por Canal</option>
          <option value="store">Por Loja</option>
        </Select>
      </HeaderRow>

      <ChartWrap>
        {loading ? (
          <Loading>Carregando...</Loading>
        ) : data.length === 0 ? (
          <Empty>Nenhum dado disponível</Empty>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 16, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="group_name"
                angle={-25}
                textAnchor="end"
                height={70}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(v) =>
                  `R$ ${v.toLocaleString("pt-BR", {
                    minimumFractionDigits: 0,
                  })}`
                }
              />
              <Tooltip
                formatter={(v) =>
                  `R$ ${v.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}`
                }
              />
              <Bar dataKey="avg_ticket" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartWrap>
    </Card>
  );
}

export default AvgTicketComparison;
