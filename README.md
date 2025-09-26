# 💼 EconoMe - Front-end

[![GitHub Repo](https://img.shields.io/badge/GitHub-View%20Repository-blue?logo=github)](https://github.com/LucasAlmeidaCase/app-econome-frontend)

Interface web do sistema **EconoMe**, uma aplicação para controle financeiro pessoal e empresarial. Este repositório representa a **versão refatorada em React** do front-end, utilizando Material UI como base visual.

> Projeto desenvolvido como parte do conteúdo didático da disciplina **Desenvolvimento Front-end Avançado**.

---

## 🔗 Repositórios do Projeto

- 🔙 [Back-end (API EconoMe)](https://github.com/LucasAlmeidaCase/app-econome-backend)
- 🔜 Front-end React (você está aqui)

---

## ✅ Pré-requisitos

- Node.js `v18+` ou superior
- Navegador (Chrome, Firefox, etc.)

---

## ⚙️ Instalação e Execução

```bash
# Clone o projeto
git clone https://github.com/LucasAlmeidaCase/app-econome-frontend.git
cd app-econome-frontend

# Instale as dependências
npm install

# Inicie a aplicação
npm run dev
```

A aplicação será iniciada em: [http://localhost:5173](http://localhost:5173)

---

## ✨ Funcionalidades

### Transações

- ✅ Adicionar novas transações (Receita ou Despesa)
- 📋 Visualizar transações em tabela responsiva
- 🗑️ Remover transações com confirmação modal

### Pedidos

- 🧾 CRUD completo de Pedidos (criar, editar, remover, listar)
- 🗂️ Filtro por período (Hoje, Semana, Mês Atual, Personalizado, Todos) com persistência em `localStorage`
- 🔄 Carregamento automático dos dados financeiros vinculados (transação) ao editar um Pedido FATURADO
- 🧮 Campos financeiros condicionais exibidos apenas se a situação for `FATURADO` (vencimento, pago, data pagamento)
- 💾 Persistência do último filtro aplicado entre sessões

### Experiência e Infra

- 💡 Interface moderna com Material UI
- 🏷️ Normalização de datas (YYYY-MM-DD) para inputs HTML e conversão segura de timezones
- ⚙️ Variável de ambiente para configurar URL da API (`VITE_API_URL`)
- ♻️ Reuso de componentes (modal, filtros, tabela, snackbar e dialog genérico de confirmação)

---

## 🧱 Tecnologias Utilizadas

- ⚛️ **React** com Vite
- 🎨 **Material UI** (v5)
- 🧠 **Custom Hooks** (`useTransacoes`, `usePedidos`, `useCotacoes`)
- 🌐 **Axios** para consumo de APIs
- 🕒 Utilitários de datas para filtragem (`dateUtils.js`)
- 💅 Estilização híbrida: CSS global + `sx` / props do MUI

---

## 📁 Estrutura de Pastas

```bash
📁 app-econome-frontend
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/              # Imagens e recursos visuais
│   ├── components/
│   │   ├── common/          # Componentes genéricos
│   ├── pages/               # Páginas principais
│   ├── styles/
│   │   └── global.css       # Estilos globais
│   ├── App.jsx              # Componente raiz
│   └── main.jsx             # Ponto de entrada da aplicação
├── index.html               # HTML base da aplicação
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## 🌐 APIs Consumidas

### AwesomeAPI (Cotações)

O projeto consome a API pública de cotações da [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas):

- **Nome**: AwesomeAPI - API de Cotações de Moedas
- **Licença**: Gratuita para uso não comercial
- **Requer chave de acesso**: Não
- **Rota**: `GET https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL`
- **Dados obtidos**: USD/BRL, EUR/BRL, BTC/BRL (usados no card de resumo)

### API Interna de Transações (Microserviço Python)

- Listagem e criação de transações financeiras
- Endpoint especial de consulta de transação por `pedido_id` para preencher automaticamente o formulário de edição de Pedido

### API Interna de Pedidos (Microserviço Java/Spring)

- CRUD de pedidos
- Em caso de Pedido FATURADO dispara evento (lado back-end) que cria transação automática — refletida aqui após recarregar/editar

> A URL dessas APIs pode ser configurada pela variável `VITE_API_URL` (ver seção abaixo).

---

## 🔧 Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz (mesmo nível do `package.json`) se precisar apontar para outra URL da API de Transações:

```bash
VITE_API_URL=http://localhost:5001
```

Se ausente, o fallback interno usa `http://127.0.0.1:5001`.

---

## 🎛️ Alternância de Fonte de Dados (Modo Local vs API)

Na página de Transações há um botão: `Usar Backend` / `Usar JSON Local`.

- Quando em modo JSON Local, operações CRUD atuam sobre `public/database.json` (simulação) sem afetar o backend.
- Ideal para demonstração offline ou teste rápido de UI.
- Estado do toggle não é persistido (reinicia usando backend).

---

## �️ Filtros e Persistência

Ambas as páginas (Transações e Pedidos) armazenam o último filtro aplicado em `localStorage`:

Campos gravados (por página): `tipo`, `dataInicio`, `dataFim`.

Tipos de filtro suportados:

- `hoje`
- `semana`
- `mesAtual`
- `periodoPersonalizado`
- `todos`

O cálculo de datas utiliza funções utilitárias centralizadas para manter consistência e mitigação de problemas de timezone.

---

## 🔄 Integração Pedidos ↔ Transações

Fluxo resumido:

1. Usuário cria um Pedido e marca situação FATURADO.
1. Backend de Pedidos dispara evento de domínio e cria uma Transação vinculada (via `pedido_id`).
1. Ao editar esse Pedido no front-end, o formulário consulta `/transacoes/pedido/{id}` e preenche campos financeiros.
1. Campos condicionais (vencimento, pago, data pagamento) só aparecem se a situação for FATURADO.

Benefícios:

- Evita digitação duplicada de valores financeiros.
- Reduz risco de divergência entre Pedido e Transação.

---

---

## 📝 Observações

- API de Transações padrão: `http://localhost:5001` (sobreponha via `VITE_API_URL`).
- Esta versão substitui a antiga interface feita com HTML, CSS e JS puros.
- Data binding e filtros foram desenhados para minimizar re-renderizações desnecessárias.
- Estrutura voltada a evoluir para divisão por feature modules (ex.: `pedidos/`, `transactions/`).

---

## 🚀 Roadmap (Sugestões Futuras)

- Paginação e ordenação nas tabelas (server-side quando API suportar)
- Edição inline de status de pagamento
- Cache de cotações com Stale-While-Revalidate
- Testes com React Testing Library + Vitest
- Tema dark/light toggle persistente
- Internacionalização (i18n)
- Otimização de bundle com code splitting por rota

---

---

👨‍💻 Desenvolvido por [Lucas Almeida](https://github.com/LucasAlmeidaCase)
