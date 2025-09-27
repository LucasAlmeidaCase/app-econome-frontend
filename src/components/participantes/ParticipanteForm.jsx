import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";

// Enums conforme backend
const tiposPessoa = ["FISICA", "JURIDICA"];
const tiposParticipante = [
  "CLIENTE",
  "FORNECEDOR",
  "TRANSPORTADORA",
  "COLABORADOR",
  "ASSISTENCIA_TECNICA",
  "ADMINISTRADORA",
  "CONSULTORIA",
  "CONTABILIDADE",
  "OUTROS",
];

export default function ParticipanteForm({
  onSubmit,
  initialValues,
  onCancel,
  loading = false,
}) {
  const [codigo, setCodigo] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState(tiposPessoa[0]);
  const [tipoParticipante, setTipoParticipante] = useState(
    tiposParticipante[0]
  );
  // Campo mantido apenas para exibição em modo edição (back-end define no create)
  const [dataHoraCadastro, setDataHoraCadastro] = useState("");

  useEffect(() => {
    if (initialValues) {
      setCodigo(initialValues.codigo || "");
      setCpfCnpj(initialValues.cpfCnpj || "");
      setNome(initialValues.nome || "");
      setTipoPessoa(initialValues.tipoPessoa || tiposPessoa[0]);
      setTipoParticipante(
        initialValues.tipoParticipante || tiposParticipante[0]
      );
      if (initialValues.dataHoraCadastro) {
        try {
          const d = new Date(initialValues.dataHoraCadastro);
          const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 19);
          setDataHoraCadastro(local);
        } catch {
          /* ignore */
        }
      }
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Não enviamos dataHoraCadastro em criação (backend define). Em edição também podemos omitir para evitar overwrite.
    onSubmit({ codigo, cpfCnpj, nome, tipoPessoa, tipoParticipante });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: 420, maxWidth: "100%" }}
    >
      <Stack spacing={2}>
        {initialValues && (
          <TextField
            label="Data Cadastro"
            type="datetime-local"
            value={dataHoraCadastro}
            disabled
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
        <TextField
          label="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
          fullWidth
          inputProps={{ maxLength: 50 }}
          disabled={Boolean(initialValues)}
        />
        <TextField
          label="CPF/CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          required
          fullWidth
          inputProps={{ maxLength: 20 }}
        />
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          inputProps={{ maxLength: 120 }}
        />
        <TextField
          select
          label="Tipo Pessoa"
          value={tipoPessoa}
          onChange={(e) => setTipoPessoa(e.target.value)}
          fullWidth
        >
          {tiposPessoa.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Tipo Participante"
          value={tipoParticipante}
          onChange={(e) => setTipoParticipante(e.target.value)}
          fullWidth
        >
          {tiposParticipante.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          {onCancel && (
            <Button onClick={onCancel} color="inherit">
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
