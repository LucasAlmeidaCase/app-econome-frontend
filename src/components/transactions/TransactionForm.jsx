import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function TransactionForm({ onAddTransaction }) {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("Receita");
  const [valor, setValor] = useState("");
  const [pago, setPago] = useState(false);

  // Estados para a Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" | "warning" | "info"
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descricao || isNaN(valor) || valor === "") {
      setSnackbar({
        open: true,
        message: "Por favor, preencha todos os campos corretamente.",
        severity: "error",
      });
      return;
    }

    onAddTransaction({
      descricao,
      tipo,
      valor: parseFloat(valor),
      pago,
    });

    // Limpa os campos
    setDescricao("");
    setTipo("Receita");
    setValor("");
    setPago(false);

    // Exibe snackbar de sucesso
    setSnackbar({
      open: true,
      message: "Transação adicionada com sucesso!",
      timeout: 2000,
      severity: "success",
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="form-grid"
        sx={{ mt: 2 }}
      >
        <TextField
          label="Descrição"
          placeholder="Ex: Salário, Mercado..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo</InputLabel>
          <Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            label="Tipo"
          >
            <MenuItem value="Receita">Receita</MenuItem>
            <MenuItem value="Despesa">Despesa</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Valor"
          type="number"
          placeholder="R$ 0,00"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <FormControlLabel
          control={
            <Switch
              checked={pago}
              onChange={(e) => setPago(e.target.checked)}
            />
          }
          label="Pago"
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth>
          Salvar
        </Button>
      </Box>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
