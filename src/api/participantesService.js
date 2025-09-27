import axios from "axios";

// Base URL específica para microserviço de participantes (permite futura mudança via env)
const api = axios.create({
  baseURL:
    import.meta.env.VITE_PARTICIPANTES_API_URL ||
    "http://localhost:8081/api/participantes",
  headers: { Accept: "application/json" },
});

export async function listarParticipantes() {
  const { data } = await api.get("");
  return data; // lista de ParticipanteResponse
}

export async function buscarParticipante(id) {
  const { data } = await api.get(`/${id}`);
  return data;
}

export async function criarParticipante(payload) {
  const { data } = await api.post("", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function atualizarParticipante(id, payload) {
  const { data } = await api.put(`/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function excluirParticipante(id) {
  await api.delete(`/${id}`);
  return true;
}

export const participanteMapper = {
  toRequest(formValues) {
    return {
      codigo: formValues.codigo?.trim(),
      cpfCnpj: formValues.cpfCnpj?.trim(),
      nome: formValues.nome?.trim() || null,
      tipoPessoa: formValues.tipoPessoa || null,
      tipoParticipante: formValues.tipoParticipante || null,
      // dataHoraCadastro não é enviado; backend define
    };
  },
};
