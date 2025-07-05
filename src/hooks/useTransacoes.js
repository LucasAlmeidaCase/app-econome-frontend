import { useEffect, useState } from "react";
import {
  createTransacao,
  fetchTransacoes,
  removeTransacao,
} from "../api/transacoesService";

export function useTransacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const lista = await fetchTransacoes();
        setTransacoes(lista);
      } catch (err) {
        console.log(err);
        setError("Error ao carregar transações");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const add = async (nova) => {
    try {
      await createTransacao({
        descricao: nova.descricao,
        tipo_transacao: nova.tipo_transacao,
        valor: nova.valor,
        pago: nova.pago,
      });
      setTransacoes((prev) => [...prev, nova]);
      return true;
    } catch (err) {
      console.log(err);
      setError("Falha ao adicionar transação");
      return false;
    }
  };

  const remove = async (descricao) => {
    try {
      await removeTransacao(descricao);
      setTransacoes((prev) => prev.filter((t) => t.descricao !== descricao));
      return true;
    } catch (err) {
      console.log(err);
      setError("Falha ao remover transação");
      return false;
    }
  };

  return { transacoes, loading, error, add, remove };
}
