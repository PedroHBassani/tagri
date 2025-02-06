const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
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
    duplicata_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Duplicata,
        key: "id",
      },
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produto,
        key: "id",
      },
    },
  },
  {
    tableName: "duplicatas_detalhes",
    timestamps: false,
  }
);

module.exports = DuplicataDetalhe;
