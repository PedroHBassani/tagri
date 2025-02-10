const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const CentroCusto = require("./centroCustoModel.js");
const Entidade = require("./entidadeModel.js");
const Conta = require("./contaModel.js");
const Pessoa = require("./pessoaModel.js");
const Usuario = require("./usuarioModel.js");
const Moeda = require("./moedaModel.js");

const Duplicata = sequelize.define(
  "Duplicata",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    centro_custo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CentroCusto,
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
    conta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Conta,
        key: "id",
      },
    },
    moeda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Moeda,
        key: "id",
      },
    },
    pessoa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pessoa,
        key: "id",
      },
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    numero_parcelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numero_parcelas_abertas: {
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
    sinal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_lancamento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_ultimo_pagamento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    criado_as: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "duplicatas",
    timestamps: false,
  }
);

module.exports = Duplicata;
