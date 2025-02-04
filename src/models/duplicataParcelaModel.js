const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const {
  ReferenceType,
  DateType,
  IntegerType,
  DecimalType,
} = require("../utils/modelTypes.js");
const Duplicata = require("./duplicataModel.js");

const DuplicataParcela = sequelize.define(
  "DuplicataParcela",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duplicata_id: ReferenceType(Duplicata),
    data_vencimento: DateType,
    numero_parcela: IntegerType,
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
    data_ultimo_pagamento: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    criado_as: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "duplicataParcelas",
    timestamps: true,
  }
);

DuplicataParcela.sync()
  .then(() => {
    console.log('Tabela "duplicataParcelas" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = DuplicataParcela;
