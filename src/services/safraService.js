const Safra = require("../models/safraModel.js");

module.exports = {
  async criar(safra) {
    const safr = await Safra.create(safra);
    return safr;
  },

  async pegar(id) {
    const safr = await Safra.findByPk(id);
    return safr;
  },

  async atualizar(safra) {
    const antigo = await this.pegar(id);
    if (!antigo) {
      throw new Error("Safra não encontrada.");
    }
    antigo.update(safra);
    await antigo.save();
    return antigo;
  },

  async deletar(id) {
    const safra = await this.pegar(id);
    if (!safra) {
      throw new Error("Safra não encontrada.");
    }
    await safra.destroy();
    return;
  },

  async tem_safra_plantando_produto(produto_id) {
    const safras = await Safra.findAll({
      where: {
        produto_id,
      },
    });
    return !!safras;
  },

  async tem_registro_para_fazenda(fazenda_id) {
    const safras = await Safra.findAll({
      where: {
        fazenda_id,
      },
    });
    return !!safras;
  },

  async listar_da_entidade(
    entidade_id,
    pagination,
    filtro_talhao,
    filtro_data_plantio,
    filtro_data_colheita,
    filtro_peso_colhido
  ) {
    const query = {
      entidade_id,
    };
    if (filtro_talhao) query.talhao = filtro_talhao;
    if (filtro_data_plantio) query.data_plantio = filtro_data_plantio;
    if (filtro_data_colheita) query.data_colheita = filtro_data_colheita;
    if (filtro_peso_colhido) query.peso_colhido = filtro_peso_colhido;

    const [safras, total] = await Safra.findAndCountAll(query);
    return safras;
  },
};
