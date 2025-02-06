const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Safra = require("./safraModel.js");

const SafraUsoProduto = sequelize.define(
  "SafraUsoProduto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    safra_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Safra,
        key: "id",
      },
    },
    pratica_agricola_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lancamento_baixa_estoque_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    tableName: "safra_uso_produtos",
    timestamps: false,
  }
);

module.exports = SafraUsoProduto;
