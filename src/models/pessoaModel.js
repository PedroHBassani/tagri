const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Pessoa = sequelize.define(
  "Pessoa",
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
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
  },
  {
    tableName: "pessoas",
    timestamps: false,
  }
);

Pessoa.sync()
  .then(() => {
    console.log('Tabela "pessoas" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Pessoa;
