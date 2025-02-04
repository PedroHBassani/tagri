const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const {
  ReferenceType,
  OptionalString,
  BooleanType,
} = require("../utils/modelTypes.js");
const Safra = require("./safraModel.js");
const Pessoa = require("./pessoaModel.js");

const Telefone = sequelize.define(
  "Telefone",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pessoa_id: ReferenceType(Pessoa),
    numero_com_ddd: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    principal: BooleanType,
    modificado_as: {
      type: DataTypes.DATE,
      allowNull: false,
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
  {
    tableName: "telefone",
    timestamps: false,
  }
);

Telefone.sync()
  .then(() => {
    console.log('Tabela "telefone" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Telefone;
