const CentroCusto = require("../models/centroCustoModel.js");
const Duplicata = require("../models/duplicataModel.js");
const Safra = require("../models/safraModel.js");

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

    const query = {
      where: { centro_custo_id: id },
    };
    const [duplicatas, safras] = await Promise.all([
      Duplicata.findOne(query),
      Safra.findOne(query),
    ]);

    if (duplicatas) {
      throw new Error(
        "Não será possível remover o centro de custo porque existem lançamentos atrelados a ele"
      );
    }

    if (safras) {
      throw new Error(
        "Não será possível remover o centro de custo pois o mesmo está atrelado a uma safra"
      );
    }

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
