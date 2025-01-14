const { success, error } = require("../utils/response.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    return success(res, "Agro finance API");
  });

  app.use("/estado", require("./estadoRouter.js"));
  app.use("/fazenda", require("./fazendaRouter.js"));
  app.use("/municipio", require("./municipioRouter.js"));

  app.use((req, res) => {
    return error(res, "Rota não encontrada", 404);
  });
};

module.exports = routes;
