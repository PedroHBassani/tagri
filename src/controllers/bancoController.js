const bancoService = require("../services/bancoService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { nome, codigo } = req.body;

    try {
      const banco = await bancoService.criar({ nome, codigo });
      success(res, "", banco);
    } catch (err) {
      error(res, "Erro ao criar o banco: " + err.message);
    }
  },
  async atualizar(req, res) {
    const { id, nome, codigo } = req.body;

    try {
      const banco = await bancoService.atualizar({ id, nome, codigo });
      success(res, "", banco);
    } catch (err) {
      error(res, "Erro ao atualizar o banco: " + err.message);
    }
  },
  async listar(req, res) {
    try {
      const bancos = await bancoService.listar();
      success(res, "", bancos);
    } catch (err) {
      error(res, "Erro ao listar os bancos: " + err.message);
    }
  },
  async pegar(req, res) {
    const { id } = req.params;

    try {
      const banco = await bancoService.pegar(id);
      success(res, "", banco);
    } catch (err) {
      error(res, "Erro ao buscar o banco: " + err.message);
    }
  },
};
