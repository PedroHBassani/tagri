const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Produto = require("./produtoModel.js");
const Usuario = require("./usuarioModel.js");
const ClienteFornecedor = require("./clienteFornecedorModel.js");

const ProdutoValor = sequelize.define(
  "ProdutoValor",
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
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produto,
        key: "id",
      },
    },
    cliente_fornecedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ClienteFornecedor,
        key: "id",
      },
    },
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "produto_valores",
    timestamps: false,
  }
);

module.exports = ProdutoValor;
