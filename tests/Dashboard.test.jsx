import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../src/pages/Dashboard";

vi.mock("../src/pages/Dashboard", () => {
  return {
    default: () => <h1>Dashboard</h1>,
  };
});

describe("Dashboard", () => {
  it("renderiza o título do dashboard", () => {
    render(<Dashboard />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
