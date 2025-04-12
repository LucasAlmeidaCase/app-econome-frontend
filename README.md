# Front-end EconoMe

[![GitHub Repo](https://img.shields.io/badge/GitHub-View%20Repository-blue?logo=github)](https://github.com/LucasAlmeidaCase/app-econome-frontend)

Este projeto faz parte do material didático da Disciplina **Desenvolvimento Full Stack Básico**.

O objetivo deste projeto é ilustrar o conteúdo apresentado ao longo das três aulas da disciplina, utilizando HTML, CSS e JavaScript puro para consumir a API do sistema EconoMe.

---

## 🔗 Repositórios do Projeto

- 🔙 [Back-end (API EconoMe)](https://github.com/LucasAlmeidaCase/app-econome-backend)
- 🔜 Front-end (você está aqui)

---

## ✅ Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge etc.)
- Servidor local (opcional, mas recomendado para evitar problemas com CORS)

---

## 🚀 Como executar

Após clonar este repositório:

```bash
git clone https://github.com/LucasAlmeidaCase/app-econome-frontend.git
cd app-econome-frontend
```

### ✅ Opção 1: Usando Live Server (recomendado para VS Code)

1. Instale a extensão **Live Server** no VS Code.
2. Abra a pasta do projeto no VS Code.
3. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
4. O projeto será iniciado em `http://127.0.0.1:5500` (ou porta similar).

### ✅ Opção 2: Usando servidor HTTP com Python

```bash
# Python 3.x
python -m http.server
```

Acesse no navegador: `http://localhost:8000`

---

## ⚙️ Funcionalidades

- ✅ Cadastrar nova transação (Receita ou Despesa)
- 📄 Listar transações já cadastradas
- 🗑️ Remover transações existentes
- 📊 Visualização simples em tabela

---

## 📁 Estrutura de Pastas

```
📁 app-econome-frontend
├── index.html
├── css/
│   └── main.css
├── js/
│   ├── main.js
│   ├── api/
│   │   └── transacoesAPI.js
│   └── ui/
│       └── transacoesUI.js
```

---

## 📝 Observações

- Este front-end consome a API localizada por padrão em `http://localhost:5000`
- Nenhum framework ou biblioteca externa foi utilizada (React, Vue, Bootstrap etc.)
- Projeto construído com HTML, CSS e JavaScript puro para reforçar o entendimento da base da Web

---

👨‍💻 Desenvolvido por [Lucas Almeida](https://github.com/LucasAlmeidaCase)