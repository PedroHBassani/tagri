const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Duplicata = require("./duplicataModel.js");

const DuplicataParcela = sequelize.define(
  "DuplicataParcela",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duplicata_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Duplicata,
        key: "id",
      },
    },
    data_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numero_parcela: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor_cobrado: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_pago: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_multa: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_juros: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_desconto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_aberto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
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
    tableName: "duplicatas_parcelas",
    timestamps: false,
  }
);

module.exports = DuplicataParcela;
