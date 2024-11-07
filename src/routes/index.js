const { success, error } = require("../utils/response.js");

const routes = (app) => {
  app.route("/").get((req, res) => {
    return success(res, "Agro finance API");
  });

  app.get("/users", (req, res) => {
    return error(res, "Rota de teste de users", 404);
  });

  app.use((req, res) => {
    return error(res, "Rota não encontrada", 404);
  });
};

module.exports = routes;
