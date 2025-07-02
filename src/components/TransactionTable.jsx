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

export default function TransactionTable({ transactions = [], onDelete }) {
  return (
    <Box className="items">
      <Typography variant="h6" gutterBottom>
        Transações
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Pago</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((transacao, index) => (
            <TableRow key={index} hover>
              <TableCell align="center">{transacao.descricao}</TableCell>
              <TableCell align="center">{transacao.tipo}</TableCell>
              <TableCell align="center">
                R$ {parseFloat(transacao.valor).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {transacao.pago ? "Sim" : "Não"}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => onDelete(index)}
                  aria-label="Remover transação"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
