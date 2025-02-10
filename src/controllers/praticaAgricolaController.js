const tipoService = require("../services/tipoService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async listar(req, res) {
    try {
      const tipos = await tipoService.listar({
        tipo: "PRATICAS_AGRICOLAS",
      });
      success(res, "", tipos);
    } catch (err) {
      error(res, "Erro ao listar praticas agricolas: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;
    try {
      const tipo = await tipoService.pegar(id);
      success(res, "", tipo);
    } catch (err) {
      error(res, "Erro ao pegar pratica agricola: " + err.message);
    }
  },
};
