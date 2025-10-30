import { render, screen } from "@testing-library/react";
import FinancialOverview from "../src/components/FinancialOverview";

const mockData = {
  total_revenue: "1000",
  estimated_profit: "250",
  total_orders: 10,
  avg_ticket: 100,
};

const formatText = (text) => (content) =>
  content.replace(/\s/g, "") === text.replace(/\s/g, "");

describe("FinancialOverview", () => {
  it("renderiza corretamente com dados", () => {
    render(<FinancialOverview data={mockData} />);

    expect(screen.getByText(/Financial Overview/i)).toBeInTheDocument();
    expect(screen.getByText(formatText("R$ 1.000,00"))).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText(formatText("R$ 100,00"))).toBeInTheDocument();
    expect(screen.getByText(formatText("R$ 250,00"))).toBeInTheDocument();
    expect(screen.getByText(formatText("25.00%"))).toBeInTheDocument();
  });

  it("não renderiza nada quando data é null", () => {
    const { container } = render(<FinancialOverview data={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("lida com valores faltantes sem quebrar", () => {
    const partialData = { total_revenue: "0" };
    render(<FinancialOverview data={partialData} />);

    // Agora usamos getAllByText para os valores repetidos
    expect(screen.getAllByText(formatText("R$ 0,00"))).toHaveLength(3);
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.getByText(formatText("0.00%"))).toBeInTheDocument();
  });
});
