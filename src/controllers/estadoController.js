const estadoService = require("../services/estadoService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { nome, sigla } = req.body;

    try {
      const estado = await estadoService.criar({ nome, sigla });
      success(res, "", estado);
    } catch (err) {
      error(res, "Erro ao criar o estado: " + err.message);
    }
  },
  async pegar(req, res) {
    const { id } = req.params;

    try {
      const estado = await estadoService.pegar(id);
      success(res, "", estado);
    } catch (err) {
      error(res, "Erro ao pegar o estado: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, nome, sigla } = req.body;

    try {
      const estado = await estadoService.atualizar({ id, nome, sigla });
      success(res, "", estado);
    } catch (err) {
      error(res, "Erro ao atualizar o estado: " + err.message);
    }
  },

  async listar(req, res) {
    try {
      const estados = await estadoService.listar();
      success(res, "", estados);
    } catch (err) {
      error(res, "Erro ao listar os estados: " + err.message);
    }
  }
};
