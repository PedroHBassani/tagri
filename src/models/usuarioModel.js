const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pessoa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        // references: {
        //   model: Pessoa,
        //   key: "id",
        // },
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ultimo_acesso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ultima_mudanca_senha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    criado_em: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletado_em: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);

Usuario.sync()
  .then(() => {
    console.log('Tabela "usuarios" sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
  });

module.exports = Usuario;
