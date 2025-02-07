const SafraUsoProduto = require("../models/safraUsoProdutoModel.js");

module.exports = {
  async criar({
    safra_id,
    pratica_agricola_id,
    lancamento_baixa_estoque_id,
    descricao,
  }) {
    const safr = await SafraUsoProduto.create({
      safra_id,
      pratica_agricola_id,
      lancamento_baixa_estoque_id,
      descricao,
    });
    return safr;
  },

  async pegar(id) {
    const safr = await SafraUsoProduto.findByPk(id);
    return safr;
  },

  async atualizar({
    id,
    safra_id,
    pratica_agricola_id,
    lancamento_baixa_estoque_id,
    descricao,
  }) {
    const antigo = await this.pegar(id);
    if (!antigo) {
      throw new Error("SafraUsoProduto não encontrada.");
    }

    antigo.safra_id = safra_id;
    antigo.pratica_agricola_id = pratica_agricola_id;
    antigo.lancamento_baixa_estoque_id = lancamento_baixa_estoque_id;
    antigo.descricao = descricao ?? "";

    await antigo.save();
    return antigo;
  },

  async deletar(id) {
    const safra = await this.pegar(id);
    if (!safra) {
      throw new Error("SafraUsoProduto não encontrada.");
    }
    await safra.destroy();
    return;
  },

  async contagem_por_pratica_agricola(safra_id) {
    const query = {
      where: {
        safra_id,
      },
    };
    const safras = await SafraUsoProduto.findAll({
      group: pratica_agricola_id,
      ...query,
    });

    return safras;
  },
};
