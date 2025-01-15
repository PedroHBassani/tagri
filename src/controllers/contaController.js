const contaService = require("../services/contaService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { entidade_id, nome } = req.body;

    try {
      const conta = await contaService.criar({ entidade_id, nome });
      success(res, "", conta);
    } catch (err) {
      error(res, "Erro ao criar a conta: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, entidade_id, nome } = req.body;

    try {
      const conta = await contaService.atualizar({ id, entidade_id, nome });
      success(res, "", conta);
    } catch (err) {
      error(res, "Erro ao atualizar a conta: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;

    try {
      const conta = await contaService.pegar(id);
      success(res, "", conta);
    } catch (err) {
      error(res, "Erro ao pegar a conta: " + err.message);
    }
  },

  async listar_da_entidade(req, res) {
    const { entidade_id } = req.params;

    try {
      const contas = await contaService.listar_da_entidade(entidade_id);
      success(res, "", contas);
    } catch (err) {
      error(res, "Erro ao listar as contas: " + err.message);
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      await contaService.deletar(id);
      success(res, "Conta deletada com sucesso");
    } catch (err) {
      error(res, "Erro ao deletar a conta: " + err.message);
    }
  },
};
