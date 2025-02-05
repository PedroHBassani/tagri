const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const { ReferenceType, OptionalString } = require("../utils/modelTypes.js");
const Safra = require("./safraModel.js");

const SafraUsoProduto = sequelize.define(
  "SafraUsoProduto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    safra_id: ReferenceType(Safra),
    pratica_agricola_id: DataTypes.INTEGER,
    lancamento_baixa_estoque_id: DataTypes.INTEGER,
    descricao: OptionalString,
  },
  {
    tableName: "safra_uso_produto",
    timestamps: false,
  }
);

SafraUsoProduto.sync()
  .then(() => {
    console.log('Tabela "safra_uso_produto" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = SafraUsoProduto;
