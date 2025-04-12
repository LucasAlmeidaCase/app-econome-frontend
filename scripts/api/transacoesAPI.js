const BASE_URL = "http://127.0.0.1:5000"; // URL base da API

export const getTransacoes = async (callback) => {
  try {
    const response = await fetch(`${BASE_URL}/transacoes`);
    const data = await response.json();
    if (data.transacoes && Array.isArray(data.transacoes)) {
      data.transacoes.forEach((item) => {
        callback(item.descricao, item.tipo_transacao, item.valor, item.pago);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
};

export const addTransacao = async (descricao, tipo_transacao, valor, pago) => {
  try {
    const formData = new FormData();
    formData.append("descricao", descricao);
    formData.append("tipo_transacao", tipo_transacao);
    formData.append("valor", valor);
    formData.append("pago", pago);

    const response = await fetch(`${BASE_URL}/transacao`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao adicionar transação:", error);
  }
};

export const deleteTransacao = async (descricao) => {
  try {
    const response = await fetch(
      `${BASE_URL}/transacao?descricao=${encodeURIComponent(descricao)}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
  }
};
