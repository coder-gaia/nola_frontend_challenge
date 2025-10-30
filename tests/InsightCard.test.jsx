import { render, screen } from "@testing-library/react";
import InsightsCard from "../src/components/InsightCard";

describe("InsightsCard", () => {
  const summary = {
    variations: {
      total_sales: 10,
      total_revenue: 15.5,
      avg_ticket: -2.3,
    },
  };

  const timeline = {};
  const topChannels = [
    { channel_name: "Canal A", total_revenue: 5000 },
    { channel_name: "Canal B", total_revenue: 3000 },
  ];

  it("renderiza título corretamente", () => {
    render(
      <InsightsCard
        summary={summary}
        timeline={timeline}
        topChannels={topChannels}
      />
    );
    expect(screen.getByText(/Análise Automática/i)).toBeInTheDocument();
  });

  it("exibe mensagem de loading quando não há dados completos", () => {
    render(<InsightsCard summary={null} timeline={null} topChannels={null} />);
    expect(screen.getByText(/Carregando insights.../i)).toBeInTheDocument();
  });

  it("renderiza insights corretamente com dados fornecidos", () => {
    render(
      <InsightsCard
        summary={summary}
        timeline={timeline}
        topChannels={topChannels}
      />
    );
    const insightText = screen.getByText(/As vendas cresceram/i);
    expect(insightText).toBeInTheDocument();
    expect(insightText.innerHTML).toContain("🚀");
    expect(insightText.innerHTML).toContain("🛒");
    expect(insightText.innerHTML).toContain(
      "⭐ O canal com melhor performance foi <b>Canal A</b>"
    );
  });

  it("renderiza insights corretamente com valores negativos", () => {
    const negativeSummary = {
      variations: {
        total_sales: -5,
        total_revenue: -10,
        avg_ticket: 0,
      },
    };
    render(
      <InsightsCard
        summary={negativeSummary}
        timeline={timeline}
        topChannels={topChannels}
      />
    );
    const insightText = screen.getByText(/A receita caiu/i);
    expect(insightText).toBeInTheDocument();
    expect(insightText.innerHTML).toContain("📉");
    expect(insightText.innerHTML).toContain(
      "⭐ O canal com melhor performance foi <b>Canal A</b>"
    );
  });
});
