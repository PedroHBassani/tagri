const sequelize = require("../config/database.js");

const Fazenda = sequelize.define(
  "Fazenda",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    responsavel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "fazendas",
    timestamps: true,
  }
);

Fazenda.sync()
  .then(() => {
    console.log('Tabela "fazendas" criada ou sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Fazenda;
