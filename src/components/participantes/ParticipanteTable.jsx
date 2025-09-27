import { useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../common/ConfirmDialog";

export default function ParticipanteTable({ participantes, onEdit, onDelete }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    onDelete(idToDelete);
    setOpenDialog(false);
    setIdToDelete(null);
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setIdToDelete(null);
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        Participantes
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Cadastro</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>CPF/CNPJ</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo Pessoa</TableCell>
            <TableCell>Tipo Participante</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participantes.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>
                {p.dataHoraCadastro
                  ? new Date(p.dataHoraCadastro).toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell>
                <Tooltip title={`ID: ${p.id}`} arrow>
                  <span>{p.codigo}</span>
                </Tooltip>
              </TableCell>
              <TableCell>{p.cpfCnpj}</TableCell>
              <TableCell>{p.nome || "-"}</TableCell>
              <TableCell>{p.tipoPessoa || "-"}</TableCell>
              <TableCell>{p.tipoParticipante || "-"}</TableCell>
              <TableCell align="center">
                <Tooltip title="Editar" arrow>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit(p)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir" arrow>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClick(p.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={openDialog}
        title="Confirmar Exclusão"
        description="Deseja realmente excluir este participante?"
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
