const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const { ReferenceType, OptionalString } = require("../utils/modelTypes.js");
const Pessoa = require("./pessoaModel.js");

const Fornecedor = sequelize.define(
  "Fornecedor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pessoa_id: ReferenceType(Pessoa),
    inscricao_estadual: OptionalString,
    inscricao_municipal: OptionalString,
  },
  {
    tableName: "fornecedores",
    timestamps: true,
  }
);

Fornecedor.sync()
  .then(() => {
    console.log('Tabela "fornecedores" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Fornecedor;
