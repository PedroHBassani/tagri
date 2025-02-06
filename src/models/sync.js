const sequelize = require("../config/database.js");
const readline = require("readline");
const colors = require("colors");

var passo = 1;

const sendMessage = (message, type = "info") => {
  const color =
    type === "success" ? "green" : type === "error" ? "red" : "yellow";
  console.log(colors.zebra(passo.toString()) + " " + colors[color](message));
  passo++;
};

const updateProgress = (message, percent) => {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(colors.yellow(`${message} ${percent.toFixed(2)}%`));
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

const formatarSql = (sql) => sql.replace(/\n/g, " ").replace(/\s+/g, " ");

const init = async () => {
  try {
    sendMessage("Iniciando processo de sincronização...");

    await sleep(500);
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    sendMessage("Removendo chaves estrangeiras...");
    const foreignKeys = await getForeignKeys("entidades");
    for (const fk of foreignKeys) {
      if (fk.CONSTRAINT_NAME !== "PRIMARY") {
        await removeForeignKey("entidades", fk.CONSTRAINT_NAME);
      }
    }

    await sleep(500);
    sendMessage("Remoção de chaves estrangeiras concluída.", "success");

    await sleep(500);
    sendMessage("Iniciando a deleção de tabelas...");
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

    await sleep(500);
    sendMessage("Tabelas deletadas com sucesso!", "success");

    await importAndSyncModels();
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");

    sendMessage("Modelos sincronizados com sucesso!", "success");

    await sleep(500);
    sendMessage("Inserindo dados...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    let percent = 100 / sqls.length;
    const transaction = await sequelize.transaction();
    for (let i = 0; i < sqls.length; i++) {
      const sql = sqls[i];
      updateProgress("Inserindo valores...", percent * (i + 1));
      await sequelize.query(formatarSql(sql), { transaction });
      await sleep(400);
    }
    console.log();
    await transaction.commit();
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
    sendMessage("Dados inseridos com sucesso!", "success");

    sendMessage(
      "Sincronização e inserção de dados concluída com sucesso!",
      "success"
    );
  } catch (error) {
    sendMessage(`Erro ao sincronizar tabelas: ${error.message}`, "error");
  } finally {
    process.exit();
  }
};

const sqls = [
  ...require("../config/sql/inicial.js"),
  ...require("../config/sql/municipios.js"),
  ...require("../config/sql/produtos.js"),
  ...require("../config/sql/dadosTestes.js"),
];

init();
