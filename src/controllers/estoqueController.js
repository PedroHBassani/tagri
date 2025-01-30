const estoqueService = require("../services/estoqueService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { nome, entidade_id } = req.body;
    try {
      const estoque = await estoqueService.criar({ nome, entidade_id });
      success(res, "", estoque);
    } catch (err) {
      error(res, "Erro ao criar o estoque: " + err.message);
    }
  },
  async pegar(req, res) {
    const { id } = req.params;
    try {
      const estoque = await estoqueService.pegar(id);
      success(res, "", estoque);
    } catch (err) {
      error(res, "Erro ao pegar o estoque: " + err.message);
    }
  },
  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, entidade_id } = req.body;
    try {
      const estoque = await estoqueService.atualizar({ id, nome, entidade_id });
      success(res, "", estoque);
    } catch (err) {
      error(res, "Erro ao atualizar o estoque: " + err.message);
    }
  },
  async deletar(req, res) {
    const { id } = req.params;
    try {
      await estoqueService.deletar(id);
      success(res, "Estoque deletado com sucesso");
    } catch (err) {
      error(res, "Erro ao deletar o estoque: " + err.message);
    }
  },
  async listarPelaEntidade(req, res) {
    const { entidade_id } = req.params;
    try {
      const estoques = await estoqueService.listarPelaEntidade(entidade_id);
      success(res, "", estoques);
    } catch (err) {
      error(res, "Erro ao listar os estoques: " + err.message);
    }
  },
};
