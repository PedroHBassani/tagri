const { success, error } = require("../utils/response.js");
const produtoValorService = require("../services/produtoValorService.js");

module.exports = {
  async criar(req, res) {
    const { produto_id, cliente_fornecedor_id, valor, data } = req.body;
    try {
      const produtoValor = await produtoValorService.criar({
        usuario_id: req.user.id,
        produto_id,
        cliente_fornecedor_id,
        valor,
        data,
      });
      success(res, "", produtoValor);
    } catch (err) {
      error(res, "Erro ao criar o produto valor: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;
    try {
      const produto = await produtoValorService.pegar(id);
      success(res, "", produto);
    } catch (err) {
      error(res, "Erro ao pegar o produto valor: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, produto_id, cliente_fornecedor_id, valor, data } = req.body;
    try {
      const produtoValor = await produtoValorService.atualizar({
        id,
        usuario_id: req.user.id,
        produto_id,
        cliente_fornecedor_id,
        valor,
        data,
      });
      success(res, "", produtoValor);
    } catch (err) {
      error(res, "Erro ao atualizar o produto valor: " + err.message);
    }
  },

  async deletar(req, res) {
    const { id } = req.param;
    try {
      await produtoValorService.deletar(id);
      success(res, "Registro deletado com sucesso!");
    } catch (err) {
      error(res, "Erro ao deletar o produto valor: " + err.message);
    }
  },

  async listar(req, res) {
    try {
      const produtos = await produtoValorService.listar();
      success(res, "", produtos);
    } catch (err) {
      error(res, "Erro ao listar os produto valor: " + err.message);
    }
  },
};
