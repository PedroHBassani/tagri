const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const DuplicataParcela = require("./duplicataParcelaModel.js");
const Usuario = require("./usuarioModel.js");

const DuplicataParcelaHist = sequelize.define(
  "DuplicataParcelaHist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duplicata_parcela_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DuplicataParcela,
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
    valor: {
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
    tipo_lancamento: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    detalhes: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    data_movimento: {
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
    tableName: "duplicata_parcela_hist",
    timestamps: false,
  }
);

module.exports = DuplicataParcelaHist;
