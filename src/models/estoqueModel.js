const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Estoque = sequelize.define(
  "Estoque",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entidade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "estoques",
    timestamps: false,
  }
);

module.exports = Estoque;
