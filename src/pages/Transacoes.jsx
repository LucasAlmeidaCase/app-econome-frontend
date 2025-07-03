import React, { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

const Transacoes = () => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransacao = (novaTransacao) => {
    setTransactions((prevTransactions) => [...prevTransactions, novaTransacao]);
  };

  const handleDeleteTransaction = (indexToRemove) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
    <>
      <TransactionForm onAddTransaction={handleAddTransacao} />
      <TransactionTable
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />
    </>
  );
};

export default Transacoes;
