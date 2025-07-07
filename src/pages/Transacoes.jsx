import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  TransactionTable,
  TransactionModal,
  TransactionFilter,
} from "../components/transactions";
import CustomSnackbar from "../components/common/CustomSnackbar";
import { useTransacoes } from "../hooks/useTransacoes";
import { isEntrePeriodo, isEstaSemanaUTC, isHojeUTC } from "../utils/dateUtils";

const Transacoes = () => {
  const {
    transacoes,
    loading,
    error,
    add,
    remove,
    useLocalData,
    toggleDataSource,
  } = useTransacoes();

  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false });

  const [filtro, setFiltro] = useState(() => {
    const salvo = localStorage.getItem("filtroTransacoes");
    if (salvo) return JSON.parse(salvo);

    const hoje = new Date();
    return {
      tipo: "hoje",
      dataInicio: hoje.toISOString().split("T")[0], // Formato YYYY-MM-DD
      dataFim: null,
    };
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
        // Usa a data atual se dataInicio for null
        return isHojeUTC(
          t.data_vencimento,
          filtro.dataInicio ? new Date(filtro.dataInicio) : new Date()
        );
      case "semana":
        return isEstaSemanaUTC(
          t.data_vencimento,
          filtro.dataInicio,
          filtro.dataFim
        );
      case "mesAtual":
        return isEntrePeriodo(
          t.data_vencimento,
          filtro.dataInicio,
          filtro.dataFim
        );
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
      {/* Filtro de período centralizado */}
      <Box display="flex" justifyContent="center">
        <TransactionFilter filtro={filtro} onChange={setFiltro} />
      </Box>

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

      <Button
        onClick={() => toggleDataSource()}
        variant="outlined"
        sx={{ marginRight: 2 }}
      >
        Usar {useLocalData ? "Backend" : "JSON Local"}
      </Button>
    </Box>
  );
};

export default Transacoes;
