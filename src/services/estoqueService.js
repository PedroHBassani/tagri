const Estoque = require("../models/estoqueModel.js");
const { atualizar } = require("./municipioService.js");

module.exports = {
  async criar({ nome, entidade_id }) {
    const estoque = await Estoque.create({ nome, entidade_id });
    return estoque;
  },
  async pegar(id) {
    const estoque = await Estoque.findByPk(id);
    if (!estoque) {
      throw new Error("Estoque não encontrado");
    }
    return estoque;
  },
  async atualizar({ id, nome, entidade_id }) {
    const estoque = await Estoque.findByPk(id);
    if (!estoque) {
      throw new Error("Estoque não encontrado");
    }
    estoque.nome = nome;
    estoque.entidade_id = entidade_id;
    await estoque.save();
    return estoque;
  },
  async deletar(id) {
    const estoque = await Estoque.findByPk(id);
    if (!estoque) {
      throw new Error("Estoque não encontrado");
    }
    await estoque.destroy();
  },
  async listarPelaEntidade(entidade_id) {
    const estoques = await Estoque.findAll({ where: { entidade_id } });
    return estoques;
  },
};
