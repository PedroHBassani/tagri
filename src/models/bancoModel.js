const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Banco = sequelize.define(
  "Banco",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "bancos",
    timestamps: false,
  }
);


module.exports = Banco;
