const tipoService = require("../services/tipoService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { tipo, nome, descricao, chave, ordem } = req.body;

    try {
      const tip = await tipoService.criar({
        tipo,
        nome,
        descricao,
        chave,
        ordem,
      });
      success(res, "", tip);
    } catch (err) {
      error(res, "Erro ao criar o tipo: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.body;

    try {
      const tipo = await tipoService.pegar(id);
      success(res, "", tipo);
    } catch (err) {
      error(res, "Erro ao pegar o tipo: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, tipo, nome, descricao, chave, ordem } = req.body;

    try {
      const tip = await tipoService.atualizar({
        id,
        tipo,
        nome,
        descricao,
        chave,
        ordem,
      });
      success(res, "", tip);
    } catch (err) {
      error(res, "Erro ao atualizar o tipo: " + err.message);
    }
  },

  async pegarPelaChaveOuTipo(req, res) {
    const { tipo, chave } = req.body;

    try {
      const tipos = await tipoService.pegarPelaChaveOuTipo(tipo, chave);
      success(res, "", tipos);
    } catch (err) {
      error(res, "Erro ao pegar o tipo: " + err.message);
    }
  },

  async inativar(req, res) {
    const { id } = req.body;

    try {
      await tipoService.inativar(id);
      success(res, "Tipo inativado com sucesso.");
    } catch (err) {
      error(res, "Erro ao inativar o tipo: " + err.message);
    }
  },

  async listar(req, res) {
    const { tipo } = req.body;

    try {
      const tipos = await tipoService.listar({ tipo });
      success(res, "", tipos);
    } catch (err) {
      error(res, "Erro ao listar os tipos: " + err.message);
    }
  },
};
