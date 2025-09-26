import { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Stack } from "@mui/material";

// Enums reais conforme backend
const tipos = ["ENTRADA", "SAIDA"];
const situacoes = ["PENDENTE", "FATURADO", "CANCELADO"];

export default function PedidoForm({
  onSubmit,
  initialValues,
  onCancel,
  loading = false,
}) {
  const [dataEmissaoPedido, setDataEmissaoPedido] = useState(() => {
    const now = new Date();
    // Ajusta para datetime-local sem timezone (local time)
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19);
    return local;
  });
  const [numeroPedido, setNumeroPedido] = useState("");
  const [tipoPedido, setTipoPedido] = useState(tipos[0]);
  const [situacaoPedido, setSituacaoPedido] = useState(situacoes[0]);
  const [valorTotal, setValorTotal] = useState("");

  useEffect(() => {
    if (initialValues) {
      if (initialValues.dataEmissaoPedido) {
        try {
          const date = new Date(initialValues.dataEmissaoPedido);
          const local = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 19);
          setDataEmissaoPedido(local);
        } catch {
          /* noop */
        }
      }
      setNumeroPedido(initialValues.numeroPedido || "");
      setTipoPedido(initialValues.tipoPedido || tipos[0]);
      setSituacaoPedido(initialValues.situacaoPedido || situacoes[0]);
      setValorTotal(initialValues.valorTotal ?? "");
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Converte datetime-local (assumido em horário local) para ISO com offset local
    // datetime-local: 'YYYY-MM-DDTHH:mm:ss'
    const local = new Date(dataEmissaoPedido.replace("T", "T"));
    // Ajusta para considerar que string é hora local (já é interpretada como local pelo Date)
    const tzOffsetMin = local.getTimezoneOffset();
    const sinal = tzOffsetMin > 0 ? "-" : "+"; // offsetMin > 0 significa atrás de UTC
    const abs = Math.abs(tzOffsetMin);
    const hh = String(Math.floor(abs / 60)).padStart(2, "0");
    const mm = String(abs % 60).padStart(2, "0");
    // isoComOffset é UTC; queremos representar o horário original com offset local preservando os campos visuais
    // Pegamos componentes da string de entrada (dataEmissaoPedido) e adicionamos .000 + offset calculado
    const zoned = `${dataEmissaoPedido}.000${sinal}${hh}:${mm}`;

    onSubmit({
      dataEmissaoPedido: zoned,
      numeroPedido,
      tipoPedido,
      situacaoPedido,
      valorTotal: parseFloat(valorTotal),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: 420, maxWidth: "100%" }}
    >
      <Stack spacing={2}>
        <TextField
          label="Data Emissão"
          type="datetime-local"
          value={dataEmissaoPedido}
          onChange={(e) => setDataEmissaoPedido(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
        <TextField
          label="Número do Pedido"
          value={numeroPedido}
          onChange={(e) => setNumeroPedido(e.target.value)}
          required
          fullWidth
        />
        <TextField
          select
          label="Tipo"
          value={tipoPedido}
          onChange={(e) => setTipoPedido(e.target.value)}
          fullWidth
        >
          {tipos.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Situação"
          value={situacaoPedido}
          onChange={(e) => setSituacaoPedido(e.target.value)}
          fullWidth
        >
          {situacoes.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Valor Total"
          type="number"
          value={valorTotal}
          onChange={(e) => setValorTotal(e.target.value)}
          required
          fullWidth
        />
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          {onCancel && (
            <Button onClick={onCancel} color="inherit">
              Cancelar
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={loading}>
            Salvar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
