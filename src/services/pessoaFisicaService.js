const PessoaFisica = require("../models/pessoaFisicaModel.js");
const { validarCPF, apenasNumeros } = require("../utils/functions");

module.exports = {
  async criar({ pessoa_id, sobrenome, cpf }) {
    if (!validarCPF(cpf)) {
      throw new Error("O CPF informado não é valido.");
    }
    const pessoa = await PessoaFisica.create({
      pessoa_id,
      sobrenome,
      cpf: apenasNumeros(cpf),
    });
    return pessoa;
  },

  async pegar(id) {
    const pessoa = await PessoaFisica.findByPk(id);
    return pessoa;
  },

  async pegar_pelo_pessoa_id(id) {
    const query = {
      where: {
        pessoa_id: id,
      },
    };

    const pessoa = await PessoaFisica.findOne(query);
    return pessoa;
  },

  async atualizar({ id, pessoa_id, sobrenome, cpf }) {
    const pessoa = await this.pegar(id);
    if (!pessoa) {
      throw new Error("Pessoa não encontrada.");
    }
    if (!validarCPF(cpf)) {
      throw new Error("O CPF informado não é valido.");
    }
    pessoa.pessoa_id = pessoa_id;
    pessoa.sobrenome = sobrenome;
    pessoa.cpf = apenasNumeros(cpf);
    await pessoa.save();
    return pessoa;
  },

  async deletar(id) {
    const pessoa = await PessoaFisica.findByPk(id);
    await pessoa.destroy();
  },

  async listar() {
    const pessoas = await PessoaFisica.findAll();
    return pessoas;
  },

  async pegar_pelo_cpf(cpf) {
    cpf = apenasNumeros(cpf);
    const query = {
      where: {
        cpf,
      },
    };
    const pessoa = await PessoaFisica.findOne(query);
    return pessoa;
  },
};
