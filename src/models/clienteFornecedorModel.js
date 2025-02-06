const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Pessoa = require("./pessoaModel.js");

const ClienteFornecedorModel = sequelize.define(
  "ClienteFornecedorModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pessoa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pessoa,
        key: "id",
      },
    },
    inscricao_estadual: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    inscricao_municipal: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    tableName: "cliente_fornecedores",
    timestamps: false,
  }
);

module.exports = ClienteFornecedorModel;
