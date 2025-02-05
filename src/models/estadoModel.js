const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Estado = sequelize.define(
  "Estado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sigla: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
  },
  {
    tableName: "estados",
    timestamps: false,
  }
);

Estado.sync()
  .then(() => {
    console.log('Tabela "estados" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Estado;
