import { AppBar, Box, Button, Toolbar, Tooltip } from "@mui/material";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1e88e5" }}>
      <Toolbar>
        {/* Logo */}
        <Tooltip title="Clique para voltar à página inicial" arrow>
          <Box
            component={Link}
            to="/home"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              gap: 1,
            }}
          >
            <img
              src={logo}
              alt="Logo EconoMe"
              style={{ width: 60, height: 60 }}
            />
          </Box>
        </Tooltip>
        {/* Botões de Navegação */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Button component={Link} to="/home" color="inherit">
            Início
          </Button>
          <Button component={Link} to="/pedidos" color="inherit">
            Pedidos
          </Button>
          <Button component={Link} to="/transacoes" color="inherit">
            Transações
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
