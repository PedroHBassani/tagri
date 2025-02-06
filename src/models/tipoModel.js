const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Tipo = sequelize.define(
  "Tipo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    chave: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    deletado_as: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tipos",
    timestamps: false,
  }
);

module.exports = Tipo;
