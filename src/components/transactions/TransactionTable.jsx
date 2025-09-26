import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";
import { formatarData } from "../../utils/dateUtils";
import { TipoChip, PagoChip } from "../common/StatusChips.jsx";

export default function TransactionTable({
  transactions = [],
  onDelete,
  onTogglePago,
  onEdit,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const handleOpenDialog = (index) => {
    setIndexToDelete(index);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(indexToDelete);
    setOpenDialog(false);
    setIndexToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setIndexToDelete(null);
  };

  return (
    <Box className="items">
      <Typography variant="h6" gutterBottom>
        Transações
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Vencimento</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Pago</TableCell>
            <TableCell align="center">Pagamento</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((transacao, index) => (
            <TableRow key={transacao.id ?? index} hover>
              <TableCell align="center">
                {formatarData(transacao.data_vencimento)}
              </TableCell>
              <TableCell align="center">{transacao.descricao}</TableCell>
              <TableCell align="center">
                <TipoChip value={transacao.tipo_transacao} />
              </TableCell>
              <TableCell align="center">
                R$ {parseFloat(transacao.valor).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                <PagoChip
                  pago={!!transacao.pago}
                  onToggle={
                    onTogglePago
                      ? () => onTogglePago(transacao, index)
                      : undefined
                  }
                />
              </TableCell>
              <TableCell align="center">
                {formatarData(transacao.data_pagamento)}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Editar" arrow>
                  <span>
                    <IconButton
                      color="primary"
                      onClick={() => onEdit && onEdit(transacao)}
                      aria-label="Editar transação"
                      size="small"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Excluir" arrow>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDialog(index)}
                    aria-label="Remover transação"
                    size="small"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Diálogo de confirmação de exclusão */}
      <ConfirmDialog
        open={openDialog}
        title="Confirmar Exclusão"
        description="Você tem certeza que deseja remover esta transação?"
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
