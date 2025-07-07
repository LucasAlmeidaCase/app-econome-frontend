import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import useCotacoes from "../hooks/useCotacoes";

const CotacoesCard = () => {
  const { cotacoes, loading, error } = useCotacoes();

  if (error) {
    return (
      <Card sx={{ backgroundColor: "#fff3e0" }}>
        <CardContent>
          <Typography color="error">Erro ao carregar cotações</Typography>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card sx={{ backgroundColor: "#e3f2fd" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Cotações Atuais
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Tooltip title="Dólar Americano" arrow>
              <div>
                <Typography variant="subtitle2">USD → BRL</Typography>
                <Typography variant="h6">R$ {cotacoes.dolar}</Typography>
              </div>
            </Tooltip>
          </Grid>

          <Grid item xs={4}>
            <Tooltip title="Euro" arrow>
              <div>
                <Typography variant="subtitle2">EUR → BRL</Typography>
                <Typography variant="h6">R$ {cotacoes.euro}</Typography>
              </div>
            </Tooltip>
          </Grid>

          <Grid item xs={4}>
            <Tooltip title="Bitcoin" arrow>
              <div>
                <Typography variant="subtitle2">BTC → BRL</Typography>
                <Typography variant="h6">R$ {cotacoes.bitcoin}</Typography>
              </div>
            </Tooltip>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, textAlign: "right" }}
        >
          Atualizado em: {cotacoes.atualizadoEm}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CotacoesCard;
