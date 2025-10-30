import { useEffect, useState, useCallback } from "react";
import { BottomGrid, ChartsRow, Grid, Page } from "../styles/DashboardStyles";
import Header from "../components/Header";
import Filters from "../components/Filters";
import KpiCard from "../components/KpiCard";
import TopProductsChart from "../components/TopProductsChart";
import TopChannelsCart from "../components/TopChannelsCart";
import TopStoresChart from "../components/TopStoresChart";
import FinancialOverview from "../components/FinancialOverview";
import api from "../services/api";
import CostumerRetention from "../components/CostumerRetention";
import AvgTicketComparison from "../components/AvgTicketComparison";
import LowMarginProducts from "../components/LowMarginProducts";
import DeliveryPerformance from "../components/DeliveryPerfomance";
import InsightsCard from "../components/InsightCard";
import { layout as initialLayout } from "../config/dashboardLayout.json";
import LayoutEditor from "../components/LayoutEditor";
import Timelinechart from "../components/TimeLineChart";

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
  const [layout, setLayout] = useState(
    JSON.parse(localStorage.getItem("dashboardLayout")) || initialLayout
  );
  const [showLayoutEditor, setShowLayoutEditor] = useState(false);

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
      const diffDays =
        (new Date(end).getTime() - new Date(start).getTime()) /
        (1000 * 60 * 60 * 24);

      const prevEnd = new Date(start);
      const prevStart = new Date(start);
      prevStart.setDate(prevStart.getDate() - diffDays);
      prevEnd.setDate(prevEnd.getDate() - 1);

      const [sumRes, prevSumRes, tlRes, prodRes, chRes, stRes, finRes, retRes] =
        await Promise.all([
          api.get("/analytics/summary", { params: { start, end } }),
          api.get("/analytics/summary", {
            params: {
              start: prevStart.toISOString().slice(0, 10),
              end: prevEnd.toISOString().slice(0, 10),
            },
          }),
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

      const current = sumRes.data.data;
      const previous = prevSumRes.data.data;

      const calcVariation = (curr, prev) => {
        if (!prev || prev === 0) return 0;
        return ((curr - prev) / prev) * 100;
      };

      const summaryData = {
        totals: current.totals,
        variations: {
          total_sales: calcVariation(
            current.totals.total_sales,
            previous.totals.total_sales
          ),
          total_revenue: calcVariation(
            current.totals.total_revenue,
            previous.totals.total_revenue
          ),
          avg_ticket: calcVariation(
            current.totals.avg_ticket,
            previous.totals.avg_ticket
          ),
        },
      };

      setSummary(summaryData);
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

  const renderSection = (section) => {
    switch (section) {
      case "summary":
        return (
          <Grid key="summary">
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
        );

      case "timeline_channels":
        return (
          <ChartsRow key="timeline_channels">
            <Timelinechart data={timeline} />
            <TopChannelsCart data={topChannels} />
          </ChartsRow>
        );

      case "products_financial":
        return (
          <div
            key="products_financial"
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
        );

      case "low_margin_retention":
        return (
          <BottomGrid key="low_margin_retention" style={{ marginTop: 16 }}>
            <LowMarginProducts start={start} end={end} />
            <CostumerRetention data={customerRetention} />
          </BottomGrid>
        );

      case "avg_ticket":
        return (
          <BottomGrid key="avg_ticket">
            <AvgTicketComparison start={start} end={end} />
          </BottomGrid>
        );

      case "stores_delivery":
        return (
          <BottomGrid key="stores_delivery">
            <DeliveryPerformance start={start} end={end} />
            <InsightsCard
              summary={summary}
              timeline={timeline}
              topChannels={topChannels}
            />
          </BottomGrid>
        );

      case "insights":
        return (
          <BottomGrid key="insights">
            <TopStoresChart data={topStores} />
          </BottomGrid>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <Page>
        {showLayoutEditor && (
          <LayoutEditor
            layout={layout}
            setLayout={setLayout}
            onClose={() => setShowLayoutEditor(false)}
          />
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Dashboard</h2>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setShowLayoutEditor(true)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 20,
                color: "#555",
                transition: "color 0.2s ease",
                height: 32,
                width: 32,
                borderRadius: "50%",
              }}
              title="Editar Layout"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              ⚙️
            </button>

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
        </div>

        {layout.map((section) => renderSection(section))}
      </Page>
    </div>
  );
}

export default Dashboard;
