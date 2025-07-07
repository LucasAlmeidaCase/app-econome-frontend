import { Box, Typography } from "@mui/material";
import banner from "../assets/banner.png";

export default function Header() {
  return (
    <Box className="banner">
      <img src={banner} alt="Banner financeiro" className="banner-img" />
      <div className="banner-texto">
        <Typography variant="h5">
          Controle suas finanças de forma simples e eficiente
        </Typography>
        <Typography variant="body1">
          Com o EconoMe, você pode gerenciar suas despesas e receitas de maneira
          fácil e prática.
        </Typography>
      </div>
    </Box>
  );
}
