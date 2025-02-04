const CentroCusto = require("../models/centroCustoModel.js");

module.exports = {
  async criar({ entidade_id, centro_custo_id, nome, descricao }) {
    const centroCusto = await CentroCusto.create({
      entidade_id,
      centro_custo_id,
      nome,
      descricao,
    });
    return centroCusto;
  },
  async pegar(id) {
    const centroCusto = await CentroCusto.findByPk(id);
    return centroCusto;
  },
  async atualizar({ id, entidade_id, centro_custo_id, nome, descricao }) {
    const centroCusto = await this.pegar(id);
    if (!centroCusto) throw new Error("Centro de custo não encontrado");
    centroCusto.entidade_id = entidade_id;
    centroCusto.centro_custo_id = centro_custo_id;
    centroCusto.nome = nome;
    centroCusto.descricao = descricao ?? "";
    await centroCusto.save();
    return centroCusto;
  },
  async deletar(id) {
    const centroCusto = await this.pegar(id);
    if (!centroCusto) throw new Error("Centro de custo não encontrado");

    // TODO: VERIFICAR SE TEM DUPLICATAS LANÇADAS.

    // TOOD: VERIFICAR SE TEM VINCULOS COM SAFRAS.

    await centroCusto.destroy();
  },
  async listar_da_entidade(entidade_id) {
    const query = {
      where: {
        entidade_id,
      },
    };
    const centroCustos = await CentroCusto.findAll(query);
    return centroCustos;
  },
};
