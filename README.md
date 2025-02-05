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

# Subir o banco de dados MYSQL pelo Docker

## Requisitos

- Docker

## Instalação

1. Instale a imagem do MySQL:

   ```sh
   docker pull mysql:latest
   ```

2. Crie um container com o MySQL:

   ```sh
   docker run --name mysql -e MYSQL_ROOT_PASSWORD=1234 -p 3306:3306 -d mysql:latest
   ```

3. Acessar o container:

   ```sh
   docker exec -it mysql bash
   ```

4. Acesse o MySQL:

   ```sh
   mysql -u root -p
   ```

5. Após inserir a senha, crie o banco de dados:

   ```sql
   CREATE DATABASE tagri;
   ```

6. Para sincronizar as tabelas:

   ```js
   node .\src\models\sync.js
   ```

## Uso

1. Inicie o servidor:

   ```sh
   npm run dev
   ```

2. Acesse a API em `http://localhost:3000`.

## Requisições pelo Postman

Para importar o arquivo `Tagri.postman_collection.json` no Postman.

Import > files > Tagri.postman_collection.json.