import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CustomSnackbar from "../common/CustomSnackbar";

export default function TransactionForm({ onAddTransaction }) {
  const [dataVencimento, setDataVencimento] = useState(new Date().toISOString().substring(0,10)); // Data atual ("YYYY/MM/DD")
  const [descricao, setDescricao] = useState("");
  const [tipoTransacao, setTipoTransacao] = useState("Receita");
  const [valor, setValor] = useState("");
  const [pago, setPago] = useState(false);
  const [dataPagamento, setDataPagamento] = useState("");

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
      data_vencimento: dataVencimento, 
      descricao,
      tipo_transacao: tipoTransacao,
      valor: parseFloat(valor),
      pago,
      data_pagamento: pago ? dataPagamento : null
    });

    // Limpa os campos
    setDescricao("");
    setTipoTransacao("Receita");
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
          label="Vencimento"
          type="date"
          value={dataVencimento}
          onChange={(e) => setDataVencimento(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
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
            value={tipoTransacao}
            onChange={(e) => setTipoTransacao(e.target.value)}
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

        {pago && (
          <TextField
            label="Data de Pagamento"
            type="date"
            value={dataPagamento}
            onChange={e => setDataPagamento(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          >
          </TextField>
        )}

        <Button type="submit" variant="contained" fullWidth>
          Salvar
        </Button>
      </Box>

      {/* Snackbar para feedback */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        duration={snackbar.timeout}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}
