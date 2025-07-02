import { Box, Typography } from "@mui/material";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <Box className="header-container">
      <Box className="logo-container">
        <img src={logo} alt="Logo EconoMe" className="logo" />
        <div className="title-text">
          <Typography variant="h4" component="h1">
            Sistema de Gestão Financeira
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
