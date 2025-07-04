import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { TransactionTable, TransactionModal } from "../components/transactions";
import CustomSnackbar from "../components/common/CustomSnackbar";
import { useTransacoes } from "../hooks/useTransacoes";

const Transacoes = () => {
  const { transacoes, loading, error, add, remove } = useTransacoes();

  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false });

  const handleAdd = async (novaTransacao) => {
    const sucesso = await add(novaTransacao);

    setOpenModal(false);
    setSnackbar({
      open: true,
      message: sucesso
      ? "Transação adicionada com sucesso!"
      : "Erro ao adicionar transação.",
      timeout: 2000,
      severity: sucesso ? "success": "error",
    });
  };

  const handleDelete = async (indexToRemove) => {
    const sucesso = await remove(transacoes[indexToRemove].descricao);

    setSnackbar({
      open: true,
      message: sucesso
      ? "Transação removida com sucesso!"
      : "Erro ao remover transação.",
      timeout: 2000,
      severity: sucesso ? "success": "error",
    });
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <Box mt={2} mb={2}>
      {/* Botão para abrir o modal */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          disabled={loading || Boolean(error)}
        >
          Adicionar Transação
        </Button>
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TransactionTable transactions={transacoes} onDelete={handleDelete} />
      )}

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
};

export default Transacoes;
