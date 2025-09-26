import { useState, useMemo, useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { usePedidos } from "../hooks/usePedidos";
import PedidoTable from "../components/pedidos/PedidoTable";
import PedidoModal from "../components/pedidos/PedidoModal";
import CustomSnackbar from "../components/common/CustomSnackbar";
import PedidoFilter from "../components/pedidos/PedidoFilter";
import { isEntrePeriodo, isEstaSemanaUTC, isHojeUTC } from "../utils/dateUtils";

export default function Pedidos() {
  const { pedidos, loading, error, criar, atualizar, remover } = usePedidos();
  const [openModal, setOpenModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false });
  const [submitting, setSubmitting] = useState(false);
  const [filtro, setFiltro] = useState(() => {
    const salvo = localStorage.getItem("filtroPedidos");
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        /* ignore */
      }
    }
    const hoje = new Date();
    return {
      tipo: "hoje",
      dataInicio: hoje.toISOString().split("T")[0],
      dataFim: null,
    };
  });

  useEffect(() => {
    localStorage.setItem("filtroPedidos", JSON.stringify(filtro));
  }, [filtro]);

  const tituloBotao = useMemo(
    () => (editando ? "Editar Pedido" : "Novo Pedido"),
    [editando]
  );

  const handleAdd = () => {
    setEditando(null);
    setOpenModal(true);
  };

  const handleEdit = (pedido) => {
    setEditando(pedido);
    setOpenModal(true);
  };

  const handleSubmit = async (values) => {
    if (submitting) return; // evita duplo clique
    setSubmitting(true);
    let resultado;
    if (editando) {
      resultado = await atualizar(editando.id, values);
    } else {
      resultado = await criar(values);
    }
    setSnackbar({
      open: true,
      message: resultado.sucesso
        ? "Operação realizada com sucesso"
        : "Falha na operação",
      severity: resultado.sucesso ? "success" : "error",
      timeout: 2000,
    });
    if (resultado.sucesso) {
      setOpenModal(false);
      setEditando(null);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    const r = await remover(id);
    setSnackbar({
      open: true,
      message: r.sucesso ? "Pedido removido" : "Erro ao remover",
      severity: r.sucesso ? "success" : "error",
      timeout: 2000,
    });
  };

  // Aplica filtro sobre dataEmissaoPedido
  const pedidosFiltrados = pedidos.filter((p) => {
    const dataCampo = p.dataEmissaoPedido;
    switch (filtro.tipo) {
      case "hoje":
        return isHojeUTC(
          dataCampo,
          filtro.dataInicio ? new Date(filtro.dataInicio) : new Date()
        );
      case "semana":
        return isEstaSemanaUTC(dataCampo, filtro.dataInicio, filtro.dataFim);
      case "mesAtual":
      case "periodoPersonalizado":
        return isEntrePeriodo(dataCampo, filtro.dataInicio, filtro.dataFim);
      case "todos":
      default:
        return true;
    }
  });

  return (
    <Box mt={2} mb={2}>
      <Box display="flex" justifyContent="center">
        <PedidoFilter filtro={filtro} onChange={setFiltro} />
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Button variant="contained" onClick={handleAdd} disabled={loading}>
          {tituloBotao}
        </Button>
      </Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={240}
        >
          <CircularProgress />
        </Box>
      ) : (
        <PedidoTable
          pedidos={pedidosFiltrados}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {error && (
        <Typography color="error" mt={2} textAlign="center">
          {error}
        </Typography>
      )}
      <PedidoModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditando(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editando}
        loading={submitting}
      />
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        duration={snackbar.timeout}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </Box>
  );
}
