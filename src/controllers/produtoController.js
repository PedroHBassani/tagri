const produtoService = require("../services/produtoService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { tipo_id, unidade_medida_id, nome, descricao } = req.body;

    try {
      const produto = await produtoService.criar({
        tipo_id,
        unidade_medida_id,
        nome,
        descricao,
      });
      success(res, "", produto);
    } catch (err) {
      error(res, "Erro ao criar a produto: " + err.message);
    }
  },
  async pegar(req, res) {
    const { id } = req.params;

    try {
      const produto = await produtoService.pegar(id);
      success(res, "", produto);
    } catch (err) {
      error(res, "Erro ao pegar a produto: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, tipo_id, unidade_medida_id, nome, descricao } = req.body;

    try {
      const produto = await produtoService.atualizar({
        id,
        tipo_id,
        unidade_medida_id,
        nome,
        descricao,
      });
      success(res, "", produto);
    } catch (err) {
      error(res, "Erro ao atualizar a produto: " + err.message);
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      await produtoService.deletar(id);
      success(res, "Produto deletada com sucesso");
    } catch (err) {
      error(res, "Erro ao deletar a produto: " + err.message);
    }
  },

  async listar(req, res) {
    try {
      const produtos = await produtoService.listar();
      success(res, "", produtos);
    } catch (err) {
      error(res, "Erro ao listar as produtos: " + err.message);
    }
  },

  async paginate(req, res) {
    const { tipo_id, nome, state, pagination } = req.body;

    try {
      const produtos = await produtoService.paginate(
        tipo_id,
        nome,
        state,
        pagination
      );
      success(res, "", produtos);
    } catch (err) {
      error(res, "Erro ao paginar as produtos: " + err.message);
    }
  },

  async listar_tipos(req, res) {
    try {
      const tipos = await produtoService.listar_tipos();
      success(res, "", tipos);
    } catch (err) {
      error(res, "Erro ao listar os tipos: " + err.message);
    }
  },

  async listar_para_plantar(req, res) {
    const { id, nome } = req.params;
    try {
      const produtos = await produtoService.listar_para_plantar(id, nome);
      success(res, "", produtos);
    } catch (err) {
      error(res, "Erro ao listar os produtos para plantar: " + err.message);
    }
  },
};
