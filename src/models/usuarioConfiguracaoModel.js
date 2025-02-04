const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const { ReferenceType } = require("../utils/modelTypes.js");
const Usuario = require("./usuarioModel.js");

const UsuarioConfiguracao = sequelize.define(
  "UsuarioConfiguracao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: ReferenceType(Usuario),
    chave: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    valor: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "usuariosConfiguracao",
    timestamps: false,
  }
);

UsuarioConfiguracao.sync()
  .then(() => {
    console.log('Tabela "usuariosConfiguracao" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = UsuarioConfiguracao;
