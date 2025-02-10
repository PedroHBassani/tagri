const { success, error } = require("../utils/response.js");
const pessoaFisicaService = require("../services/pessoaFisicaService.js");
const pessoaService = require("../services/pessoaService.js");

module.exports = {
  async criar(req, res) {
    const { nome, sobrenome, cpf } = req.body;

    try {
      const pessoa = await pessoaService.criar({ nome });
      const pessoa_fisica = await pessoaFisicaService.criar({
        pessoa_id: pessoa.id,
        sobrenome,
        cpf,
      });
      success(res, "", {
        id: pessoa_fisica.id,
        pessoa_id: pessoa.id,
        nome: pessoa.nome,
        sobrenome: pessoa_fisica.sobrenome,
        cpf: pessoa_fisica.cpf,
      });
    } catch (err) {
      error(res, "Erro ao criar o responsável fazenda: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { pessoa_id, nome, sobrenome, cpf } = req.body;

    try {
      const pessoa = await pessoaService.atualizar({
        id: pessoa_id,
        nome,
        cpf,
      });
      const pessoa_fisica = await pessoaFisicaService.pegar_pelo_pessoa_id(
        pessoa_id
      );
      const pessoa_fisica_atualizada = await pessoaFisicaService.atualizar({
        id: pessoa_fisica.id,
        pessoa_id,
        sobrenome,
        cpf,
      });
      success(res, "", {
        id: pessoa_fisica_atualizada.id,
        pessoa_id: pessoa.id,
        nome: pessoa.nome,
        sobrenome: pessoa_fisica_atualizada.sobrenome,
        cpf: pessoa_fisica_atualizada.cpf,
      });
    } catch (err) {
      error(res, "Erro ao atualizar o responsável fazenda: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await pessoaFisicaService.pegar(id);
      success(req, "", pessoa);
    } catch (err) {
      error(res, "Erro ao pegar o responsável fazenda: " + err.message);
    }
  },

  async listar(req, res) {
    try {
      const pessoas = await pessoaFisicaService.listar();
      success(req, "", pessoas);
    } catch (err) {
      error(res, "Erro ao listar os responsáveis fazenda: " + err.message);
    }
  },
};
