import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  formatarData,
  getMesRange,
  getSemanaRange,
  parseLocalDate,
  shiftPeriod,
  toISODate,
} from "../../utils/dateUtils";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const TransactionFilter = ({ filtro, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const displayLabel = (() => {
    // base para cálculo
    const base = filtro.dataInicio
      ? parseLocalDate(filtro.dataInicio)
      : new Date(); // data/hora local
    console.log("displayLabel base date:", base, "filtro:", filtro);

    switch (filtro.tipo) {
      case "hoje":
        +console.log("displayLabel caso 'hoje'", toISODate(base));
        return formatarData(toISODate(base));

      case "semana": {
        const [ini, fim] = getSemanaRange(base);
        console.log("displayLabel caso 'semana'", ini, fim);
        return `${formatarData(ini)} ↝ ${formatarData(fim)}`;
      }

      case "mesAtual": {
        const [ini] = getMesRange(base);
        const month = ini.toLocaleString("pt-BR", {
          month: "long",
          year: "numeric",
        });
        return month.charAt(0).toUpperCase() + month.slice(1);
      }

      case "periodoPersonalizado":
        // Se os dois campos existirem, exibe o range, senão placeholder
        return filtro.dataInicio && filtro.dataFim
          ? `${formatarData(filtro.dataInicio)} ↝ ${formatarData(
              filtro.dataFim
            )}`
          : "Escolher período";

      case "todos":
        return "Todas";

      default:
        return "Todas";
    }
  })();

  const handleTipoChange = (tipo) => {
    let novoFiltro;
    if (tipo === "mesAtual") {
      const [ini, fim] = getMesRange();
      novoFiltro = {
        tipo,
        dataInicio: toISODate(ini),
        dataFim: toISODate(fim),
      };
    } else if (tipo === "hoje") {
      novoFiltro = {
        tipo,
        dataInicio: toISODate(new Date()), // Adiciona a data atual
        dataFim: null,
      };
    } else if (tipo === "periodoPersonalizado") {
      novoFiltro = { ...filtro, tipo };
    } else {
      novoFiltro = { tipo, dataInicio: null, dataFim: null };
    }

    console.log("🔄 handleTipoChange →", novoFiltro);
    onChange(novoFiltro);
  };

  const handleDataChange = (campo, valor) => {
    onChange((prev) => ({ ...prev, [campo]: valor }));
  };

  const open = Boolean(anchorEl);
  const id = open ? "transaction-filter-popover" : undefined;
  return (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <IconButton
          disabled={filtro.tipo === "todos"}
          onClick={() => {
            +console.log("⬅️ shiftPeriod before:", filtro);
            const novo = shiftPeriod(filtro, -1);
            +console.log("⬅️ shiftPeriod after:", novo);
            onChange(novo);
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Typography
          variant="subtitle1"
          aria-describedby={id}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          {displayLabel}
        </Typography>

        <IconButton
          disabled={filtro.tipo === "todos"}
          onClick={() => {
            +console.log("➡️ shiftPeriod before:", filtro);
            const novo = shiftPeriod(filtro, +1);
            +console.log("➡️ shiftPeriod after:", novo);
            onChange(novo);
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box p={2} display="flex" flexDirection="column" gap={1} minWidth={200}>
          <Typography variant="subtitle2">Filtrar por período</Typography>
          <MenuItem onClick={() => handleTipoChange("hoje")}>Hoje</MenuItem>
          <MenuItem onClick={() => handleTipoChange("semana")}>
            Esta semana
          </MenuItem>
          <MenuItem onClick={() => handleTipoChange("mesAtual")}>
            Este mês
          </MenuItem>
          <MenuItem onClick={() => handleTipoChange("todos")}>Todos</MenuItem>
          <MenuItem onClick={() => handleTipoChange("periodoPersonalizado")}>
            Período personalizado
          </MenuItem>
          {filtro.tipo === "periodoPersonalizado" && (
            <Box display="flex" gap={1} mt={1}>
              <TextField
                label="De"
                type="date"
                value={filtro.dataInicio || ""}
                onChange={(e) => handleDataChange("dataInicio", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Até"
                type="date"
                value={filtro.dataFim || ""}
                onChange={(e) => handleDataChange("dataFim", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default TransactionFilter;
