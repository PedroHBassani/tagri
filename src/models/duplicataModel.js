const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const CentroCusto = require("./centroCustoModel.js");
const Entidade = require("./entidadeModel.js");
const Conta = require("./contaModel.js");
const Pessoa = require("./pessoaModel.js");
const {
  IntegerType,
  DecimalType,
  ReferenceType,
} = require("../utils/modelTypes.js");
const Usuario = require("./usuarioModel.js");

const Duplicata = sequelize.define(
  "Duplicata",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    centro_custo_id: ReferenceType(CentroCusto),
    entidade_id: ReferenceType(Entidade),
    conta_id: ReferenceType(Conta),
    moeda_id: {
      ...IntegerType,
      // TODO: Adicionar a referencia
    },
    pessoa_id: ReferenceType(Pessoa),
    usuario_id: ReferenceType(Usuario),
    numero_parcelas: IntegerType,
    numero_parcelas_abertas: IntegerType,
    valor_cobrado: DecimalType,
    valor_pago: DecimalType,
    valor_multa: DecimalType,
    valor_juros: DecimalType,
    valor_desconto: DecimalType,
    valor_aberto: DecimalType,
    status: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    sinal: IntegerType,
    data_lancamento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_ultimo_pagamento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    criado_as: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "duplicatas",
    timestamps: true,
  }
);

Duplicata.sync()
  .then(() => {
    console.log('Tabela "duplicatas" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Duplicata;
