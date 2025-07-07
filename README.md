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

- ✅ Adicionar novas transações (Receita ou Despesa)
- 📋 Visualizar transações cadastradas em tabela responsiva
- 🗑️ Remover transações com confirmação
- 💡 Interface moderna com Material UI

---

## 🧱 Tecnologias Utilizadas

- ⚛️ **React** com Vite
- 🎨 **Material UI** (v5)
- 🧠 **Hooks** para gerenciamento de estado local
- 💅 Estilização com CSS global e SX do Material UI

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
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## 🌐 API Externa Utilizada

O projeto consome a API pública de cotações da [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas):

- **Nome**: AwesomeAPI - API de Cotações de Moedas
- **Licença**: Gratuita para uso não comercial
- **Requer chave de acesso**: Não
- **Rotas utilizadas**:
  - `GET https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL`
- **Dados obtidos**:
  - Cotação do Dólar (USD-BRL)
  - Cotação do Euro (EUR-BRL)
  - Cotação do Bitcoin (BTC-BRL)

---

## 📝 Observações

- Este front-end consome a API localizada por padrão em `http://localhost:5001`
- Esta versão substitui a antiga interface feita com HTML, CSS e JS puros.
- A migração preserva a lógica original, mas adota boas práticas modernas com componentes, estado reativo e design responsivo.

---

👨‍💻 Desenvolvido por [Lucas Almeida](https://github.com/LucasAlmeidaCase)