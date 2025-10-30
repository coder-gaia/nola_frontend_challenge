import { render, screen } from "@testing-library/react";
import CostumerRetention from "../src/components/CostumerRetention";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

describe("CostumerRetention", () => {
  const mockData = {
    active_customers: 50,
    returning_customers: 30,
    churned_customers: 20,
    retention_rate: 75.5,
    average_days_between_orders: 10.3,
  };

  it("renderiza título corretamente", () => {
    render(<CostumerRetention data={mockData} />);
    expect(screen.getByText(/Retenção de Clientes/i)).toBeInTheDocument();
  });

  it("renderiza gráfico quando há dados", () => {
    const { container } = render(<CostumerRetention data={mockData} />);
    const chartContainer = container.querySelector(
      ".recharts-responsive-container"
    );
    expect(chartContainer).toBeInTheDocument();
  });

  it("renderiza estatísticas corretamente", () => {
    render(<CostumerRetention data={mockData} />);
    expect(screen.getByText(/75.5%/i)).toBeInTheDocument();
    expect(screen.getByText(/10.3 dias/i)).toBeInTheDocument();
  });

  it("não renderiza nada quando não há dados", () => {
    const { container } = render(<CostumerRetention data={null} />);
    expect(container.firstChild).toBeNull();
  });
});
