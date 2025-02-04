const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Entidade = require("./entidadeModel.js");
const Conta = require("./contaModel.js");
const Agencia = require("./agenciaModel.js");

const ContaBancaria = sequelize.define(
  "ContaBancaria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entidade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Entidade,
        key: "id",
      },
    },
    conta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Conta,
        key: "id",
      },
    },
    agencia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Agencia,
        key: "id",
      },
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    digito: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletado_as: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "contaBancarias",
    timestamps: true,
  }
);

ContaBancaria.sync()
  .then(() => {
    console.log('Tabela "contaBancarias" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = ContaBancaria;
