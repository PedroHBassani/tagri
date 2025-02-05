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

Conta.sync()
  .then(() => {
    console.log('Tabela "contas" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Conta;
