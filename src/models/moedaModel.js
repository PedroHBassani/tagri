const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Moeda = sequelize.define(
  "Moeda",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome_plural: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "moedas",
    timestamps: false,
  }
);

module.exports = Moeda;
