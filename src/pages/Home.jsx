import { Box, Typography } from "@mui/material";
import Banner from "../components/Banner";
import { useTransacoes } from "../hooks/useTransacoes";
import ResumoDiario from "../components/ResumoDiario";
import { isHojeUTC } from "../utils/dateUtils";

const Home = () => {
  const { transacoes, loading } = useTransacoes();

  const despesasHoje = transacoes
    .filter(
      (t) => t.tipo_transacao === "Despesa" && isHojeUTC(t.data_vencimento)
    )
    .reduce((total, t) => total + parseFloat(t.valor), 0);

  const receitasHoje = transacoes
    .filter(
      (t) => t.tipo_transacao === "Receita" && isHojeUTC(t.data_vencimento)
    )
    .reduce((total, t) => total + parseFloat(t.valor), 0);
  return (
    <>
      <Banner />

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Transações previstas para hoje ({new Date().toLocaleDateString()})
        </Typography>

        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <ResumoDiario receitas={receitasHoje} despesas={despesasHoje} />
        )}
      </Box>
    </>
  );
};

export default Home;
