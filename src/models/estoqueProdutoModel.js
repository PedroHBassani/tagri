const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const DuplicataDetalhe = require("./duplicataDetalheModel.js");
const Produto = require("./produtoModel.js");
const Estoque = require("./estoqueModel.js");

const EstoqueProduto = sequelize.define(
  "EstoqueProduto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duplicada_detalhe_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: DuplicataDetalhe,
        key: "id",
      },
    },
    estoque_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Estoque,
        key: "id",
      },
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produto,
        key: "id",
      },
    },
    quantidade: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sinal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lancamento_manual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    criado_as: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "estoque_produtos",
    timestamps: false,
  }
);

module.exports = EstoqueProduto;
