import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function TransactionForm({ onAddTransaction }) {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("Receita");
  const [valor, setValor] = useState("");
  const [pago, setPago] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descricao || isNaN(valor) || valor === "") {
      alert("Por favor, preencha todos os campos corretamente.");
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
  };

  return (
    <Paper elevation={3} className="newItem" sx={{ p: 2, mb: 4}}>
      <Box component="form" onSubmit={handleSubmit} className="form-grid">
        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl>
          <InputLabel>Tipo</InputLabel>
          <Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            fullWidth
            margin="normal"
            label="Tipo"
          >
            <MenuItem value="Receita">Receita</MenuItem>
            <MenuItem value="Despesa">Despesa</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Valor"
          type="number"
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
        />

        <Button type="submit" variant="contained" color="primary">
            Adicionar Transação
        </Button>
      </Box>
    </Paper>
  );
}
