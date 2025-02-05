const { Op } = require("sequelize");
const EstoqueProduto = require("../models/estoqueModel.js");
const Estoque = require("../models/estoqueModel.js");
const Produto = require("../models/produtoModel.js");

module.exports = {
  async criar(estoqueProduto) {
    const estoque = await EstoqueProduto.create(estoqueProduto);
    return estoque;
  },

  async pegar(id) {
    const estoque = await EstoqueProduto.findByPk(id);
    if (!estoque) {
      throw new Error("EstoqueProduto não encontrado");
    }
    return estoque;
  },

  async atualizar(id, estoqueProduto) {
    const estoque = await EstoqueProduto.findByPk(id);
    if (!estoque) {
      throw new Error("Estoque não encontrado");
    }
    await estoque.update(estoqueProduto);
    await estoque.save();
    return estoque;
  },

  async deletar(id) {
    const estoque = await this.pegar(id);
    if (!estoque) {
      throw new Error("Estoque não encontrado");
    }
    await estoque.destroy();
  },

  async tem_lancado_envolvendo_produto(produto_id) {
    const estoque = await EstoqueProduto.findOne({
      where: { produto_id },
    });
    return !!estoque;
  },

  async listarFeNoEstoqueId({
    estoqueId,
    perPage = 10,
    page = 0,
    filtroProduto,
    filtroQuantidade,
    filtroData,
  }) {
    try {
      const whereClause = Object.assign(
        { estoqueId },
        filtroProduto
          ? { "$Produto.nome$": { [Op.iLike]: `%${filtroProduto}%` } }
          : {},
        filtroQuantidade ? { quantidade: filtroQuantidade } : {},
        filtroData ? { data: filtroData } : {}
      );

      const { rows: dados, count: totalRegistros } =
        await EstoqueProduto.findAndCountAll({
          where: whereClause,
          include: [
            { model: Estoque, attributes: ["nome"] },
            { model: Produto, attributes: ["nome"] },
          ],
          attributes: [
            "id",
            "estoqueId",
            "produtoId",
            "quantidade",
            "data",
            "sinal",
            "lancamentoManual",
          ],
          order: [
            ["data", "DESC"],
            ["id", "DESC"],
          ],
          limit: perPage,
          offset: page * perPage,
        });

      return { dados, totalRegistros };
    } catch (error) {
      throw new Error(
        "Falha ao buscar os produtos do estoque. Tente novamente mais tarde."
      );
    }
  },

  async deletar_pelo_duplica_detalhe_ids(duplica_detalhe_ids) {
    const registrosDeletados = await EstoqueProduto.destroy({
      where: {
        duplicataDetalheId: { [Op.in]: duplica_detalhe_ids },
      },
      returning: true,
    });

    return registrosDeletados;
  },

  async tem_registro_no_estoque(estoque_id) {
    const estoque = await EstoqueProduto.findOne({
      where: { estoque_id },
    });
    return !!estoque;
  },
};
