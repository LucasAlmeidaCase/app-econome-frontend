import { useCallback, useEffect, useState } from "react";
import {
  listarParticipantes,
  criarParticipante,
  atualizarParticipante,
  excluirParticipante,
  participanteMapper,
} from "../api/participantesService";

export function useParticipantes() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const lista = await listarParticipantes();
      setParticipantes(lista);
    } catch (e) {
      console.error(e);
      setError("Falha ao carregar participantes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const criar = async (values) => {
    try {
      const payload = participanteMapper.toRequest(values);
      const criado = await criarParticipante(payload);
      setParticipantes((prev) => [...prev, criado]);
      return { sucesso: true, data: criado };
    } catch (e) {
      console.error(e);
      setError("Erro ao criar participante");
      return { sucesso: false };
    }
  };

  const atualizar = async (id, values) => {
    try {
      const payload = participanteMapper.toRequest(values);
      const atualizado = await atualizarParticipante(id, payload);
      setParticipantes((prev) =>
        prev.map((p) => (p.id === id ? atualizado : p))
      );
      return { sucesso: true, data: atualizado };
    } catch (e) {
      console.error(e);
      setError("Erro ao atualizar participante");
      return { sucesso: false };
    }
  };

  const remover = async (id) => {
    try {
      await excluirParticipante(id);
      setParticipantes((prev) => prev.filter((p) => p.id !== id));
      return { sucesso: true };
    } catch (e) {
      console.error(e);
      setError("Erro ao excluir participante");
      return { sucesso: false };
    }
  };

  return {
    participantes,
    loading,
    error,
    criar,
    atualizar,
    remover,
    recarregar: carregar,
  };
}
