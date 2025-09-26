import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TransactionForm from "./TransactionForm";

const TransactionModal = ({
  open,
  onClose,
  onAddTransaction,
  onUpdateTransaction,
  editing,
  currentTransaction,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      scroll="body"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle>
        {editing ? "Editar Transação" : "Nova Transação"}
      </DialogTitle>
      <DialogContent>
        <TransactionForm
          onAddTransaction={onAddTransaction}
          onUpdateTransaction={onUpdateTransaction}
          editing={editing}
          currentTransaction={currentTransaction}
        />
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
