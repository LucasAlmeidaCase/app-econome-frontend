import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Stack,
  CircularProgress,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

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
  // Campos extras para geração automática de transação quando FATURADO
  const [dataVencimentoTransacao, setDataVencimentoTransacao] = useState("");
  const [pagoTransacao, setPagoTransacao] = useState(false);
  const [dataPagamentoTransacao, setDataPagamentoTransacao] = useState("");

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
      // Se estiver editando um pedido FATURADO, tenta popular campos de transação se existirem
      if (initialValues.situacaoPedido === "FATURADO") {
        setDataVencimentoTransacao(
          initialValues.dataVencimentoTransacao ||
            (initialValues.dataEmissaoPedido
              ? new Date(initialValues.dataEmissaoPedido)
                  .toISOString()
                  .slice(0, 10)
              : "")
        );
        setPagoTransacao(Boolean(initialValues.pagoTransacao));
        setDataPagamentoTransacao(initialValues.dataPagamentoTransacao || "");
      } else {
        setDataVencimentoTransacao("");
        setPagoTransacao(false);
        setDataPagamentoTransacao("");
      }
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

    const basePayload = {
      dataEmissaoPedido: zoned,
      numeroPedido,
      tipoPedido,
      situacaoPedido,
      valorTotal: parseFloat(valorTotal),
    };

    if (situacaoPedido === "FATURADO") {
      basePayload.dataVencimentoTransacao = dataVencimentoTransacao || null;
      basePayload.pagoTransacao = pagoTransacao || false;
      basePayload.dataPagamentoTransacao = pagoTransacao
        ? dataPagamentoTransacao || null
        : null;
    } else {
      basePayload.dataVencimentoTransacao = null;
      basePayload.pagoTransacao = null;
      basePayload.dataPagamentoTransacao = null;
    }

    onSubmit(basePayload);
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
          onChange={(e) => {
            const nova = e.target.value;
            setSituacaoPedido(nova);
            if (nova === "FATURADO") {
              // Se não houver data de vencimento ainda, sugere a data de emissão (parte da data) ou hoje
              if (!dataVencimentoTransacao) {
                // dataEmissaoPedido está em formato 'YYYY-MM-DDTHH:mm:ss'. Pegamos apenas a parte da data
                // Sem aplicar manipulação de timezone para evitar retroceder 1 dia em fusos negativos.
                if (dataEmissaoPedido) {
                  setDataVencimentoTransacao(dataEmissaoPedido.slice(0, 10));
                } else {
                  const today = new Date();
                  const local = new Date(
                    today.getTime() - today.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, 10);
                  setDataVencimentoTransacao(local);
                }
              }
            } else {
              // Limpamos campos se mudar para estado que não gera transação
              setDataVencimentoTransacao("");
              setPagoTransacao(false);
              setDataPagamentoTransacao("");
            }
          }}
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
        {situacaoPedido === "FATURADO" && (
          <Stack spacing={2} sx={{ borderTop: "1px solid #eee", pt: 2 }}>
            <TextField
              label="Vencimento Transação"
              type="date"
              value={dataVencimentoTransacao}
              onChange={(e) => setDataVencimentoTransacao(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip
                title={
                  pagoTransacao
                    ? "Transação marcada como paga"
                    : "Marcar transação como paga"
                }
                arrow
              >
                <IconButton
                  color={pagoTransacao ? "success" : "default"}
                  onClick={() => {
                    const novo = !pagoTransacao;
                    setPagoTransacao(novo);
                    if (!novo) {
                      setDataPagamentoTransacao("");
                    } else if (!dataPagamentoTransacao) {
                      const today = new Date();
                      const local = new Date(
                        today.getTime() - today.getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .slice(0, 10);
                      setDataPagamentoTransacao(local);
                    }
                  }}
                  aria-label={pagoTransacao ? "Transação paga" : "Transação não paga"}
                  size="large"
                >
                  {pagoTransacao ? (
                    <PaidIcon fontSize="inherit" />
                  ) : (
                    <HourglassEmptyIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Tooltip>
              <Typography variant="body2" color={pagoTransacao ? "success.main" : "text.secondary"}>
                {pagoTransacao ? "Paga" : "Não paga"}
              </Typography>
            </Stack>
            {pagoTransacao && (
              <TextField
                label="Data Pagamento"
                type="date"
                value={dataPagamentoTransacao}
                onChange={(e) => setDataPagamentoTransacao(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            )}
          </Stack>
        )}
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          {onCancel && (
            <Button onClick={onCancel} color="inherit">
              Cancelar
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={loading} startIcon={loading ? <CircularProgress size={16} /> : null}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
