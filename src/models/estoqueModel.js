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
    timestamps: true,
  }
);

Estoque.sync()
  .then(() => {
    console.log('Tabela "estoques" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Estoque;
