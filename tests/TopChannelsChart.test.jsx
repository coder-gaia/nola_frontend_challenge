import { render } from "@testing-library/react";
import TopChannelsCart from "../src/components/TopChannelsCart";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

describe("TopChannelsCart", () => {
  const mockData = [
    { channel_name: "Canal A", total_revenue: "R$ 5.000,00" },
    { channel_name: "Canal B", total_revenue: "R$ 3.000,00" },
  ];

  it("renderiza título corretamente", () => {
    const { getByText } = render(<TopChannelsCart data={mockData} />);
    expect(getByText(/Channels/i)).toBeInTheDocument();
  });

  it("renderiza container do gráfico quando há dados", () => {
    const { container } = render(<TopChannelsCart data={mockData} />);
    const chartContainer = container.querySelector(
      ".recharts-responsive-container"
    );
    expect(chartContainer).toBeInTheDocument();
  });

  it("renderiza container mesmo quando não há dados", () => {
    const { container } = render(<TopChannelsCart data={[]} />);
    const chartContainer = container.querySelector(
      ".recharts-responsive-container"
    );
    expect(chartContainer).toBeInTheDocument();
  });
});
