import { Container } from "@mui/material";
import Header from "./components/Header";
import Banner from "./components/Banner";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransacao = (novaTransacao) => {
    setTransactions((prevTransactions) => [...prevTransactions, novaTransacao]);
    console.log("Transação adicionada:", novaTransacao);
  };

  const handleDeleteTransaction = (indexToRemove) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((_, index) => index !== indexToRemove)
    );
    console.log("Transação removida:", indexToRemove);
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Banner />
      <TransactionForm onAddTransaction={handleAddTransacao} />
      <TransactionTable
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />
    </Container>
  );
}

export default App;
