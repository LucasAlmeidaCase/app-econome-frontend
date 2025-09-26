import axios from "axios";

// Base API para pedidos - reutiliza variável de ambiente caso backend esteja em outra porta futuramente
const api = axios.create({
  baseURL:
    import.meta.env.VITE_PEDIDOS_API_URL || "http://localhost:8080/api/pedidos",
  headers: { Accept: "application/json" },
});

export async function listarPedidos() {
  const { data } = await api.get("");
  return data; // backend já retorna lista de PedidoResponse
}

export async function buscarPedido(id) {
  const { data } = await api.get(`/${id}`);
  return data;
}

export async function criarPedido(payload) {
  // payload deve corresponder ao PedidoRequest do backend
  const { data } = await api.post("", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function atualizarPedido(id, payload) {
  const { data } = await api.put(`/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function excluirPedido(id) {
  await api.delete(`/${id}`);
  return true;
}

export const pedidoMapper = {
  toRequest(formValues) {
    // Backend espera: campos principais + opcionais (se situacao=FATURADO)
    const payload = {
      dataEmissaoPedido: formValues.dataEmissaoPedido,
      numeroPedido: formValues.numeroPedido,
      tipoPedido: formValues.tipoPedido,
      situacaoPedido: formValues.situacaoPedido,
      valorTotal: formValues.valorTotal,
    };
    if (formValues.situacaoPedido === "FATURADO") {
      payload.dataVencimentoTransacao =
        formValues.dataVencimentoTransacao || null;
      payload.pagoTransacao = formValues.pagoTransacao ?? false;
      payload.dataPagamentoTransacao = formValues.pagoTransacao
        ? formValues.dataPagamentoTransacao || null
        : null;
    }
    return payload;
  },
};
