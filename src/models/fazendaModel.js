const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Fazenda = sequelize.define(
  "Fazenda",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    responsavel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "fazendas",
    timestamps: false,
  }
);

module.exports = Fazenda;
