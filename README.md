# 💼 EconoMe - Front-end

[![GitHub Repo](https://img.shields.io/badge/GitHub-View%20Repository-blue?logo=github)](https://github.com/LucasAlmeidaCase/app-econome-frontend)

Interface web do sistema **EconoMe**, uma aplicação para controle financeiro pessoal e empresarial. Este repositório representa a **versão refatorada em React** do front-end, utilizando Material UI como base visual.

> Projeto desenvolvido como parte do conteúdo didático da disciplina **Desenvolvimento Front-end Avançado**.

---

## 🔗 Repositórios do Projeto

- 🧾 [API de Pedidos (Java/Spring)](https://github.com/LucasAlmeidaCase/app-econome-pedidos.git)
- 💸 [API de Transações (Python/Flask)](https://github.com/LucasAlmeidaCase/app-econome-transacoes.git)
- 👥 [API de Participantes (Java/Spring)](https://github.com/LucasAlmeidaCase/app-econome-participantes.git)
- �️ Front-end React (você está aqui)

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

## 🐳 Execução via Docker / Compose (Modo Avaliação)

Fluxo pensado para quem só quer subir rapidamente o front consumindo as três APIs já rodando localmente (ou em outros composes):

```bash
# 1. Criar rede externa compartilhada (uma única vez se ainda não existir)
docker network create econome-net

# 2. Subir o front (na pasta app-econome-frontend)
docker compose up -d --build

# 3. Acessar
http://localhost:8085
```

O `docker-compose.yml` deste repositório já:

- Usa build args para injetar as URLs das APIs (Transações, Pedidos, Participantes) no momento do build.
- Conecta o container `econome-frontend` à rede externa `econome-net` para que, futuramente, você possa apontar as URLs para hostnames internos (ex.: `http://app-econome-pedidos:8080`).

Se alterar portas das APIs, ajuste os `args:` no compose e refaça `docker compose up -d --build`.

 
### Por que build args e não variáveis de runtime?

O Vite embute as variáveis `VITE_*` no bundle durante o build – alterar env depois que a imagem está pronta não muda o JavaScript gerado. Para trocar endpoints é necessário re-build ou adotar um mecanismo de runtime config (fora de escopo neste MVP simplificado).

 
### CORS

Os serviços Java (Pedidos e Participantes) foram configurados para aceitar por padrão `http://localhost:5173` e `http://localhost:8085` (variável custom `app.cors.allowed-origins`).

---

## ✨ Funcionalidades

### Transações

- ✅ Adicionar novas transações (Receita ou Despesa)
- 📋 Visualizar transações em tabela responsiva
- 🗑️ Remover transações com confirmação modal
- ✏️ Editar transações existentes (modal reutilizado com campos pré-preenchidos)
- 🔁 Conversão automática de datas (RFC 1123 -> YYYY-MM-DD) ao abrir para edição
- 🆔 Uso do campo `id` retornado pela API como chave estável (melhor performance em re-render)
- 🔄 Atualização persistida via `PUT /transacao/{id}`

### Pedidos

- 🧾 CRUD completo de Pedidos (criar, editar, remover, listar)
- 🗂️ Filtro por período (Hoje, Semana, Mês Atual, Personalizado, Todos) com persistência em `localStorage`
- 🔄 Carregamento automático dos dados financeiros vinculados (transação) ao editar um Pedido FATURADO
- 🧮 Campos financeiros condicionais exibidos apenas se a situação for `FATURADO` (vencimento, pago, data pagamento)
- 💾 Persistência do último filtro aplicado entre sessões
- 🆔 Coluna de ID interna removida na tabela; ID exibido via tooltip ao passar o mouse sobre o número do pedido

### Experiência e Infra
.
- 💡 Interface moderna com Material UI
- 🏷️ Normalização de datas (YYYY-MM-DD) para inputs HTML e conversão segura de timezones
- ⚙️ Variável de ambiente para configurar URL da API (`VITE_API_URL`)
- ♻️ Reuso de componentes (modal, filtros, tabela, snackbar e dialog genérico de confirmação)
- 🧩 Único formulário para criar/editar transações (detecção de modo por presença de `id`)
- 🕵️ Parsing resiliente de datas para inputs `type=date`

### Participantes

- 👥 CRUD completo de Participantes (criar, editar, remover, listar)
- 🔒 Código do participante imutável após criação (campo desabilitado em modo edição)
- 🕒 Data/Hora de cadastro controlada e preservada pelo backend; exibida somente em edição e em modo somente leitura
- 🆔 Coluna de ID removida; ID interno acessível via tooltip ao passar o mouse sobre o código
- ✅ Validações de unicidade (código / CPF-CNPJ) retornam mensagens claras de erro exibidas via snackbar
- ✏️ Mesmo modal reutilizado para criação e edição (detecção por presença de `id`)
- 🚫 Página sem filtros de período (simplificação intencional inicial)
- 🔄 Preparada para futura paginação e busca server-side
- 🆔 Mesma estratégia de tooltip para expor ID interno sem poluir a tabela

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

- Listagem, criação e atualização de transações financeiras
- Endpoint especial de consulta de transação por `pedido_id` para preencher automaticamente o formulário de edição de Pedido
- Suporte a atualização parcial simples via `PUT /transacao/{id}` (campos não enviados não são alterados)

### API Interna de Pedidos (Microserviço Java/Spring)

- CRUD de pedidos
- Em caso de Pedido FATURADO dispara evento (lado back-end) que cria transação automática — refletida aqui após recarregar/editar

> A URL dessas APIs pode ser configurada pelas variáveis de ambiente listadas (ver seção abaixo).

### API Interna de Participantes (Microserviço Java/Spring)

- CRUD de participantes (código, nome, CPF/CNPJ, tipo de pessoa, tipo de participante, data/hora cadastro)
- Validação de unicidade (código e CPF/CNPJ)
- Data/Hora de cadastro atribuída e preservada pelo backend (imutável após criação)
- Atualização ignora tentativas de alteração de campos imutáveis (data/hora cadastro, código)

> Endpoint base padrão: `http://localhost:8081/api/participantes` (sobreponha via `VITE_PARTICIPANTES_API_URL`).

---

## 🔗 Integração Multi-Serviços (Resumo Arquitetural)

Front React chama diretamente os três microserviços:

- Pedidos (Java/Spring Boot)
- Participantes (Java/Spring Boot)
- Transações (Flask/Python)
- Além de API externa de cotações (AwesomeAPI)

Quando um Pedido FATURADO é criado ou atualizado:

1. Serviço de Pedidos dispara Domain Event pós-commit
2. Listener tenta localizar transação existente (consulta GET `/transacoes/pedido/{pedido_id}` no serviço Python)
3. Se existir, executa PUT `/transacao/{id}` (update parcial); caso contrário cria via POST `/transacao`
4. Front, ao abrir modal de edição de Pedido FATURADO, também consulta `/transacoes/pedido/{pedido_id}` para preencher dados financeiros

Esta abordagem substitui tentativa anterior de PUT direto por `pedido_id` (endpoint inexistente) – eliminando erro HTTP 405 e conflitos 409 desnecessários.

---

## 🔧 Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz se quiser customizar as URLs:

```bash
# API de Transações (Python)
VITE_API_URL=http://localhost:5001

# API de Pedidos (Java/Spring)
VITE_PEDIDOS_API_URL=http://localhost:8080/api/pedidos

# API de Participantes (Java/Spring)
VITE_PARTICIPANTES_API_URL=http://localhost:8081/api/participantes
```

Fallbacks internos:

- Transações: `http://127.0.0.1:5001`
- Pedidos: `http://localhost:8080/api/pedidos`
- Participantes: `http://localhost:8081/api/participantes`

Quando rodando tudo em containers separados e usando rede Docker externa (`econome-net`), você pode apontar para os hostnames dos serviços (ex.: `http://app-econome-transacoes:5001` e `http://app-econome-pedidos:8080/api/pedidos`) se expuser o front-end em outro container na mesma rede.

No compose deste repositório (front), as variáveis são passadas como `build args` – modifique-as em `docker-compose.yml` caso as portas dos backends mudem.

---

## 🎛️ Alternância de Fonte de Dados (Modo Local vs API)

Na página de Transações há um botão: `Usar Backend` / `Usar JSON Local`.

- Quando em modo JSON Local, operações CRUD atuam sobre `public/database.json` (simulação) sem afetar o backend.
- Ideal para demonstração offline ou teste rápido de UI.
- Estado do toggle não é persistido (reinicia usando backend).

---

## 🗂️ Filtros e Persistência

As páginas de Transações e Pedidos armazenam o último filtro aplicado em `localStorage` (Participantes não possui filtro nesta versão):

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
2. Backend de Pedidos dispara evento de domínio e cria uma Transação vinculada (via `pedido_id`).
3. Ao editar esse Pedido no front-end, o formulário consulta `/transacoes/pedido/{id}` e preenche campos financeiros.
4. Campos condicionais (vencimento, pago, data pagamento) só aparecem se a situação for FATURADO.
5. A transação criada pode ser posteriormente editada na tela de Transações (persistindo via `PUT /transacao/{id}`).

Benefícios:

- Evita digitação duplicada de valores financeiros.
- Reduz risco de divergência entre Pedido e Transação.

---

---

## 📝 Observações

- API de Transações padrão: `http://localhost:5001` (sobreponha via `VITE_API_URL`).
- API de Pedidos padrão: `http://localhost:8080/api/pedidos` (sobreponha via `VITE_PEDIDOS_API_URL`).
- API de Participantes padrão: `http://localhost:8081/api/participantes` (sobreponha via `VITE_PARTICIPANTES_API_URL`).
- Esta versão substitui a antiga interface feita com HTML, CSS e JS puros.
- Data binding e filtros foram desenhados para minimizar re-renderizações desnecessárias.
- Estrutura voltada a evoluir para divisão por feature modules (ex.: `pedidos/`, `transactions/`, `participantes/`).
- Edição de entidades reutiliza modais compartilhados.
- `data_pagamento` só é enviada se `pago=true`; desmarcar pago remove data (consistência de domínio).
- Campos imutáveis no front (código de participante, número do pedido, data/hora de cadastro) também são tratados no backend para preservação de integridade.

---

## 🚀 Roadmap (Sugestões Futuras)

- Paginação e ordenação nas tabelas (server-side quando API suportar)
- Edição inline de status de pagamento
- Cache de cotações com Stale-While-Revalidate
- Testes com React Testing Library + Vitest
- Tema dark/light toggle persistente
- Internacionalização (i18n)
- Otimização de bundle com code splitting por rota
- Botão rápido (inline) para alternar status de pagamento sem abrir modal
- Validação cruzada (ex.: impedir `data_pagamento` anterior a `data_vencimento` em casos inválidos)

---

---

👨‍💻 Desenvolvido por [Lucas Almeida](https://github.com/LucasAlmeidaCase)
