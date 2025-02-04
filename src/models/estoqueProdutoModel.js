const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const {
  OptionalReferenceType,
  ReferenceType,
  DecimalType,
  IntegerType,
  BooleanType,
  CriadoAsType,
} = require("../utils/modelTypes.js");
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
    duplicada_detalhe_id: OptionalReferenceType(DuplicataDetalhe),
    estoque_id: ReferenceType(Estoque),
    produto_id: ReferenceType(Produto),
    quantidade: DecimalType,
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sinal: IntegerType,
    lancamento_manual: BooleanType,
    criado_as: CriadoAsType,
  },
  {
    tableName: "estoquesProdutos",
    timestamps: true,
  }
);

EstoqueProduto.sync()
  .then(() => {
    console.log('Tabela "estoquesProdutos" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = EstoqueProduto;
