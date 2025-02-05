const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Entidade = require("./entidadeModel.js");

const CentroCusto = sequelize.define(
  "CentroCusto",
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
    centro_custo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    tableName: "centro_custo",
    timestamps: false,
  }
);

CentroCusto.sync()
  .then(() => {
    console.log('Tabela "centro_custo" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = CentroCusto;
