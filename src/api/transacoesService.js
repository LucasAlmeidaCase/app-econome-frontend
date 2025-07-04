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
  const formData = new FormData();
  formData.append("descricao", transacao.descricao);
  formData.append("tipo_transacao", transacao.tipo_transacao);
  formData.append("valor", transacao.valor);
  formData.append("pago", transacao.pago);

  const response = await api.post("/transacao", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function removeTransacao(descricao) {
  const response = await api.delete("/transacao", {
    params: { descricao },
  });
  return response.data;
}
