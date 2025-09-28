# 💼 EconoMe Front-end (React)

Interface web que consome as APIs de Pedidos, Participantes e Transações.

> Atualizações recentes:
> - Autocomplete de Participantes (busca remota com debounce)
> - Resposta de Pedidos agora vem enriquecida com objeto `participante`
> - Redução de N+1 chamadas (frontend não busca mais participante individualmente)
> - POST / PUT de Pedido já retornam payload enriquecido (UI exibe imediatamente o nome)

## Stack

React (Vite) · Material UI · Axios

## ▶️ Rodar Local

```bash
npm install
npm run dev
```

URL: <http://localhost:5173>

## 🐳 Docker (opcional)

```bash
docker network create econome-net # (uma vez)
docker compose up -d --build
```

URL container: <http://localhost:8085>

## 🔌 Variáveis (.env)

```env
VITE_API_URL=http://localhost:5001                 # Transações
VITE_PEDIDOS_API_URL=http://localhost:8080/api/pedidos
VITE_PARTICIPANTES_API_URL=http://localhost:8081/api/participantes
```

Obs: Vite injeta no build. Alterou? Rebuild.

## ✨ Principais Funcionalidades

- CRUD de Pedidos, Participantes e Transações
- Pedido FATURADO gera/atualiza Transação automática (backend)
- Edição de Pedido carrega transação ligada (pedido_id)
- Participante embutido em pedidos (reduz chamadas extras)
- Autocomplete de participante no formulário de Pedido (busca por código ou nome)
- Resposta de criação/atualização de Pedido já retorna participante (sem flicker de "carregando")
- Filtros de período em Pedidos/Transações (persistidos em localStorage)
- Alternar fonte de dados de Transações (API ↔ JSON local) para demonstração

## 🔗 Integração Simplificada

Pedidos (Java) publica eventos → Transações (Python) cria/atualiza.
Pedidos também executa enriquecimento síncrono consultando Participantes e devolve:

```jsonc
{
  "id": 42,
  "numeroPedido": "PED-140",
  "participanteId": 3,
  "participante": {
    "id": 3,
    "codigo": "PART-3",
    "nome": "EMPRESA XYZ",
    "cpfCnpj": "00349045000183",
    "tipoPessoa": "JURIDICA",
    "tipoParticipante": "FORNECEDOR"
  }
}
```

Por que manter `participanteId` mesmo com objeto embutido?

1. Fallback se enriquecimento falhar / for desativado.
2. Requests enviam apenas o ID (consistência mental).
3. Permite no futuro retornar payload slim (sem `participante`) via `?embed=participante`.
4. Facilidade para filtros rápidos no cliente.

## Estrutura (essencial)

```text
src/
  components/   # UI e modais
  pages/        # Rotas principais
  hooks/        # Lógica de dados
  api/          # Serviços HTTP
```

## Comandos Úteis

```bash
npm run dev       # desenvolvimento
npm run build     # build produção
npm run preview   # servir build
```

## 🐞 Notas Rápidas

- Rebuild necessário para trocar endpoints.
- Campos imutáveis (ex: número do pedido, código participante) desabilitados em edição.
- Datas padronizadas (YYYY-MM-DD) para inputs.
- Autocomplete de participante aplica debounce e limita resultados (lado backend).
- Fallback de exibição usa `participante?.nome ?? participanteId`.

## ➕ Próximos (ideias)

Paginação • Tests (RTL/Vitest) • Tema dark • I18n

## 👤 Autor

Lucas Almeida
