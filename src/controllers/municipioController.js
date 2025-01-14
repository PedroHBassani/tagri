const municipioService = require("../services/municipioService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { estado_id, nome } = req.body;

    try {
      const municipio = await municipioService.criar({ estado_id, nome });
      success(res, "", municipio);
    } catch (err) {
      error(res, "Erro ao criar o municipio: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;

    try {
      const municipio = await municipioService.pegar(id);
      success(res, "", municipio);
    } catch (err) {
      error(res, "Erro ao pegar o municipio: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, estado_id, nome } = req.body;

    try {
      const municipio = await municipioService.atualizar({ id, estado_id, nome });
      success(res, "", municipio);
    } catch (err) {
      error(res, "Erro ao atualizar o municipio: " + err.message);
    }
  },

  async listarFe(req, res) {
    const { page, per_page, filtro_estado_nome, filtro_nome } = req.query;

    try {
      const municipios = await municipioService.listarFe(page, per_page, filtro_estado_nome, filtro_nome);
      success(res, "", municipios);
    } catch (err) {
      error(res, "Erro ao listar os municipios: " + err.message);
    }
  }
};
