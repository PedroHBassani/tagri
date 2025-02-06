const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Estado = require("./estadoModel.js");

const Municipio = sequelize.define(
  "Municipio",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Estado,
        key: "id",
      },
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "municipios",
    timestamps: false,
  }
);

Municipio.belongsTo(Estado, { foreignKey: 'estado_id', as: 'estado' });

module.exports = Municipio;
