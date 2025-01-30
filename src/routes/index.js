const authMiddleware = require("../middlewares/authMiddleware.js");
const { success, error } = require("../utils/response.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    return success(res, "Agro finance API");
  });

  // Apply authMiddleware to all routes except the open routes
  app.use(authMiddleware);

  app.use("/usuario", require("./usuarioRouter.js"));
  app.use("/agencia", require("./agenciaRouter.js"));
  app.use("/banco", require("./bancoRouter.js"));
  app.use("/conta", require("./contaRouter.js"));
  app.use("/estado", require("./estadoRouter.js"));
  app.use("/fazenda", require("./fazendaRouter.js"));
  app.use("/municipio", require("./municipioRouter.js"));
  app.use("/pessoas", require("./pessoaRouter.js"));
  app.use("/estoque", require("./estoqueRouter.js"));

  app.use((req, res) => {
    return error(res, "Rota não encontrada", 404);
  });
};

module.exports = routes;
