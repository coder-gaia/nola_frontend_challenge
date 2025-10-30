import { render, screen, waitFor } from "@testing-library/react";
import DeliveryPerformance from "../src/components/DeliveryPerfomance";
import api from "../src/services/api";

vi.mock("../src/services/api");

describe("DeliveryPerformance", () => {
  const mockData = [
    {
      avg_delivery_minutes: 35.2,
      on_time_rate: 92.5,
      total_orders: 1200,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza título corretamente", () => {
    render(<DeliveryPerformance start="2023-01-01" end="2023-01-31" />);
    expect(screen.getByText(/Performance de Entregas/i)).toBeInTheDocument();
  });

  it("mostra loading enquanto carrega dados", async () => {
    api.get.mockResolvedValueOnce({ data: { data: [] } });
    render(<DeliveryPerformance start="2023-01-01" end="2023-01-31" />);
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));
  });

  it("mostra mensagem de 'Nenhum dado disponível' quando não há dados", async () => {
    api.get.mockResolvedValueOnce({ data: { data: [] } });
    render(<DeliveryPerformance start="2023-01-01" end="2023-01-31" />);
    await waitFor(() =>
      expect(screen.getByText(/Nenhum dado disponível/i)).toBeInTheDocument()
    );
  });

  it("renderiza métricas corretamente quando há dados", async () => {
    api.get.mockResolvedValueOnce({ data: { data: mockData } });
    render(<DeliveryPerformance start="2023-01-01" end="2023-01-31" />);

    await waitFor(() =>
      expect(screen.queryByText(/Carregando/i)).not.toBeInTheDocument()
    );

    expect(screen.getByText(/35\.2 min/i)).toBeInTheDocument();
    expect(screen.getByText(/92\.5%/i)).toBeInTheDocument();
    expect(screen.getByText(/1\.200/i)).toBeInTheDocument();
  });
});
