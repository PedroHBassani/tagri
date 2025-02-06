const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Usuario = require("./usuarioModel.js");

const UsuarioConfiguracao = sequelize.define(
  "UsuarioConfiguracao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
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
    tableName: "usuarios_configuracoes",
    timestamps: false,
  }
);

module.exports = UsuarioConfiguracao;
