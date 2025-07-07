import { Card, CardContent, Grid, Typography } from "@mui/material";

const ResumoDiario = ({ receitas = 0, despesas = 0 }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ backgroundColor: "#e8f5e9" }}>
          <CardContent>
            <Typography variant="subtitle1">Receitas</Typography>
            <Typography variant="h5" color="green">
              R$ {receitas.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card sx={{ backgroundColor: "#ffebee" }}>
          <CardContent>
            <Typography variant="subtitle1">Despesas</Typography>
            <Typography variant="h5" color="green">
              R$ {despesas.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResumoDiario;
