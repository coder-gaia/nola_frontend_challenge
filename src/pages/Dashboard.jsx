import { useEffect, useState, useCallback } from "react";
import { BottomGrid, ChartsRow, Grid, Page } from "../styles/DashboardStyles";
import Header from "../components/Header";
import Filters from "../components/Filters";
import KpiCard from "../components/KpiCard";
import TopProductsChart from "../components/TopProductsChart";
import TopChannelsCart from "../components/TopChannelsCart";
import TimelineChart from "../components/TimelineChart";
import TopStoresChart from "../components/TopStoresChart";
import FinancialOverview from "../components/FinancialOverview";
import api from "../services/api";
import CostumerRetention from "../components/CostumerRetention";
import AvgTicketComparison from "../components/AvgTicketComparison";
import LowMarginProducts from "../components/LowMarginProducts";
import DeliveryPerformance from "../components/DeliveryPerfomance";

function Dashboard() {
  const defaultStart = import.meta.env.VITE_DEFAULT_START;
  const defaultEnd = import.meta.env.VITE_DEFAULT_END;

  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const [channel, setChannel] = useState(null);
  const [channels, setChannels] = useState([]);
  const [summary, setSummary] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [topChannels, setTopChannels] = useState([]);
  const [topStores, setTopStores] = useState([]);
  const [financial, setFinancial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerRetention, setCustomerRetention] = useState(null);

  const fetchChannels = useCallback(async () => {
    try {
      const res = await api.get("/analytics/channel-performance", {
        params: { start, end },
      });
      const list = res.data.data.map((c, i) => ({
        id: i + 1,
        name: c.channel,
      }));
      setChannels(list);
    } catch (err) {
      console.error(err);
    }
  }, [start, end]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [sumRes, tlRes, prodRes, chRes, stRes, finRes, retRes] =
        await Promise.all([
          api.get("/analytics/summary", { params: { start, end } }),
          api.get("/analytics/sales-trend", {
            params: { start, end, group: "day" },
          }),
          api.get("/analytics/top-products", {
            params: { start, end, channel_id: channel },
          }),
          api.get("/analytics/channel-performance", { params: { start, end } }),
          api.get("/analytics/top-stores", {
            params: { start, end, channel_id: channel },
          }),
          api.get("/analytics/financial-overview", { params: { start, end } }),
          api.get("/analytics/customer-retention", {
            params: { start, end, inactive_days: 30, min_orders: 3 },
          }),
        ]);

      setSummary(sumRes.data.data);
      setTimeline(tlRes.data.data);
      setTopProducts(prodRes.data.data);
      setCustomerRetention(retRes.data.data);

      setTopChannels(
        chRes.data.data.map((r) => ({
          channel_name: r.channel,
          total_revenue: r.total_revenue ?? 0,
        }))
      );
      setTopStores(stRes.data.data);
      setFinancial(finRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [start, end, channel]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div>
      <Header />
      <Page>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <Filters
            start={start}
            end={end}
            channel={channel}
            channels={channels}
            onChange={(patch) => {
              if (patch.start) setStart(patch.start);
              if (patch.end) setEnd(patch.end);
              if ("channel" in patch) setChannel(patch.channel);
            }}
          />
        </div>

        <Grid>
          <KpiCard
            title="Total Vendas"
            value={summary?.totals?.total_sales ?? "—"}
            variation={summary?.variations?.total_sales ?? null}
          />
          <KpiCard
            title="Receita Total"
            value={
              summary?.totals?.total_revenue != null
                ? `R$ ${Number(summary.totals.total_revenue).toLocaleString(
                    "pt-BR",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`
                : "—"
            }
            variation={summary?.variations?.total_revenue ?? null}
          />
          <KpiCard
            title="Ticket Médio"
            value={
              summary?.totals?.avg_ticket != null
                ? `R$ ${Number(summary.totals.avg_ticket).toLocaleString(
                    "pt-BR",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`
                : "—"
            }
            variation={summary?.variations?.avg_ticket ?? null}
          />
        </Grid>

        <ChartsRow>
          <TimelineChart data={timeline} />
          <TopChannelsCart data={topChannels} />
        </ChartsRow>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 16,
            marginTop: 16,
          }}
        >
          <TopProductsChart data={topProducts} />
          <FinancialOverview data={financial} />
        </div>

        <BottomGrid style={{ marginTop: 16 }}>
          <LowMarginProducts start={start} end={end} />
          <CostumerRetention data={customerRetention} />
        </BottomGrid>

        <BottomGrid>
          <AvgTicketComparison start={start} end={end} />
        </BottomGrid>

        <BottomGrid>
          <TopStoresChart data={topStores} />
          <DeliveryPerformance start={start} end={end} />
        </BottomGrid>
      </Page>
    </div>
  );
}

export default Dashboard;
