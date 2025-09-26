import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5001",
  headers: { Accept: "application/json" },
});

export async function fetchTransacoes() {
  const response = await api.get("/transacoes");
  return response.data.transacoes;
}

export async function createTransacao(transacao) {
  const response = await api.post(
    "/transacao",
    {
      descricao: transacao.descricao,
      tipo_transacao: transacao.tipo_transacao,
      valor: transacao.valor,
      pago: transacao.pago,
      data_vencimento: transacao.data_vencimento,
      data_pagamento: transacao.data_pagamento,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function removeTransacao(descricao) {
  const response = await api.delete("/transacao", {
    params: { descricao },
  });
  return response.data;
}

export async function fetchTransacaoByPedidoId(pedidoId) {
  const response = await api.get(`/transacoes/pedido/${pedidoId}`);
  return response.data;
}
