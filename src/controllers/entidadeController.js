const entidadeService = require("../services/entidadeService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { pessoa_id } = req.body;
    try {
      const entidade = await entidadeService.criar({ pessoa_id });
      success(res, "", entidade);
    } catch (err) {
      error(res, "Erro ao criar a entidade: " + err.message);
    }
  },
  async atualizar(req, res) {
    const { id, pessoa_id } = req.body;
    try {
      const entidade = await entidadeService.atualizar({ id, pessoa_id });
      success(res, "", entidade);
    } catch (err) {
      error(res, "Erro ao atualizar a entidade: " + err.message);
    }
  },
  async pegar(req, res) {
    const { id } = req.params;
    try {
      const entidade = await entidadeService.pegar(id);
      success(res, "", entidade);
    } catch (err) {
      error(res, "Erro ao pegar a entidade: " + err.message);
    }
  },
  async listar(req, res) {
    try {
      const entidades = await entidadeService.listar();
      success(res, "", entidades);
    } catch (err) {
      error(res, "Erro ao listar as entidades: " + err.message);
    }
  },
  async deletar(req, res) {
    const { id } = req.params;
    try {
      await entidadeService.deletar(id);
      success(res, "Entidade deletada com sucesso");
    } catch (err) {
      error(res, "Erro ao deletar a entidade: " + err.message);
    }
  },
};
