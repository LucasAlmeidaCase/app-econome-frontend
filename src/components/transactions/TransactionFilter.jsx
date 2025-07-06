import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";

const TransactionFilter = ({ filtro, onChange }) => {
  const handleTipoChange = (tipo) => {
    if (tipo === "periodoPersonalizado") {
      onChange({ ...filtro, tipo });
    } else {
      onChange({ tipo, dataInicio: null, dataFim: null });
    }
  };

  const handleDataChange = (campo, valor) => {
    onChange((prev) => ({ ...prev, [campo]: valor }));
  };
  return (
    <Box display="flex" flexDirection="column" gap={2} mb={2}>
      <Typography variant="subtitle1">Filtrar por período</Typography>
      <Select
        value={filtro.tipo}
        onChange={(e) => handleTipoChange(e.target.value)}
      >
        <MenuItem value="hoje">Hoje</MenuItem>
        <MenuItem value="semana">Esta semana</MenuItem>
        <MenuItem value="mesAtual">Este mês</MenuItem>
        <MenuItem value="todos">Todos</MenuItem>
        <MenuItem value="periodoPersonalizado">Escolher período</MenuItem>
      </Select>
      {filtro.tipo === "periodoPersonalizado" && (
        <Box display="flex" gap={2}>
          <TextField
            label="Data inicial"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filtro.dataInicio || ""}
            onChange={(e) => handleDataChange("dataInicio", e.target.value)}
          />
          <TextField
            label="Data final"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filtro.dataFim || ""}
            onChange={(e) => handleDataChange("dataFim", e.target.value)}
          />
        </Box>
      )}
    </Box>
  );
};

export default TransactionFilter;
