import { render, screen, fireEvent } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

describe("SearchSort", () => {
  beforeEach(() => {
    render(<AccountContainer />);
  });

  it("filters transactions by search term", async () => {
    const searchInput = screen.getByPlaceholderText(
      /Search your Recent Transactions/i
    );

    fireEvent.change(searchInput, { target: { value: "Paycheck" } });

    const rows = await screen.findAllByRole("row");
    const transactionRows = rows.slice(1); // skip header
    const descriptions = transactionRows.map(row => row.cells[1].textContent);

    descriptions.forEach(desc => {
      expect(desc).toMatch(/Paycheck/i);
    });
  });

  it("sorts transactions by description", async () => {
    const sortSelect = screen.getByRole("combobox");

    fireEvent.change(sortSelect, { target: { value: "description" } });

    const rows = await screen.findAllByRole("row");
    const transactionRows = rows.slice(1); // skip header
    const descriptions = transactionRows.map(row => row.cells[1].textContent);

    const sortedDescriptions = [...descriptions].sort();
    expect(descriptions).toEqual(sortedDescriptions);
  });

  it("sorts transactions by category", async () => {
    const sortSelect = screen.getByRole("combobox");

    fireEvent.change(sortSelect, { target: { value: "category" } });

    const rows = await screen.findAllByRole("row");
    const transactionRows = rows.slice(1); // skip header
    const categories = transactionRows.map(row => row.cells[2].textContent);

    const sortedCategories = [...categories].sort();
    expect(categories).toEqual(sortedCategories);
  });
});


