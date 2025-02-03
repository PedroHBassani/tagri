const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Produto = sequelize.define(
  "Produto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unidade_medida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
  },
  {
    tableName: "produtos",
    timestamps: false,
  }
);

Produto.sync()
  .then(() => {
    console.log('Tabela "produtos" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Produto;
