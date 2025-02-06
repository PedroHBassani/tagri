const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Produto = sequelize.define(
  "Produto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unidade_medida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
  },
  {
    tableName: "produtos",
    timestamps: false,
  }
);

module.exports = Produto;
