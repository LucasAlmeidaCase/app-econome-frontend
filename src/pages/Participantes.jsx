import { useState, useMemo } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useParticipantes } from "../hooks/useParticipantes";
import ParticipanteTable from "../components/participantes/ParticipanteTable";
import ParticipanteModal from "../components/participantes/ParticipanteModal";
import CustomSnackbar from "../components/common/CustomSnackbar";
// Filtro removido conforme solicitação; listagem mostra todos.

export default function Participantes() {
  const { participantes, loading, error, criar, atualizar, remover } =
    useParticipantes();
  const [openModal, setOpenModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false });
  const [submitting, setSubmitting] = useState(false);
  // Sem filtro: mantemos apenas estados de CRUD

  const tituloBotao = useMemo(
    () => (editando ? "Editar Participante" : "Novo Participante"),
    [editando]
  );

  const handleAdd = () => {
    setEditando(null);
    setOpenModal(true);
  };

  const handleEdit = async (participante) => {
    setEditando(participante);
    setOpenModal(true);
  };

  const handleSubmit = async (values) => {
    if (submitting) return;
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
      message: r.sucesso ? "Participante removido" : "Erro ao remover",
      severity: r.sucesso ? "success" : "error",
      timeout: 2000,
    });
  };

  const participantesFiltrados = participantes; // agora sem filtragem

  return (
    <Box mt={2} mb={2}>
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
        <ParticipanteTable
          participantes={participantesFiltrados}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {error && (
        <Typography color="error" mt={2} textAlign="center">
          {error}
        </Typography>
      )}
      <ParticipanteModal
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
