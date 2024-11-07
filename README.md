# Agro Finance API

Este é um projeto de API para gerenciamento de safras.

## Requisitos

- Node.js
- NPM ou Yarn

## Instalação

1. Após clonar o repositório, acesse a pasta do projeto:

   ```sh
   cd tagri
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example` e preencha com suas configurações:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=senha_do_banco
   DB_NAME=nome_do_banco
   DB_DIALECT=mysql
   ```

## Uso

1. Inicie o servidor:

   ```sh
   npm run dev
   ```

2. Acesse a API em `http://localhost:3000`.
