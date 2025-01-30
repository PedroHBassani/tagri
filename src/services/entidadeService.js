const Entidade = require("../models/entidadeModel.js");

module.exports = {
  async criar({ pessoa_id }) {
    const entidade = await Entidade.create({ pessoa_id });
    return entidade;
  },

  async pegar(id) {
    const entidade = await Entidade.findByPk(id);
    return entidade;
  },

  async atualizar({ id, pessoa_id }) {
    const entidade = await Entidade.findByPk(id);
    entidade.pessoa_id = pessoa_id;
    await entidade.save();
    return entidade;
  },

  async deletar(id) {
    const entidade = await Entidade.findByPk(id);
    await entidade.destroy();
  },

  async listar() {
    return await Entidade.findAll()
  }
};
