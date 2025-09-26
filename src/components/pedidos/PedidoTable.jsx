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

export default function PedidoTable({ pedidos, onEdit, onDelete }) {
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
      <Typography variant="h6" gutterBottom>Pedidos</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Número</TableCell>
            <TableCell>Data Emissão</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Situação</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.numeroPedido}</TableCell>
              <TableCell>{p.dataEmissaoPedido ? new Date(p.dataEmissaoPedido).toLocaleString() : "-"}</TableCell>
              <TableCell>{p.tipoPedido}</TableCell>
              <TableCell>{p.situacaoPedido}</TableCell>
              <TableCell align="right">{Number(p.valorTotal).toFixed(2)}</TableCell>
              <TableCell align="center">
                <Tooltip title="Editar" arrow>
                  <IconButton size="small" color="primary" onClick={() => onEdit(p)}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir" arrow>
                  <IconButton size="small" color="error" onClick={() => handleDeleteClick(p.id)}>
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
        description="Deseja realmente excluir este pedido?"
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
