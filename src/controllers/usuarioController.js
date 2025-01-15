const usuarioService = require("../services/usuarioService.js");
const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const { nome, login, senha } = req.body;

    try {
      const usuario = await usuarioService.criar({ nome, login, senha });
      success(res, "", usuario);
    } catch (err) {
      error(res, "Erro ao criar o usuario: " + err.message);
    }
  },

  async autenticar(req, res) {
    const { login, senha } = req.body;

    try {
      const usuario = await usuarioService.autenticar({ login, senha });
      success(res, "", usuario);
    } catch (err) {
      error(res, "Erro ao autenticar o usuario: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;
    
    try {
      const usuario = await usuarioService.pegar(id);
      success(res, "", usuario);
    } catch (err) {
      error(res, "Erro ao pegar o usuario: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, nome, login, senha } = req.body;

    try {
      const usuario = await usuarioService.atualizar({ id, nome, login, senha });
      success(res, "", usuario);
    } catch (err) {
      error(res, "Erro ao atualizar o usuario: " + err.message);
    }
  }
};
