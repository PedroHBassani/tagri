const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Conta = sequelize.define(
  "Conta",
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
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    deletado_as: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "contas",
    timestamps: false,
  }
);

module.exports = Conta;
