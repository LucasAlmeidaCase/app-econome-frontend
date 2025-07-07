import { useEffect, useState } from "react";
import {
  createTransacao,
  fetchTransacoes,
  removeTransacao,
} from "../api/transacoesService";
import {
  createLocalTransacao,
  fetchLocalTransacoes,
  removeLocalTransacao,
} from "../api/localTransacoesService";

export function useTransacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useLocalData, setUseLocalData] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const lista = useLocalData
          ? await fetchLocalTransacoes()
          : await fetchTransacoes();
        setTransacoes(lista);
      } catch (err) {
        console.log(err);
        setError("Error ao carregar transações");
      } finally {
        setLoading(false);
      }
    })();
  }, [useLocalData]);

  const add = async (nova) => {
    try {
      if (useLocalData) {
        await createLocalTransacao(nova);
        setTransacoes((prev) => [...prev, nova]);
      } else {
        await createTransacao(nova);
        setTransacoes((prev) => [...prev, nova]);
      }
      return true;
    } catch (err) {
      console.log(err);
      setError("Falha ao adicionar transação");
      return false;
    }
  };

  const remove = async (descricao) => {
    try {
      if (useLocalData) {
        await removeLocalTransacao(descricao);
      } else {
        await removeTransacao(descricao);
      }
      setTransacoes((prev) => prev.filter((t) => t.descricao !== descricao));
      return true;
    } catch (err) {
      console.log(err);
      setError("Falha ao remover transação");
      return false;
    }
  };

  const toggleDataSource = () => setUseLocalData(!useLocalData);

  return {
    transacoes,
    loading,
    error,
    add,
    remove,
    useLocalData,
    toggleDataSource,
  };
}
