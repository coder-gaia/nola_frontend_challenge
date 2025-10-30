import { render } from "@testing-library/react";
import TopProductsChart from "../src/components/TopProductsChart";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

describe("TopProductsChart", () => {
  const mockData = [
    { product_name: "Produto A", revenue: "R$ 5.000,00" },
    { product_name: "Produto B", revenue: "R$ 3.000,00" },
  ];

  it("renderiza título corretamente", () => {
    const { getByText } = render(<TopProductsChart data={mockData} />);
    expect(getByText(/Top Produtos por Receita/i)).toBeInTheDocument();
  });

  it("renderiza container do gráfico quando há dados", () => {
    const { container } = render(<TopProductsChart data={mockData} />);
    const chartContainer = container.querySelector(
      ".recharts-responsive-container"
    );
    expect(chartContainer).toBeInTheDocument();
  });

  it("renderiza container mesmo quando não há dados", () => {
    const { container } = render(<TopProductsChart data={[]} />);
    const chartContainer = container.querySelector(
      ".recharts-responsive-container"
    );
    expect(chartContainer).toBeInTheDocument();
  });
});
