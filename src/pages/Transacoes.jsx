import { useState } from "react";
import { Box, Button } from "@mui/material";
import { TransactionTable, TransactionModal } from "../components/transactions";
import CustomSnackbar from "../components/common/CustomSnackbar";

const Transacoes = () => {
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false });

  const handleAdd = (novaTransacao) => {
    setTransactions((prevTransactions) => [...prevTransactions, novaTransacao]);
    setOpenModal(false);
    setSnackbar({
      open: true,
      message: "Transação adicionada com sucesso!",
      timeout: 2000,
      severity: "success",
    });
  };

  const handleDelete = (indexToRemove) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((_, index) => index !== indexToRemove)
    );
    setSnackbar({
      open: true,
      message: "Transação removida com sucesso!",
      timeout: 2000,
      severity: "success",
    });
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <Box mt={2} mb={2}>
      {/* Botão para abrir o modal */}
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Adicionar Transação
        </Button>
      </Box>

      <TransactionTable transactions={transactions} onDelete={handleDelete} />

      <TransactionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddTransaction={handleAdd}
      />

      {/* Snackbar para mensagens de erro ou sucesso */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        duration={snackbar.timeout}
        onClose={closeSnackbar}
      />
    </Box>
  );
};

export default Transacoes;
