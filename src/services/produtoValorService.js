const { where } = require("sequelize");
const ProdutoValor = require("../models/produtoValorModel.js");
const sequelize = require("../config/database.js");

module.exports = {
  async criar({ usuario_id, produto_id, cliente_fornecedor_id, valor, data }) {
    const produto = await ProdutoValor.create({
      usuario_id,
      produto_id,
      cliente_fornecedor_id,
      valor,
      data,
    });
    return produto;
  },

  async pegar(id) {
    const produto = await ProdutoValor.findByPk(id);
    return produto;
  },

  async atualizar({
    id,
    usuario_id,
    produto_id,
    cliente_fornecedor_id,
    valor,
    data,
  }) {
    const produto = await this.pegar(id);
    if (!produto) {
      throw new Error("ProdutoValor não encontrado");
    }
    (produto.usuario_id = usuario_id),
      (produto.produto_id = produto_id),
      (produto.cliente_fornecedor_id = cliente_fornecedor_id),
      (produto.valor = valor),
      (produto.data = data),
      await produto.save();
    return produto;
  },

  async deletar(id) {
    const produto = await this.pegar(id);
    if (!produto) {
      throw new Error("ProdutoValor não encontrado");
    }
    await produto.destroy();
  },

  async listar() {
    const produtos = await ProdutoValor.findAll();
    return produtos;
  },

  async tem_valor_lancado_para_produto(produto_id) {
    const produtos = ProdutoValor.findOne({
      where: {
        produto_id,
      },
    });
    return !!produtos;
  },

  async valor_mais_recente_para_produto(produto_id) {
    const sql = `
      SELECT
        SUM(valor) / COUNT(1) AS media_ultimos_30_dias, (
          SELECT valor FROM produtos WHERE produto_id = ${produto_id} ORDER BY data desc, valor desc LIMIT 1) AS ultimos_valores
        WHERE
          produto_id = ${produto_id}
          AND data >= current_date - interval '30 days'"`;
    const valor = await sequelize.query(sql);
    return valor[0];
  },
};
