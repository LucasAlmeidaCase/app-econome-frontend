import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";
import { formatarData } from "../../utils/dateUtils";

export default function TransactionTable({ transactions = [], onDelete }) {
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
            <TableRow key={index} hover>
              <TableCell align="center">
                {formatarData(transacao.data_vencimento)}
              </TableCell>
              <TableCell align="center">{transacao.descricao}</TableCell>
              <TableCell align="center">{transacao.tipo_transacao}</TableCell>
              <TableCell align="center">
                R$ {parseFloat(transacao.valor).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {transacao.pago ? "Sim" : "Não"}
              </TableCell>
              <TableCell align="center">
                {formatarData(transacao.data_pagamento)}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => handleOpenDialog(index)}
                  aria-label="Remover transação"
                >
                  <DeleteIcon />
                </IconButton>
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
