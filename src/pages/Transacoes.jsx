import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  TransactionTable,
  TransactionModal,
  TransactionFilter,
} from "../components/transactions";
import CustomSnackbar from "../components/common/CustomSnackbar";
import { useTransacoes } from "../hooks/useTransacoes";
import {
  isEntrePeriodo,
  isEstaSemanaUTC,
  isHojeUTC,
  isMesAtual,
} from "../utils/dateUtils";

const Transacoes = () => {
  const { transacoes, loading, error, add, remove } = useTransacoes();

  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false });

  const [filtro, setFiltro] = useState(() => {
    const salvo = localStorage.getItem("filtroTransacoes");
    return salvo ? JSON.parse(salvo) : { tipo: "mesAtual", dataInicio: null, dataFim: null };
  });

  useEffect(() => {
    localStorage.setItem("filtroTransacoes", JSON.stringify(filtro));
  }, [filtro]);

  const handleAdd = async (novaTransacao) => {
    const sucesso = await add(novaTransacao);

    setOpenModal(false);
    setSnackbar({
      open: true,
      message: sucesso
        ? "Transação adicionada com sucesso!"
        : "Erro ao adicionar transação.",
      timeout: 2000,
      severity: sucesso ? "success" : "error",
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
      severity: sucesso ? "success" : "error",
    });
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  // Filtra as transações conforme o filtro selecionado
  const transacoesFiltradas = transacoes.filter((t) => {
    switch (filtro.tipo) {
      case "hoje":
        return isHojeUTC(t.data_vencimento);
      case "semana":
        return isEstaSemanaUTC(t.data_vencimento);
      case "mesAtual":
        return isMesAtual(t.data_vencimento);
      case "periodoPersonalizado":
        return isEntrePeriodo(
          t.data_vencimento,
          filtro.dataInicio,
          filtro.dataFim
        );
      case "todos":
      default:
        return true;
    }
  });

  return (
    <Box mt={2} mb={2}>
      {/* Filtro de período */}
      <TransactionFilter filtro={filtro} onChange={setFiltro} />

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
        <TransactionTable
          transactions={transacoesFiltradas}
          onDelete={handleDelete}
        />
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
      <Box display="flex" justifyContent="center" alignItems="center">
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
};

export default Transacoes;
