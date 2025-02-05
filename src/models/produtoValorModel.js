const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const {
  ReferenceType,
  OptionalReferenceType,
  DecimalType,
} = require("../utils/modelTypes.js");

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
    usuario_id: ReferenceType(Usuario),
    produto_id: ReferenceType(Produto),
    cliente_fornecedor: OptionalReferenceType(ClienteFornecedor),
    valor: DecimalType,
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "produto_valor",
    timestamps: false,
  }
);

ProdutoValor.sync()
  .then(() => {
    console.log('Tabela "produto_valor" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = ProdutoValor;
