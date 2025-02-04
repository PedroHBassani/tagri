const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const { ReferenceType } = require("../utils/modelTypes.js");
const Duplicata = require("./duplicataModel.js");
const Produto = require("./produtoModel.js");

const DuplicataDetalhe = sequelize.define(
  "DuplicataDetalhe",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duplicata_id: ReferenceType(Duplicata),
    produto_id: ReferenceType(Produto),
  },
  {
    tableName: "duplicatasDetalhes",
    timestamps: true,
  }
);

DuplicataDetalhe.sync()
  .then(() => {
    console.log('Tabela "duplicatasDetalhes" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = DuplicataDetalhe;
