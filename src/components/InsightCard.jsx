import { useEffect, useState } from "react";

function InsightsCard({ summary, timeline, topChannels }) {
  const [insight, setInsight] = useState("");

  useEffect(() => {
    if (!summary || !timeline || !topChannels) return;

    const salesVar = summary.variations?.total_sales ?? 0;
    const revenueVar = summary.variations?.total_revenue ?? 0;
    const avgTicketVar = summary.variations?.avg_ticket ?? 0;

    const bestChannel = [...topChannels].sort(
      (a, b) => b.total_revenue - a.total_revenue
    )[0];

    let message = "";

    if (revenueVar > 0)
      message += `🚀 As vendas cresceram <b>${revenueVar.toFixed(
        1
      )}%</b> em relação ao período anterior. `;
    else if (revenueVar < 0)
      message += `📉 A receita caiu <b>${Math.abs(revenueVar).toFixed(
        1
      )}%</b>, indicando possível desaceleração. `;
    else message += `📊 A receita se manteve estável no período. `;

    if (avgTicketVar > 0)
      message += `💰 O ticket médio aumentou <b>${avgTicketVar.toFixed(
        1
      )}%</b>, sugerindo maior valor por pedido. `;
    else if (avgTicketVar < 0)
      message += `🛒 O ticket médio reduziu <b>${Math.abs(avgTicketVar).toFixed(
        1
      )}%</b>, sugerindo compras menores. `;

    if (bestChannel)
      message += `⭐ O canal com melhor performance foi <b>${
        bestChannel.channel_name
      }</b>, com receita total de <b>R$ ${bestChannel.total_revenue.toLocaleString(
        "pt-BR",
        { minimumFractionDigits: 2 }
      )}</b>.`;

    setInsight(message);
  }, [summary, timeline, topChannels]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.04)",
        transition: "all 0.3s ease",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "1.6rem",
            lineHeight: "1",
          }}
        >
          🔎
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Análise Automática
        </h3>
      </div>

      <p
        style={{
          fontSize: "0.95rem",
          color: "#374151",
          lineHeight: 1.6,
          margin: 0,
        }}
        dangerouslySetInnerHTML={{
          __html: insight || "Carregando insights...",
        }}
      />
    </div>
  );
}

export default InsightsCard;
