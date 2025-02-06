const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Pessoa = require("./pessoaModel.js");

const Fornecedor = sequelize.define(
  "Fornecedor",
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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    inscricao_municipal: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    tableName: "fornecedores",
    timestamps: false,
  }
);

module.exports = Fornecedor;
