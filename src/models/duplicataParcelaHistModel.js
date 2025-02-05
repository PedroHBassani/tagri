const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const {
  ReferenceType,
  DateType,
  DecimalType,
} = require("../utils/modelTypes.js");
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
    duplicata_parcela_id: ReferenceType(DuplicataParcela),
    usuario_id: ReferenceType(Usuario),
    valor: DecimalType,
    valor_multa: DecimalType,
    valor_juros: DecimalType,
    valor_desconto: DecimalType,
    tipo_lancamento: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    detalhes: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    data_movimento: DateType,
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

DuplicataParcelaHist.sync()
  .then(() => {
    console.log('Tabela "duplicata_parcela_hist" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = DuplicataParcelaHist;
