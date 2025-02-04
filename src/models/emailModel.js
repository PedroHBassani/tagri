const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Pessoa = require("./pessoaModel.js");
const { ReferenceType } = require("../utils/modelTypes.js");

const Email = sequelize.define(
  "Email",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    pessoa_id: ReferenceType(Pessoa),
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "emails",
    timestamps: false,
  }
);

Email.sync()
  .then(() => {
    console.log('Tabela "emails" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Email;
