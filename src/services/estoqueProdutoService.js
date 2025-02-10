const { Op } = require("sequelize");
const EstoqueProduto = require("../models/estoqueProdutoModel.js");
const Estoque = require("../models/estoqueModel.js");
const Produto = require("../models/produtoModel.js");

module.exports = {
  async criar({
    duplicata_detalhe_id,
    estoque_id,
    produto_id,
    quantidade,
    data,
    sinal,
    lancamento_manual,
  }) {
    const estoque = await EstoqueProduto.create({
      duplicata_detalhe_id: duplicata_detalhe_id ?? null,
      estoque_id,
      produto_id,
      quantidade,
      data,
      sinal,
      lancamento_manual: lancamento_manual ?? true,
    });
    return estoque;
  },

  async pegar(id) {
    const estoque = await EstoqueProduto.findByPk(id);
    if (!estoque) {
      throw new Error("EstoqueProduto não encontrado");
    }
    return estoque;
  },

  async atualizar({
    id,
    estoque_id,
    produto_id,
    quantidade,
    data,
    sinal,
    lancamento_manual,
  }) {
    const estoque = await EstoqueProduto.findByPk(id);
    if (!estoque) {
      throw new Error("Estoque não encontrado");
    }

    estoque.estoque_id = estoque_id;
    estoque.produto_id = produto_id;
    estoque.quantidade = quantidade;
    estoque.data = data;
    estoque.sinal = sinal;
    estoque.lancamento_manual = lancamento_manual ?? true;

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
