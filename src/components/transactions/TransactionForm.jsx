import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import CustomSnackbar from "../common/CustomSnackbar";
import PaidIcon from '@mui/icons-material/Paid';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export default function TransactionForm({ onAddTransaction }) {
  // Função para obter a data de hoje no fuso local no formato YYYY-MM-DD
  const hojeLocal = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [dataVencimento, setDataVencimento] = useState(hojeLocal());
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

    if (pago && !dataPagamento) {
      setSnackbar({
        open: true,
        message: "Informe a data de pagamento ou desmarque como pago.",
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
      data_pagamento: pago ? dataPagamento : null,
    });

    // Limpa os campos
    setDescricao("");
    setTipoTransacao("Receita");
    setValor("");
  setPago(false);
  setDataPagamento("");

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

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, mb: 1 }}>
          <Tooltip title={pago ? "Transação marcada como paga" : "Marcar como paga"} arrow>
            <IconButton
              color={pago ? "success" : "default"}
              onClick={() => {
                setPago(prev => {
                  const novo = !prev;
                  if (!novo) {
                    setDataPagamento("");
                  } else if (!dataPagamento) {
                    setDataPagamento(hojeLocal());
                  }
                  return novo;
                });
              }}
              aria-label={pago ? "Marcar como não paga" : "Marcar como paga"}
              size="small"
              sx={{ border: 1, borderColor: pago ? 'success.main' : 'divider' }}
            >
              {pago ? <PaidIcon fontSize="small" /> : <HourglassEmptyIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color={pago ? 'success.main' : 'text.secondary'}>
            {pago ? 'Paga' : 'Não paga'}
          </Typography>
        </Stack>

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
