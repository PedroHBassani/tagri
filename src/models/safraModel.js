const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const {
  ReferenceType,
  IntegerType,
  DecimalType,
  DateType,
  OptionalDecimalType,
} = require("../utils/modelTypes.js");
const Entidade = require("./entidadeModel.js");
const Fazenda = require("./fazendaModel.js");

const Safra = sequelize.define(
  "Safra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entidade_id: ReferenceType(Entidade),
    periodo_agricola_id: IntegerType,
    sistema_manejo_id: IntegerType,
    fazenda_id: ReferenceType(Fazenda),
    centro_custo_id: ReferenceType(CentroCusto),
    produto_plantado_id: IntegerType,
    talhao: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    area_ha: DecimalType,
    data_plantio: DateType,
    data_colheita: DateType,
    peso_colhido: OptionalDecimalType,
  },
  {
    tableName: "safra",
    timestamps: false,
  }
);

Safra.sync()
  .then(() => {
    console.log('Tabela "safra" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Safra;
