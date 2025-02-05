const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const { ReferenceType } = require("../utils/modelTypes.js");
const Usuario = require("./usuarioModel.js");
const Entidade = require("./entidadeModel.js");

const UsuarioEntidade = sequelize.define(
  "UsuarioEntidade",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: ReferenceType(Usuario),
    entidade_id: ReferenceType(Entidade),
  },
  {
    tableName: "usuario_entidades",
    timestamps: false,
  }
);

UsuarioEntidade.sync()
  .then(() => {
    console.log('Tabela "usuario_entidades" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = UsuarioEntidade;
