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
    update,
    useLocalData,
    toggleDataSource,
  } = useTransacoes();

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [transacaoEdicao, setTransacaoEdicao] = useState(null);
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
    finalizarModalFeedback(sucesso, "adicionada");
  };

  const handleUpdate = async (id, dados) => {
    const sucesso = await update(id, dados);
    finalizarModalFeedback(sucesso, "atualizada");
  };

  const finalizarModalFeedback = (sucesso, acao) => {
    setOpenModal(false);
    setEditing(false);
    setTransacaoEdicao(null);
    setSnackbar({
      open: true,
      message: sucesso
        ? `Transação ${acao} com sucesso!`
        : `Erro ao ${
            acao === "adicionada" ? "adicionar" : "atualizar"
          } transação.`,
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
          onClick={() => {
            setOpenModal(true);
            setEditing(false);
            setTransacaoEdicao(null);
          }}
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
          onEdit={(t) => {
            setTransacaoEdicao(t);
            setEditing(true);
            setOpenModal(true);
          }}
        />
      )}

      <TransactionModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditing(false);
          setTransacaoEdicao(null);
        }}
        onAddTransaction={handleAdd}
        onUpdateTransaction={handleUpdate}
        editing={editing}
        currentTransaction={transacaoEdicao}
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
