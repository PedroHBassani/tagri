require("./usuarioEntidadeModel.js");
require("./duplicataParcelaHistModel.js");

require("./agenciaModel.js");
require("./bancoModel.js");
require("./centroCustoModel.js");
require("./clienteFornecedorModel.js");
require("./contaBancariaModel.js");
require("./contaModel.js");
require("./duplicataDetalheModel.js");
require("./duplicataModel.js");
require("./duplicataParcelaModel.js");
require("./emailModel.js");
require("./entidadeModel.js");
require("./estadoModel.js");
require("./estoqueModel.js");
require("./estoqueProdutoModel.js");
require("./fazendaModel.js");
require("./fornecedorModel.js");
require("./moedaModel.js");
require("./municipioModel.js");
require("./pessoaFisicaModel.js");
require("./pessoaJuridicaModel.js");
require("./pessoaModel.js");
require("./produtoModel.js");
require("./produtoValorModel.js");
require("./safraModel.js");
require("./safraUsoProdutoModel.js");
require("./sync.js");
require("./telefoneModel.js");
require("./tipoModel.js");
require("./usuarioConfiguracaoModel.js");
require("./usuarioModel.js");

const sequelize = require("../config/database.js");
var sqls = [];

const inicial = require("../config/sql/inicial.js");
const municipios = require("../config/sql/municipios.js");

sqls = sqls.concat(inicial);
sqls = sqls.concat(municipios);

const formatarSql = (sql) => {
  return sql.replace(/\n/g, " ").replace(/\s+/g, " ");
};

sequelize.sync({ force: true });

(async () => {
  try {
    await Promise.all([
      sqls.forEach(async (sql) => {
        await sequelize.query(formatarSql(sql));
      }),
    ]);
    console.log("SQL executado com sucesso!");
  } catch (error) {
    console.error("Erro ao executar SQL:", error);
  }
})();

// forçar o sequelize sincronicar
