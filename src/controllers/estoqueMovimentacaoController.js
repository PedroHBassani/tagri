const estoqueProdutoService = require("../services/estoqueProdutoService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { estoque_id, produto_id, quantidade, data, sinal } = req.body;
    try {
      const estoque = await estoqueProdutoService.criar({
        estoque_id,
        produto_id,
        quantidade,
        data,
        sinal,
      });
      success(res, "", estoque);
    } catch (err) {
      error(res, "Erro ao criar o estoque movimento: " + err.message);
    }
  },
  async pegar(req, res) {
    const { id } = req.params;
    try {
      const estoque = await estoqueProdutoService.pegar(id);
      success(res, "", estoque);
    } catch (err) {
      error(res, "Erro ao pegar o estoque movimento: " + err.message);
    }
  },
  async atualizar(req, res) {
    const { id, estoque_id, produto_id, quantidade, data, sinal } = req.body;
    try {
      const estoque = await estoqueProdutoService.atualizar({
        id,
        estoque_id,
        produto_id,
        quantidade,
        data,
        sinal,
      });
      success(res, "", estoque);
    } catch (err) {
      error(res, "Erro ao atualizar o estoque movimento: " + err.message);
    }
  },
  async deletar(req, res) {
    const { id } = req.params;
    try {
      await estoqueProdutoService.deletar(id);
      success(res, "Estoque movimento deletado com sucesso");
    } catch (err) {
      error(res, "Erro ao deletar o estoque movimento: " + err.message);
    }
  },
};
