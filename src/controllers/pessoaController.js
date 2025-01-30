const pessoaService = require("../services/pessoaService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { nome, data_nascimento } = req.body;

    try {
      const pessoa = await pessoaService.criar({ nome, data_nascimento });
      success(res, "", pessoa);
    } catch (err) {
      error(res, "Erro ao criar a pessoa: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;

    try {
      const pessoa = await pessoaService.pegar(id);
      success(res, "", pessoa);
    } catch (err) {
      error(res, "Erro ao pegar a pessoa: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, nome, data_nascimento } = req.body;

    try {
      const pessoa = await pessoaService.atualizar({
        id,
        nome,
        data_nascimento,
      });
      success(res, "", pessoa);
    } catch (err) {
      error(res, "Erro ao atualizar a pessoa: " + err.message);
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      await pessoaService.deletar({ id });
      success(res, "Pessoa deletada com sucesso", {});
    } catch (err) {
      error(res, "Erro ao deletar a pessoa: " + err.message);
    }
  },

  async listar(req, res) {
    const { id, nome } = req.query;
    try {
      const pessoas = await pessoaService.listar(id, nome);
      success(res, "", pessoas);
    } catch (err) {
      error(res, "Erro ao listar as pessoas: " + err.message);
    }
  },

  async listarComFiltro(req, res) {
    const { id, nome } = req.query;

    try {
      const pessoas = await pessoaService.listarComFiltro({ id, nome });
      success(res, "", pessoas);
    } catch (err) {
      error(res, "Erro ao listar as pessoas: " + err.message);
    }
  },
};
