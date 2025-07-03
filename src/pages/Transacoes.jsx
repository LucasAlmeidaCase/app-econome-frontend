import { useState } from "react";
import { Box, Button } from "@mui/material";
import { TransactionTable, TransactionModal } from "../components/transactions";

const Transacoes = () => {
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleAddTransacao = (novaTransacao) => {
    setTransactions((prevTransactions) => [...prevTransactions, novaTransacao]);
  };

  const handleDeleteTransaction = (indexToRemove) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
      <Box mt={2} mb={2}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Adicionar Transação
          </Button>
        </Box>

          <TransactionTable
            transactions={transactions}
            onDelete={handleDeleteTransaction}
          />

        <TransactionModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAddTransaction={handleAddTransacao}
        />
      </Box>
  );
};

export default Transacoes;
