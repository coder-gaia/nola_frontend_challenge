import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LowMarginProducts from "../src/components/LowMarginProducts";
import api from "../src/services/api";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

// Troque jest.mock por vi.mock
vi.mock("../src/services/api");

describe("LowMarginProducts", () => {
  const mockData = [
    {
      product_name: "Produto A",
      avg_price: 10,
      avg_cost: 7,
      total_revenue: 100,
      total_sold: 10,
      margin_percent: 30,
    },
    {
      product_name: "Produto B",
      avg_price: 20,
      avg_cost: 15,
      total_revenue: 200,
      total_sold: 10,
      margin_percent: 25,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mostra loading enquanto busca dados", async () => {
    api.get.mockResolvedValue({ data: { data: [] } });
    render(<LowMarginProducts start="2025-01-01" end="2025-01-31" />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
    await waitFor(() => expect(api.get).toHaveBeenCalled());
  });

  it("mostra mensagem de vazio quando não há dados", async () => {
    api.get.mockResolvedValue({ data: { data: [] } });
    render(<LowMarginProducts start="2025-01-01" end="2025-01-31" />);
    await waitFor(() =>
      expect(screen.getByText(/Nenhum dado disponível/i)).toBeInTheDocument()
    );
  });

  it("renderiza gráfico quando há dados", async () => {
    api.get.mockResolvedValue({ data: { data: mockData } });
    const { container } = render(
      <LowMarginProducts start="2025-01-01" end="2025-01-31" />
    );
    await waitFor(() => {
      const chart = container.querySelector(".recharts-responsive-container");
      expect(chart).toBeInTheDocument();
    });
  });

  it("renderiza botão de exportação quando há dados", async () => {
    api.get.mockResolvedValue({ data: { data: mockData } });
    render(<LowMarginProducts start="2025-01-01" end="2025-01-31" />);
    const btn = await screen.findByText(/Exportar CSV/i);
    expect(btn).toBeInTheDocument();
  });

  it("não mostra botão de exportação se não houver dados", async () => {
    api.get.mockResolvedValue({ data: { data: [] } });
    render(<LowMarginProducts start="2025-01-01" end="2025-01-31" />);
    await waitFor(() =>
      expect(screen.queryByText(/Exportar CSV/i)).not.toBeInTheDocument()
    );
  });

  it("aciona função de exportação CSV corretamente", async () => {
    api.get.mockResolvedValue({ data: { data: mockData } });
    render(<LowMarginProducts start="2025-01-01" end="2025-01-31" />);
    const btn = await screen.findByText(/Exportar CSV/i);
    const createObjectURLSpy = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:url");
    fireEvent.click(btn);
    expect(createObjectURLSpy).toHaveBeenCalled();
    createObjectURLSpy.mockRestore();
  });
});
