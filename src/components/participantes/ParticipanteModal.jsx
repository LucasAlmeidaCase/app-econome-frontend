import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import ParticipanteForm from "./ParticipanteForm";

export default function ParticipanteModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  loading,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle>
        {initialValues ? "Editar Participante" : "Novo Participante"}
      </DialogTitle>
      <DialogContent>
        <ParticipanteForm
          onSubmit={(values) => onSubmit(values)}
          initialValues={initialValues}
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
