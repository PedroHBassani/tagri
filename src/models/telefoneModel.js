const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Pessoa = require("./pessoaModel.js");

const Telefone = sequelize.define(
  "Telefone",
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
    numero_com_ddd: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
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

module.exports = Telefone;
