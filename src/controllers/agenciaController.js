const agenciaService = require("../services/agenciaService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { banco_id, codigo, digito } = req.body;

    try {
      const agencia = await agenciaService.criar({ banco_id, codigo, digito });
      success(res, "", agencia);
    } catch (err) {
      error(res, "Erro ao criar a agencia: " + err.message);
    }
  },
  async atualizar(req, res) {
    const { id, banco_id, codigo, digito } = req.body;

    try {
      const agencia = await agenciaService.atualizar({
        id,
        banco_id,
        codigo,
        digito,
      });
      success(res, "", agencia);
    } catch (err) {
      error(res, "Erro ao atualizar a agencia: " + err.message);
    }
  },
  async pegar(req, res) {
    const { id } = req.params;

    try {
      const agencia = await agenciaService.pegar(id);
      success(res, "", agencia);
    } catch (err) {
      error(res, "Erro ao pegar a agencia: " + err.message);
    }
  },
  async listar(req, res) {
    try {
      const agencias = await agenciaService.listar();
      success(res, "", agencias);
    } catch (err) {
      error(res, "Erro ao listar as agencias: " + err.message);
    }
  },
};
