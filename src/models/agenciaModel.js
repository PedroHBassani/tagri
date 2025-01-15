const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Banco = require("./bancoModel.js");

const Agencia = sequelize.define(
  "Agencia",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    banco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Banco,
        key: "id",
      },
    },
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    digito: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "agencias",
    timestamps: true,
  }
);

Agencia.sync()
  .then(() => {
    console.log('Tabela "agencias" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Agencia;
