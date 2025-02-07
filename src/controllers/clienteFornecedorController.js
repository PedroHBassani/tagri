const { success, error } = require("../utils/response.js");

const pessoaFisicaService = require("../services/pessoaFisicaService.js");
const pessoaJuridicaService = require("../services/pessoaJuridicaService.js");
const clienteFornecedorService = require("../services/clienteFornecedorService.js");

module.exports = {
  async criar(req, res) {
    const {
      inscricao_estadual,
      inscricao_municipal,
      pessoa_fisica,
      pessoa_juridica,
    } = req.body;

    try {
      const [, , cF] = await Promise.all([
        await pessoaFisicaService.criar({
          pessoa_id: req.user.pessoa_id,
          sobrenome: pessoa_fisica.sobrenome,
          cpf: pessoa_fisica.cpf,
        }),
        await pessoaJuridicaService.criar({
          pessoa_id: req.user.pessoa_id,
          razao_social: pessoa_juridica.razao_social,
          cnpj: pessoa_juridica.cnpj,
        }),
        await clienteFornecedorService.criar({
          pessoa_id: req.user.pessoa_id,
          inscricao_estadual,
          inscricao_municipal,
        }),
      ]);
      success(res, "", cF);
    } catch (err) {
      error(res, "Erro ao criar o cliente fornecedor: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;
    try {
      const cliente = await clienteFornecedorService.pegar(id);
      success(res, "", cliente);
    } catch (error) {
      error(res, "Erro ao criar o cliente fornecedor: " + err.message);
    }
  },
};
