import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Card,
  HeaderRow,
  MetricsRow,
  MetricBox,
  Loading,
  Empty,
} from "../styles/DeliveryPerfomanceStyles";

function DeliveryPerformance({ start, end }) {
  const [data, setData] = useState({ channel: [] });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/analytics/delivery-performance", {
        params: { start, end, group_by: "channel" },
      });
      setData({ channel: res.data.data || [] });
    } catch (err) {
      console.error("Erro ao buscar performance de entrega:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [start, end]);

  const overall = data.channel[0] || {};

  return (
    <Card>
      <HeaderRow>
        <h3>Performance de Entregas</h3>
      </HeaderRow>

      {loading ? (
        <Loading>Carregando...</Loading>
      ) : !overall.avg_delivery_minutes ? (
        <Empty>Nenhum dado disponível</Empty>
      ) : (
        <>
          <MetricsRow>
            <MetricBox>
              <h4>{overall.avg_delivery_minutes.toFixed(1)} min</h4>
              <span>Tempo Médio de Entrega</span>
            </MetricBox>
            <MetricBox>
              <h4>{overall.on_time_rate.toFixed(1)}%</h4>
              <span>Entregas no Prazo</span>
            </MetricBox>
            <MetricBox>
              <h4>{overall.total_orders.toLocaleString()}</h4>
              <span>Total de Pedidos</span>
            </MetricBox>
          </MetricsRow>
        </>
      )}
    </Card>
  );
}

export default DeliveryPerformance;
