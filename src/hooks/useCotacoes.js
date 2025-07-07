import { useEffect, useState } from "react";

const useCotacoes = () => {
  const [cotacoes, setCotacoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCotacoes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar cotações");
        }

        const data = await response.json();
        setCotacoes({
          dolar: parseFloat(data.USDBRL.bid).toFixed(2),
          euro: parseFloat(data.EURBRL.bid).toFixed(2),
          bitcoin: parseFloat(data.BTCBRL.bid).toFixed(2),
          atualizadoEm: new Date(data.USDBRL.create_date).toLocaleTimeString(),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCotacoes();

    // Atualiza a cada 5 minutos (opcional)
    const interval = setInterval(fetchCotacoes, 300000);
    return () => clearInterval(interval);
  }, []);

  return { cotacoes, loading, error };
};

export default useCotacoes;
