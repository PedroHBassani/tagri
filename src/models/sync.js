const sequelize = require("../config/database.js");

const sendMessage = (message) => {
  console.log("================================================")
  console.log(message);
  console.log("================================================")
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const models = [
  "./pessoaModel.js",
  "./entidadeModel.js",
  "./usuarioModel.js",
  "./agenciaModel.js",
  "./bancoModel.js",
  "./clienteFornecedorModel.js",
  "./centroCustoModel.js",
  "./contaBancariaModel.js",
  "./contaModel.js",
  "./emailModel.js",
  "./estadoModel.js",
  "./moedaModel.js",
  "./estoqueModel.js",
  "./tipoModel.js",
  "./produtoModel.js",
  "./duplicataModel.js",
  "./duplicataDetalheModel.js",
  "./duplicataParcelaModel.js",
  "./estoqueProdutoModel.js",
  "./fazendaModel.js",
  "./fornecedorModel.js",
  "./municipioModel.js",
  "./pessoaFisicaModel.js",
  "./pessoaJuridicaModel.js",
  "./produtoValorModel.js",
  "./safraModel.js",
  "./safraUsoProdutoModel.js",
  "./telefoneModel.js",
  "./usuarioConfiguracaoModel.js",
  "./usuarioEntidadeModel.js",
  "./duplicataParcelaHistModel.js",
];

const getForeignKeys = async (tableName) => {
  const foreignKeys = await sequelize.query(`
    SELECT CONSTRAINT_NAME 
    FROM information_schema.KEY_COLUMN_USAGE 
    WHERE TABLE_NAME = '${tableName}' 
      AND TABLE_SCHEMA = 'tagri' 
      AND REFERENCED_TABLE_NAME IS NOT NULL;
  `);
  return foreignKeys[0];
};

const removeForeignKey = async (tableName, constraintName) => {
  await sequelize.query(
    `ALTER TABLE ${tableName} DROP FOREIGN KEY ${constraintName};`
  );
};

const dropTableIfExists = async (tableName) => {
  await sequelize.query(`DROP TABLE IF EXISTS ${tableName};`);
};

const importAndSyncModels = async () => {
  const importedModels = [];

  for (const m of models) {
    const model = require(m);
    importedModels.push(model);
  }


  await sequelize.sync({ force: true, models: importedModels });
};

const init = async () => {
  try {
  
    await sleep(500);
    sendMessage("Removendo chaves estrangeiras.");

  
    const foreignKeys = await getForeignKeys("entidades");
    for (const fk of foreignKeys) {
      if (fk.CONSTRAINT_NAME !== "PRIMARY") {
        await removeForeignKey("entidades", fk.CONSTRAINT_NAME);
      }
    }

    sendMessage("Chaves estrangeiras removidas com sucesso!");
    await sleep(500);

  
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    sendMessage("Iniciando a deleção de tabelas!");
    await sleep(500);

  
    const tables = await sequelize.query(`
      SELECT TABLE_NAME
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = 'tagri';
    `);
    const tabelas = tables[0].map((t) => t.TABLE_NAME);

  
    for (const m of models) {
      const model = require(m);
      if (tabelas.includes(model.tableName)) {
        await dropTableIfExists(model.tableName);
      }
    }

    sendMessage("Tabelas deletadas com sucesso!");
    await sleep(500);

  
    await importAndSyncModels();

    sendMessage("Modelos sincronizados com sucesso!");
    await sleep(500);

  
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");

    sendMessage("Sincronização concluída!");

  
    await sleep(500);
    adicionarDados();
  } catch (error) {
    console.error("Erro ao sincronizar tabelas:", error);
  }
};

const sqls = [
  ...require("../config/sql/inicial.js"),
  ...require("../config/sql/municipios.js"),
  ...require("../config/sql/produtos.js"),
  ...require("../config/sql/dadosTestes.js"),
];

const formatarSql = (sql) => sql.replace(/\n/g, " ").replace(/\s+/g, " ");

const adicionarDados = async () => {
  const transaction = await sequelize.transaction();
  try {
    sendMessage("Inserindo dados...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    var percent = 100 / sqls.length;
    for (var i in sqls) {
      const sql = sqls[i];
      console.log(
        `${(percent * i + percent).toFixed(2)}% - Inserindo valores.`
      );
      await sequelize.query(formatarSql(sql), { transaction });
      await sleep(400);
    }
    await transaction.commit();
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
    sendMessage("SQL executado com sucesso!");
  } catch (error) {
    await transaction.rollback();
    console.error("Erro ao executar SQL:", error);
  } finally {
    process.exit(0);
  }
};

init();