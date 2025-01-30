const Pessoa = require("../models/pessoaModel.js");

module.exports = {
  async criar({ nome, data_nascimento }) {
    const pessoa = await Pessoa.create({ nome, data_nascimento });
    return pessoa;
  },

  async pegar({ id }) {
    const pessoa = await Pessoa.findByPk(id);
    return pessoa;
  },

  async atualizar({ id, nome, data_nascimento }) {
    const pessoa = await Pessoa.findByPk(id);
    pessoa.nome = nome;
    pessoa.data_nascimento = data_nascimento;
    await pessoa.save();
    return pessoa;
  },

  async deletar({ id }) {
    const pessoa = await Pessoa.findByPk(id);
    await pessoa.destroy();
  },

  async listar() {
    const pessoas = await Pessoa.findAll();
    return pessoas;
  },

  async listarComFiltro({ id, nome }) {
    const query = {};
    if (id) query.id = id;
    if (nome) query.nome = nome;

    const pessoas = await Pessoa.findAll({ where: query });
    return pessoas;
  },
};
