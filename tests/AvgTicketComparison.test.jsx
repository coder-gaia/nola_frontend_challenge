import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AvgTicketComparison from "../src/components/AvgTicketComparison";
import api from "../src/services/api";

vi.mock("../src/services/api");

describe("AvgTicketComparison", () => {
  const mockData = [
    { group_name: "Canal 1", avg_ticket: 1000 },
    { group_name: "Canal 2", avg_ticket: 2000 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza título e select", () => {
    render(<AvgTicketComparison start="2023-01-01" end="2023-01-31" />);
    expect(
      screen.getByText(/Comparativo de Ticket Médio/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("mostra loading enquanto carrega dados", async () => {
    api.get.mockResolvedValueOnce({ data: { data: [] } });
    render(<AvgTicketComparison start="2023-01-01" end="2023-01-31" />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));
  });

  it("mostra mensagem de 'Nenhum dado disponível' quando a API retorna vazio", async () => {
    api.get.mockResolvedValueOnce({ data: { data: [] } });
    render(<AvgTicketComparison start="2023-01-01" end="2023-01-31" />);
    await screen.findByText(/Nenhum dado disponível/i);
  });

  it("chama API corretamente quando há dados", async () => {
    api.get.mockResolvedValueOnce({ data: { data: mockData } });
    render(<AvgTicketComparison start="2023-01-01" end="2023-01-31" />);
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));
  });

  it("altera groupBy ao mudar select e chama API novamente", async () => {
    api.get.mockResolvedValue({ data: { data: mockData } });
    render(<AvgTicketComparison start="2023-01-01" end="2023-01-31" />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "store");

    await waitFor(() =>
      expect(api.get).toHaveBeenCalledWith("/analytics/avg-ticket-comparison", {
        params: { start: "2023-01-01", end: "2023-01-31", group_by: "store" },
      })
    );
  });
});
