import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TransactionForm from "./TransactionForm";

const TransactionModal = ({ open, onClose, onAddTransaction }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      scroll="body"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle>Nova Transação</DialogTitle>
      <DialogContent>
        <TransactionForm onAddTransaction={onAddTransaction} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionModal;
