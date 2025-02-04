const DuplicataDetalhe = require("../models/duplicataDetalheModel.js");

module.exports = {
  async criar({ duplicata_id, produto_id }) {
    const duplicataDetalhe = await DuplicataDetalhe.create({
      duplicata_id,
      produto_id,
    });
    return duplicataDetalhe;
  },

  async pegar(id) {
    const duplicata = await DuplicataDetalhe.findByPk(id);
    return duplicata;
  },

  async atualizar({ id, duplicata_id, produto_id }) {
    const duplicata = await this.pegar(id);
    if (!duplicata) throw new Error("Duplicata não encontrada");

    duplicata.duplicata_id = duplicata_id;
    duplicata.produto_id = produto_id;

    await duplicata.save();
    return duplicata;
  },

  async deletar(id) {
    const duplicata = await this.pegar(id);
    if (!duplicata) throw new Error("Duplicata não encontrada");

    await duplicata.destroy();
  },

  async tem_lancado_envolvendo_produto(produto_id) {
    const duplicataDetalhe = await DuplicataDetalhe.findOne({
      where: { produto_id },
    });
    return !!duplicataDetalhe;
  },

  async listar_da_duplicata(duplicata_id) {
    const query = {
      where: { duplicata_id },
    };
    const duplicadas = await DuplicataDetalhe.findAll(query);
    return duplicadas;
  },
};
