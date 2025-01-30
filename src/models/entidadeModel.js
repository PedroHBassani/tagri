const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Pessoa = require("./pessoaModel.js");

const Entidade = sequelize.define(
  "Entidade",
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
  },
  {
    tableName: "entidades",
    timestamps: false,
  }
);

Entidade.sync()
  .then(() => {
    console.log('Tabela "entidades" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Entidade;
