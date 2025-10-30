import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KpiCard from "../src/components/KpiCard";

describe("KpiCard", () => {
  it("renderiza título e valor", () => {
    render(<KpiCard title="Total Vendas" value="100" />);
    expect(screen.getByText(/Total Vendas/i)).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renderiza variação positiva com cor de sucesso", () => {
    render(<KpiCard title="Receita" value="2000" variation={15} />);
    const variationElement = screen.getByText("15.0%");
    expect(variationElement).toBeInTheDocument();
    expect(variationElement).toHaveStyle("color: var(--success)");
  });

  it("renderiza variação negativa com cor de perigo", () => {
    render(<KpiCard title="Receita" value="2000" variation={-7.5} />);
    const variationElement = screen.getByText("-7.5%");
    expect(variationElement).toBeInTheDocument();
    expect(variationElement).toHaveStyle("color: var(--danger)");
  });

  it("renderiza variação neutra com cor de muted", () => {
    render(<KpiCard title="Receita" value="2000" variation={0} />);
    const variationElement = screen.getByText("0.0%");
    expect(variationElement).toBeInTheDocument();
    expect(variationElement).toHaveStyle("color: var(--muted)");
  });

  it("renderiza subtitle se fornecido", () => {
    render(
      <KpiCard
        title="Receita"
        value="2000"
        variation={5}
        subtitle="Comparado ao mês passado"
      />
    );
    expect(screen.getByText(/Comparado ao mês passado/i)).toBeInTheDocument();
  });

  it("não renderiza variação se for null ou undefined", () => {
    render(<KpiCard title="Receita" value="2000" />);
    const variationElements = screen.queryByText(/\d+(\.\d+)?%/);
    expect(variationElements).not.toBeInTheDocument();
  });
});
