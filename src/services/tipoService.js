const Tipo = require("../models/tipoModel.js");

module.exports = {
  async criar({ tipo, nome, descricao, chave, ordem }) {
    const tip = await Tipo.create({ tipo, nome, descricao, chave, ordem });
    return tip;
  },

  async pegar(id) {
    const tipo = await Tipo.findByPk(id);
    return tipo;
  },

  async atualizar({ id, tipo, nome, descricao, chave, ordem }) {
    const antigo = await this.pegar(id);
    if (!antigo) {
      throw new Error("Tipo não encontrado.");
    }
    antigo.tipo = tipo;
    antigo.nome = nome;
    antigo.descricao = descricao;
    antigo.chave = chave;
    antigo.ordem = ordem;

    await antigo.save();
    return antigo;
  },

  async pegarPelaChaveOuTipo(tipo, chave) {
    const query = {};
    if (tipo) query.tipo = tipo;
    if (chave) query.chave = chave;

    const tipos = await Tipo.findAll(query);
    return tipos;
  },

  async inativar(id) {
    const tipo = await this.pegar(id);
    if (!tipo) {
      throw new Error("Tipo não encontrado.");
    }
  },

  async listar({ tipo }) {
    const query = {};
    if (tipo) query.tipo = tipo;

    const tipos = await Tipo.findAll(query);
    return tipos;
  },
};
