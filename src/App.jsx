import { Container } from "@mui/material";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Transacoes from "./pages/Transacoes";
import Pedidos from "./pages/Pedidos";
import Participantes from "./pages/Participantes";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transacoes" element={<Transacoes />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/participantes" element={<Participantes />} />
          <Route path="/*" element={<p>Página não encontrada (404)</p>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
