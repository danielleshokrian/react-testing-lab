import { render, screen } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { vi } from "vitest";

vi.stubGlobal("fetch", vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
      { id: 2, date: "2019-12-01", description: "South by Southwest Quinoa Bowl at Fresh & Co", category: "Food", amount: -10.55 },
      { id: 3, date: "2019-12-04", description: "Sunglasses, Urban Outfitters", category: "Fashion", amount: -24.99 },
    ])
  })
));

describe("DisplayTransactions", () => {
  it("renders transactions on startup", async () => {
    render(<AccountContainer />);
    expect(await screen.findByText(/Paycheck from Bob's Burgers/i)).toBeInTheDocument();
    expect(screen.getByText(/South by Southwest Quinoa Bowl/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunglasses, Urban Outfitters/i)).toBeInTheDocument();
  });
});

