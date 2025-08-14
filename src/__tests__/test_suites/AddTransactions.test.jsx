import { render, screen, fireEvent } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { vi } from "vitest";

const mockPost = vi.fn();

vi.stubGlobal("fetch", vi.fn((url, options) => {
  if (options?.method === "POST") {
    return Promise.resolve({ json: () => Promise.resolve(JSON.parse(options.body)) });
  }
  return Promise.resolve({ json: () => Promise.resolve([]) });
}));

describe("AddTransactions", () => {
  it("calls postTransaction handler with correct values", async () => {
    render(<AccountContainer />);
    
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: "Gas" } });
    fireEvent.change(screen.getByPlaceholderText(/Date/i), { target: { value: "2023-08-14" } });
    fireEvent.change(screen.getByPlaceholderText(/Category/i), { target: { value: "Utilities" } });
    fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: "50" } });
    
    fireEvent.click(screen.getByText(/Add Transaction/i));
    
    expect(await screen.findByText(/Gas/i)).toBeInTheDocument();
    expect(await screen.findByText(/Utilities/i)).toBeInTheDocument();
  });
});

