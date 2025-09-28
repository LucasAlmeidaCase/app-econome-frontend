import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { participanteLabel, searchParticipantes } from "../../../api/participantesService";

export default function ParticipanteAutocomplete({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce simples
  useEffect(() => {
    let active = true;
    if (!open) return;
    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const data = await searchParticipantes(inputValue.trim());
        if (active) setOptions(data || []);
      } catch {
        if (active) setOptions([]);
      } finally {
        if (active) setLoading(false);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(handler);
    };
  }, [inputValue, open]);

  // Valor selecionado precisa ser um objeto; se só temos id, construímos placeholder
  const selectedOption = useMemo(() => {
    if (!value) return null;
    if (typeof value === "object") return value;
    // Se vier apenas o ID, tenta achar nas opções
    return options.find((o) => o.id === value) || { id: value, codigo: `#${value}`, nome: "(carregando)" };
  }, [value, options]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      disabled={disabled}
      options={options}
      loading={loading}
      value={selectedOption}
      onChange={(_, newVal) => onChange(newVal ? newVal.id : null, newVal || null)}
      onInputChange={(_, newInput) => setInputValue(newInput)}
      getOptionLabel={(option) => participanteLabel(option)}
      isOptionEqualToValue={(o, v) => o.id === v.id}
      renderInput={(params) => (
        <TextField
          {...params}
            label="Participante"
            placeholder="Buscar por código, nome ou CPF/CNPJ"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={18} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
        />
      )}
      noOptionsText={inputValue ? "Nenhum resultado" : "Digite para pesquisar"}
    />
  );
}