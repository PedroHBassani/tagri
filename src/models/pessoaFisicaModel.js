const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const { ReferenceType } = require("../utils/modelTypes.js");
const Pessoa = require("./pessoaModel.js");

const PessoaFisica = sequelize.define(
  "PessoaFisica",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pessoa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pessoa,
        key: "id",
      },
    },
    sobrenome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pessoa_fisicas",
    timestamps: false,
  }
);

PessoaFisica.sync()
  .then(() => {
    console.log('Tabela "pessoa_fisicas" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = PessoaFisica;
