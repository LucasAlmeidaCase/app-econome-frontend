import { useCallback, useEffect, useState } from "react";
import { listarPedidos, criarPedido, atualizarPedido, excluirPedido, pedidoMapper } from "../api/pedidosService";

export function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const lista = await listarPedidos();
      setPedidos(lista);
    } catch (e) {
      console.error(e);
      setError("Falha ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const criar = async (values) => {
    try {
      const payload = pedidoMapper.toRequest(values);
      const criado = await criarPedido(payload);
      setPedidos((prev) => [...prev, criado]);
      return { sucesso: true, data: criado };
    } catch (e) {
      console.error(e);
      setError("Erro ao criar pedido");
      return { sucesso: false };
    }
  };

  const atualizar = async (id, values) => {
    try {
      const payload = pedidoMapper.toRequest(values);
      const atualizado = await atualizarPedido(id, payload);
      setPedidos((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
      return { sucesso: true, data: atualizado };
    } catch (e) {
      console.error(e);
      setError("Erro ao atualizar pedido");
      return { sucesso: false };
    }
  };

  const remover = async (id) => {
    try {
      await excluirPedido(id);
      setPedidos((prev) => prev.filter((p) => p.id !== id));
      return { sucesso: true };
    } catch (e) {
      console.error(e);
      setError("Erro ao excluir pedido");
      return { sucesso: false };
    }
  };

  return { pedidos, loading, error, criar, atualizar, remover, recarregar: carregar };
}
