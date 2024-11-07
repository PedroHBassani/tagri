const fazendaService = require("../services/fazendaService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { responsavel_id, nome } = req.body;

    try {
      const fazenda = await fazendaService.criar({ responsavel_id, nome });
      success(res, "", fazenda);
    } catch (err) {
      error(res, "Erro ao criar a fazenda: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, responsavel_id, nome } = req.body;

    try {
      const fazenda = await fazendaService.atualizar({
        id,
        responsavel_id,
        nome,
      });
      success(res, "", fazenda);
    } catch (err) {
      error(res, "Erro ao atualizar a fazenda: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;

    try {
      const fazenda = await fazendaService.pegar(id);
      success(res, "", fazenda);
    } catch (err) {
      error(res, "Erro ao buscar a fazenda: " + err.message);
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      await fazendaService.deletar(id);
      success(res, "Fazenda deletada com sucesso!");
    } catch (err) {
      error(res, "Erro ao deletar a fazenda: " + err.message);
    }
  },

  async listar(req, res) {
    try {
      const fazendas = await fazendaService.listar();
      success(res, "", fazendas);
    } catch (error) {
      error(res, "Erro ao listar as fazendas: " + error.message);
    }
  },
};
