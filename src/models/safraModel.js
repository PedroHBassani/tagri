const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Entidade = require("./entidadeModel.js");
const Fazenda = require("./fazendaModel.js");
const CentroCusto = require("./centroCustoModel.js");

const Safra = sequelize.define(
  "Safra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entidade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Entidade,
        key: "id",
      },
    },
    periodo_agricola_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sistema_manejo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fazenda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Fazenda,
        key: "id",
      },
    },
    centro_custo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CentroCusto,
        key: "id",
      },
    },
    produto_plantado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    talhao: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    area_ha: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    data_plantio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_colheita: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    peso_colhido: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    tableName: "safras",
    timestamps: false,
  }
);

module.exports = Safra;
