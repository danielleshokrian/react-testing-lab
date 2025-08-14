import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(""); // keeps track of the current sort option

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data))
      .catch(console.error);
  }, []);

  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => setTransactions([...transactions, data]));
  }

  // Handle sorting
  function onSort(option) {
    setSortBy(option);
  }

  // Filter transactions by search 
  let filteredTransactions = transactions.filter((t) =>
    t.description?.toLowerCase().includes(search.toLowerCase())
  );

  // Apply sorting 
  if (sortBy === "amount") {
    filteredTransactions = [...filteredTransactions].sort(
      (a, b) => a.amount - b.amount
    );
  } else if (sortBy === "date") {
    filteredTransactions = [...filteredTransactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  } else if (sortBy === "category") {
    filteredTransactions = [...filteredTransactions].sort((a, b) =>
      a.category.localeCompare(b.category)
    );
  }

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;

