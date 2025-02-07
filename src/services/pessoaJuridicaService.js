const PessoaJuridica = require("../models/pessoaJuridicaModel.js");
const { validarCNPJ, apenasNumeros } = require("../utils/functions.js");

module.exports = {
  async criar({ pessoa_id, razao_social, cnpj }) {
    if (!validarCNPJ(cnpj)) {
      throw new Error("O CNPJ informado não é valido.");
    }
    const pessoa = await PessoaJuridica.create({
      pessoa_id,
      razao_social,
      cnpj: apenasNumeros(cnpj),
    });
    return pessoa;
  },

  async pegar(id) {
    const pessoa = await PessoaJuridica.findByPk(id);
    return pessoa;
  },

  async pegar_pelo_pessoa_id(id) {
    const query = {
      where: {
        pessoa_id: id,
      },
    };

    const pessoa = await PessoaJuridica.findOne(query);
    return pessoa;
  },

  async atualizar({ id, pessoa_id, razao_social, cnpj }) {
    const pessoa = await this.pegar(id);
    if (!pessoa) {
      throw new Error("Pessoa não encontrada.");
    }
    if (!validarCNPJ(cnpj)) {
      throw new Error("O CNPJ informado não é valido.");
    }
    pessoa.pessoa_id = pessoa_id;
    pessoa.razao_social = razao_social;
    pessoa.cnpj = apenasNumeros(cnpj);
    await pessoa.save();
    return pessoa;
  },

  async deletar(id) {
    const pessoa = await PessoaJuridica.findByPk(id);
    await pessoa.destroy();
  },

  async listar() {
    const pessoas = await PessoaJuridica.findAll();
    return pessoas;
  },

  async pegar_pelo_cnpj(cnpj) {
    cnpj = apenasNumeros(cnpj);
    const query = {
      where: {
        cnpj,
      },
    };
    const pessoa = await PessoaJuridica.findOne(query);
    return pessoa;
  },
};
