import { useEffect, useState, useCallback } from "react";

import { ChartsRow, Grid, Page } from "../styles/DashboardStyles";
import Header from "../components/Header";
import Filters from "../components/Filters";
import KpiCard from "../components/KpiCard";
import TopProductsChart from "../components/TopProductsChart";
import TopChannelsCart from "../components/TopChannelsCart";
import TimelineChart from "../components/TimelineChart";
import TopStoresChart from "../components/TopStoresChart";
import api from "../services/api";

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
  const [loading, setLoading] = useState(false);

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
      const [sumRes, tlRes, prodRes, chRes, stRes] = await Promise.all([
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
      ]);

      setSummary(sumRes.data.data);
      setTimeline(tlRes.data.data);
      setTopProducts(prodRes.data.data);

      setTopChannels(
        chRes.data.data.map((r) => ({
          channel_name: r.channel,
          total_revenue: r.total_revenue ?? 0,
        }))
      );

      setTopStores(stRes.data.data);
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
          <div>
            <TimelineChart data={timeline} />
            <div style={{ height: 16 }} />
            <TopProductsChart data={topProducts} />
            <div style={{ height: 16 }} />
            <TopStoresChart data={topStores} />
          </div>

          <div>
            <TopChannelsCart data={topChannels} />
          </div>
        </ChartsRow>
      </Page>
    </div>
  );
}

export default Dashboard;
