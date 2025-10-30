import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { format } from "date-fns";
import TimeLineChart from "../src/components/TimeLineChart";
import { vi } from "vitest";

vi.mock("recharts", async () => {
  const Original = await vi.importActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
  };
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

describe("TimeLineChart", () => {
  const mockData = [
    { period: "2025-01-01", total_revenue: "R$ 1.000,50" },
    { period: "2025-01-02", total_revenue: "R$ 2.500,75" },
  ];

  it("renderiza título corretamente", () => {
    render(<TimeLineChart data={mockData} />);
    expect(screen.getByText(/Revenue Over Time/i)).toBeInTheDocument();
  });

  it("não quebra quando não há dados", async () => {
    const { container } = render(<TimeLineChart data={[]} />);
    await waitFor(() => {
      const chart = container.querySelector("div");
      expect(chart).toBeInTheDocument();
    });
  });
});
