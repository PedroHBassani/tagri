const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
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
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    entidade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Entidade,
        key: "id",
      },
    },
  },
  {
    tableName: "usuario_entidades",
    timestamps: false,
  }
);

module.exports = UsuarioEntidade;
