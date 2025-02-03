const {
  atualizar,
  paginate,
  listar_para_plantar,
} = require("../controllers/produtoController.js");
const Produto = require("../models/produtoModel.js");

module.exports = {
  async criar({ tipo_id, unidade_medida_id, nome, descricao }) {
    const produto = await Produto.create({
      tipo_id,
      unidade_medida_id,
      nome,
      descricao,
    });
    return produto;
  },

  async pegar(id) {
    const produto = await Produto.findByPk(id);
    return produto;
  },

  async atualizar({ id, tipo_id, unidade_medida_id, nome, descricao }) {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }
    produto.tipo_id = tipo_id;
    produto.unidade_medida_id = unidade_medida_id;
    produto.nome = nome;
    produto.descricao = descricao;
    await produto.save();
    return produto;
  },

  async deletar(id) {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }
    await produto.destroy();
  },

  async listar() {
    const produtos = await Produto.findAll();
    return produtos;
  },

  async paginate(tipo_id, nome, state, pagination) {
    const produtos = await paginate(tipo_id, nome, state, pagination);
    return produtos;
  },

  async listar_tipos() {
    const tipos = await Produto.findAll({
      attributes: ["tipo_id"],
      group: ["tipo_id"],
    });
    return tipos;
  },

  async listar_para_plantar(id, nome) {
    const produtos = await listar_para_plantar(id, nome);
    return produtos;
  },

  async listar_para_utilizar_safra(id, nome) {
    const produtos = await listar_para_utilizar_safra(id, nome);
    return produtos;
  }

  
};
