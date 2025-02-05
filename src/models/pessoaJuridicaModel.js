const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const { ReferenceType } = require("../utils/modelTypes.js");
const Pessoa = require("./pessoaModel.js");

const PessoaJuridica = sequelize.define(
  "PessoaJuridica",
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
    razao_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pessoa_juridicas",
    timestamps: false,
  }
);

PessoaJuridica.sync()
  .then(() => {
    console.log('Tabela "pessoa_juridicas" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = PessoaJuridica;
