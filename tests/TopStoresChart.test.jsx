import { render } from "@testing-library/react";
import TopStoresChart from "../src/components/TopStoresChart";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

describe("TopStoresChart", () => {
  const mockData = [
    { store_name: "Loja A", total_revenue: 5000, avg_ticket: 250 },
    { store_name: "Loja B", total_revenue: 3000, avg_ticket: 200 },
  ];

  it("renderiza título corretamente", () => {
    const { getByText } = render(<TopStoresChart data={mockData} />);
    expect(getByText(/Top Lojas por Receita/i)).toBeInTheDocument();
  });

  it("renderiza container do gráfico quando há dados", () => {
    const { container } = render(<TopStoresChart data={mockData} />);
    const chartContainer = container.querySelector(
      ".recharts-responsive-container"
    );
    expect(chartContainer).toBeInTheDocument();
  });

  it("renderiza container mesmo quando não há dados", () => {
    const { container } = render(<TopStoresChart data={[]} />);
    const chartContainer = container.querySelector(
      ".recharts-responsive-container"
    );
    expect(chartContainer).toBeInTheDocument();
  });
});
