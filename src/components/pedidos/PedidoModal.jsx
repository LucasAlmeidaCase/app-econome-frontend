import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import PedidoForm from "./PedidoForm";

export default function PedidoModal({ open, onClose, onSubmit, initialValues, loading }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle>{initialValues ? "Editar Pedido" : "Novo Pedido"}</DialogTitle>
      <DialogContent>
        <PedidoForm
          onSubmit={(values) => onSubmit(values)}
          initialValues={initialValues}
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
